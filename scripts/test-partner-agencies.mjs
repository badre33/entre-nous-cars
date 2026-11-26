// Contrôle local (PGlite) de la migration des loueurs partenaires : droits, validation, idempotence, limite.
// PGLITE_ROOT=/tmp/benatna-schema-check node scripts/test-partner-agencies.mjs
import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {PGlite}=await import(pathToFileURL(require.resolve('@electric-sql/pglite',{paths:[process.env.PGLITE_ROOT||process.cwd()]})).href);
const db=new PGlite();const checks=[];const pass=name=>checks.push(name);
await db.exec(`CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;CREATE SCHEMA auth;CREATE TABLE auth.users(id uuid primary key);CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;GRANT USAGE ON SCHEMA public,auth TO anon,authenticated,service_role;GRANT EXECUTE ON FUNCTION auth.uid() TO anon,authenticated;`);
const files=(await fs.readdir('supabase/migrations')).filter(x=>x.endsWith('.sql')).sort();
for(const file of files)await db.exec(await fs.readFile('supabase/migrations/'+file,'utf8'));pass('chain_applies');
const admin='00000000-0000-0000-0000-000000000001';const other='00000000-0000-0000-0000-000000000002';
await db.query('INSERT INTO auth.users(id) VALUES ($1),($2)',[admin,other]);
await db.query("INSERT INTO public.user_roles(user_id,role) VALUES ($1,'admin'),($2,'user')",[admin,other]);
async function as(role,sub,fn){await db.exec('BEGIN');try{await db.exec(`SET LOCAL ROLE ${role}`);await db.query("SELECT set_config('request.jwt.claim.sub',$1,true)",[sub||'']);return await fn();}finally{await db.exec('ROLLBACK');}}
async function asCommit(role,sub,fn){await db.exec('BEGIN');try{await db.exec(`SET LOCAL ROLE ${role}`);await db.query("SELECT set_config('request.jwt.claim.sub',$1,true)",[sub||'']);const r=await fn();await db.exec('COMMIT');return r;}catch(e){await db.exec('ROLLBACK');throw e;}}
const reg=(key,name,city,phone,email,fleet=null,msg=null,lang='fr')=>db.query('SELECT * FROM public.register_partner($1,$2,$3,$4,$5,$6,$7,$8)',[key,name,city,phone,email,fleet,msg,lang]);
const k=i=>`10000000-0000-0000-0000-${String(i).padStart(12,'0')}`;
async function rejects(fn,code,message){await assert.rejects(fn,e=>{assert.equal(e.code,code);if(message)assert.equal(e.message,message);return true;});}

// Inscription anonyme : téléphone seul, e-mail seul.
let r=await asCommit('anon',null,()=>reg(k(1),'  Agence Atlas  ','Casablanca','00212 6 12-34.56 78',null,12,'Flotte récente','fr'));
assert.equal(r.rows[0].created,true);pass('anon_registers_with_phone_only');
r=await asCommit('anon',null,()=>reg(k(2),'Rabat Cars','Rabat',null,' Contact@RabatCars.MA '));
assert.equal(r.rows[0].created,true);pass('anon_registers_with_email_only');
const rows=(await db.query("SELECT agency_name,phone,email,status FROM public.partner_agencies ORDER BY created_at,agency_name")).rows;
assert.equal(rows.length,2);assert.ok(rows.some(x=>x.agency_name==='Agence Atlas'&&x.phone==='+212612345678'&&x.status==='inscrit'));assert.ok(rows.some(x=>x.email==='contact@rabatcars.ma'));pass('values_trimmed_normalised_default_status');
// Idempotence : même clé, aucune deuxième ligne.
r=await asCommit('anon',null,()=>reg(k(1),'Agence Atlas','Casablanca','+212612345678',null));
assert.equal(r.rows[0].created,false);assert.equal((await db.query('SELECT count(*)::int n FROM public.partner_agencies')).rows[0].n,2);pass('same_key_no_duplicate');
// Validation.
await rejects(()=>as('anon',null,()=>reg(k(3),'X','Casablanca','+212612345678',null)),'22023','invalid_partner');
await rejects(()=>as('anon',null,()=>reg(k(3),'Agence','Marrakech','+212612345678',null)),'22023','invalid_partner');
await rejects(()=>as('anon',null,()=>reg(k(3),'Agence','Casablanca',null,null)),'22023','partner_contact_required');
await rejects(()=>as('anon',null,()=>reg(k(3),'Agence','Casablanca','0612',null)),'22023','invalid_partner_phone');
await rejects(()=>as('anon',null,()=>reg(k(3),'Agence','Casablanca',null,'pas-un-email')),'22023','invalid_partner_email');
await rejects(()=>as('anon',null,()=>reg(k(3),'Agence','Casablanca','+212612345678',null,0)),'22023','invalid_partner');
pass('invalid_inputs_rejected_with_expected_codes');
// Limite : 3 inscriptions par contact sur 24 h.
for(const i of [4,5])await asCommit('anon',null,()=>reg(k(i),'Agence '+i,'Casablanca',null,'meme@agence.ma'));
await asCommit('anon',null,()=>reg(k(6),'Agence 6','Casablanca',null,'meme@agence.ma'));
await rejects(()=>as('anon',null,()=>reg(k(7),'Agence 7','Casablanca',null,'meme@agence.ma')),'P0001','partner_rate_limited');pass('rate_limit_per_contact');
// Droits de lecture et d'écriture.
await rejects(()=>as('anon',null,()=>db.query('SELECT * FROM public.partner_agencies')),'42501');pass('anon_cannot_read');
await rejects(()=>as('anon',null,()=>db.query("INSERT INTO public.partner_agencies(agency_name,city,phone) VALUES ('Direct','Casablanca','+212600000000')")),'42501');pass('anon_cannot_insert_directly');
await rejects(()=>as('anon',null,()=>db.query('SELECT * FROM partner_intake_private.submissions')),'42501');pass('anon_cannot_read_private_ledger');
assert.equal((await as('authenticated',other,()=>db.query('SELECT * FROM public.partner_agencies'))).rows.length,0);pass('non_admin_sees_nothing');
assert.equal((await as('authenticated',other,()=>db.query("UPDATE public.partner_agencies SET status='verifie' RETURNING id"))).rows.length,0);pass('non_admin_cannot_update');
await rejects(()=>as('authenticated',admin,()=>db.query("INSERT INTO public.partner_agencies(agency_name,city,phone) VALUES ('Direct','Casablanca','+212600000000')")),'42501');pass('admin_cannot_insert_directly');
await rejects(()=>as('authenticated',admin,()=>db.query('DELETE FROM public.partner_agencies')),'42501');pass('admin_cannot_delete');
const seen=await as('authenticated',admin,()=>db.query('SELECT id FROM public.partner_agencies'));assert.equal(seen.rows.length,5);pass('admin_reads_all');
const updated=await asCommit('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET status='verifie',registre_commerce='RC 12345',ice='001234567000089',bank_account='007 780 0001234567890123 45',verified_at=now() WHERE agency_name='Agence Atlas' RETURNING status,updated_at>created_at AS touched"));
assert.equal(updated.rows[0].status,'verifie');assert.equal(updated.rows[0].touched,true);pass('admin_updates_status_documents_and_updated_at');
await rejects(()=>as('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET status='actif'")),'23514');pass('status_check_enforced');
console.log(JSON.stringify({checks:checks.length,passed:true,names:checks}));
