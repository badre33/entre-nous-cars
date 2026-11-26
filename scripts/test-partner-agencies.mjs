// Contrôle local (PGlite) des migrations loueurs partenaires (initiale + correctif du 26/11) :
// droits, validation, idempotence avec contenu, documents obligatoires, RIB, limite par téléphone et par e-mail,
// et application du correctif sur une base qui contient déjà des inscriptions (cas de la préproduction).
// PGLITE_ROOT=/tmp/benatna-schema-check node scripts/test-partner-agencies.mjs
import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {PGlite}=await import(pathToFileURL(require.resolve('@electric-sql/pglite',{paths:[process.env.PGLITE_ROOT||process.cwd()]})).href);
const checks=[];const pass=name=>checks.push(name);
const ROLES=`CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;CREATE SCHEMA auth;CREATE TABLE auth.users(id uuid primary key);CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;GRANT USAGE ON SCHEMA public,auth TO anon,authenticated,service_role;GRANT EXECUTE ON FUNCTION auth.uid() TO anon,authenticated;`;
const FIX='20261126000100_partner_agencies_fixes.sql';const fsFix=await fs.readFile('supabase/migrations/'+FIX,'utf8');
const files=(await fs.readdir('supabase/migrations')).filter(x=>x.endsWith('.sql')).sort();
assert.ok(files.includes(FIX));
const k=i=>`10000000-0000-0000-0000-${String(i).padStart(12,'0')}`;
async function rejects(fn,code,message){await assert.rejects(fn,e=>{assert.equal(e.code,code);if(message)assert.equal(e.message,message);return true;});}

// A. Base déjà équipée de la migration initiale, avec des inscriptions, puis correctif (préproduction).
{
  const pre=new PGlite();await pre.exec(ROLES);
  for(const file of files.filter(f=>f!==FIX))await pre.exec(await fs.readFile('supabase/migrations/'+file,'utf8'));
  const call=(key,name,city,phone,email,fleet=null,msg=null)=>pre.query('SELECT * FROM public.register_partner($1,$2,$3,$4,$5,$6,$7,$8)',[key,name,city,phone,email,fleet,msg,'fr']);
  await call(k(900),' Agence Ancienne ','Casablanca','+212 6 00 00 09 00','Old@Agence.ma',4,'avant correctif');
  await call(k(901),'Agence Email','Rabat',null,'email@agence.ma');
  await pre.exec(await fs.readFile('supabase/migrations/'+FIX,'utf8'));
  const led=(await pre.query("SELECT payload,phone,email FROM partner_intake_private.submissions WHERE idempotency_key=$1",[k(900)])).rows[0];
  assert.deepEqual(led.payload,{agency_name:'Agence Ancienne',city:'Casablanca',phone:'+212600000900',email:'old@agence.ma',fleet_size:4,message:'avant correctif',language:'fr'});
  assert.equal(led.phone,'+212600000900');assert.equal(led.email,'old@agence.ma');
  assert.equal((await pre.query('SELECT count(*)::int n FROM public.partner_agencies')).rows[0].n,2);pass('fix_preserves_rows_and_backfills_ledger');
  assert.equal((await call(k(900),'Agence Ancienne','Casablanca','+212600000900','old@agence.ma',4,'avant correctif')).rows[0].created,false);pass('fix_old_key_same_content_replays');
  await rejects(()=>call(k(900),'Agence Ancienne','Rabat','+212600000900','old@agence.ma',4,'avant correctif'),'23505','partner_idempotency_conflict');pass('fix_old_key_other_content_conflicts');
  await assert.rejects(()=>pre.exec(fsFix),e=>/fix already applied/.test(e.message));await pre.exec('ROLLBACK');pass('fix_refuses_second_run');
  await pre.close();
}

const db=new PGlite();await db.exec(ROLES);
for(const file of files)await db.exec(await fs.readFile('supabase/migrations/'+file,'utf8'));pass('chain_applies');
const admin='00000000-0000-0000-0000-000000000001';const other='00000000-0000-0000-0000-000000000002';
await db.query('INSERT INTO auth.users(id) VALUES ($1),($2)',[admin,other]);
await db.query("INSERT INTO public.user_roles(user_id,role) VALUES ($1,'admin'),($2,'user')",[admin,other]);
async function as(role,sub,fn){await db.exec('BEGIN');try{await db.exec(`SET LOCAL ROLE ${role}`);await db.query("SELECT set_config('request.jwt.claim.sub',$1,true)",[sub||'']);return await fn();}finally{await db.exec('ROLLBACK');}}
async function asCommit(role,sub,fn){await db.exec('BEGIN');try{await db.exec(`SET LOCAL ROLE ${role}`);await db.query("SELECT set_config('request.jwt.claim.sub',$1,true)",[sub||'']);const r=await fn();await db.exec('COMMIT');return r;}catch(e){await db.exec('ROLLBACK');throw e;}}
const reg=(key,name,city,phone,email,fleet=null,msg=null,lang='fr')=>db.query('SELECT * FROM public.register_partner($1,$2,$3,$4,$5,$6,$7,$8)',[key,name,city,phone,email,fleet,msg,lang]);

// Inscription anonyme : téléphone seul, e-mail seul.
let r=await asCommit('anon',null,()=>reg(k(1),'  Agence Atlas  ','Casablanca','00212 6 12-34.56 78',null,12,'Flotte récente','fr'));
assert.equal(r.rows[0].created,true);pass('anon_registers_with_phone_only');
r=await asCommit('anon',null,()=>reg(k(2),'Rabat Cars','Rabat',null,' Contact@RabatCars.MA '));
assert.equal(r.rows[0].created,true);pass('anon_registers_with_email_only');
const rows=(await db.query("SELECT agency_name,phone,email,status FROM public.partner_agencies ORDER BY created_at,agency_name")).rows;
assert.equal(rows.length,2);assert.ok(rows.some(x=>x.agency_name==='Agence Atlas'&&x.phone==='+212612345678'&&x.status==='inscrit'));assert.ok(rows.some(x=>x.email==='contact@rabatcars.ma'));pass('values_trimmed_normalised_default_status');
// Idempotence : même clé + contenu équivalent après normalisation = rejeu ; contenu différent = conflit, rien d'écrasé.
r=await asCommit('anon',null,()=>reg(k(1),'Agence Atlas','Casablanca','+212 612 345 678',null,12,' Flotte récente '));
assert.equal(r.rows[0].created,false);assert.equal((await db.query('SELECT count(*)::int n FROM public.partner_agencies')).rows[0].n,2);pass('same_key_equivalent_content_replays');
for(const changed of [['Agence Atlas','Rabat','+212612345678',null,12,'Flotte récente'],['Agence Atlas','Casablanca','+212612345679',null,12,'Flotte récente'],['Agence Atlas','Casablanca','+212612345678',null,13,'Flotte récente'],['Agence Atlas','Casablanca','+212612345678','a@b.ma',12,'Flotte récente']])
  await rejects(()=>as('anon',null,()=>reg(k(1),...changed)),'23505','partner_idempotency_conflict');
const kept=(await db.query("SELECT city,phone,email,fleet_size FROM public.partner_agencies WHERE agency_name='Agence Atlas'")).rows;
assert.equal(kept.length,1);assert.deepEqual(kept[0],{city:'Casablanca',phone:'+212612345678',email:null,fleet_size:12});
assert.equal((await db.query("SELECT count(*)::int n FROM public.partner_agencies WHERE phone='+212612345679' OR city='Rabat' AND agency_name='Agence Atlas'")).rows[0].n,0);pass('same_key_changed_content_conflicts_without_overwrite');
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
assert.equal((await as('anon',null,()=>reg(k(6),'Agence 6','Casablanca',null,'meme@agence.ma'))).rows[0].created,false);pass('replay_still_allowed_after_limit');
// Même e-mail, téléphones tous différents : la 4e est refusée.
for(const i of [11,12,13])await asCommit('anon',null,()=>reg(k(i),'Agence '+i,'Casablanca','+2126000000'+i,'same@example.ma'));
await rejects(()=>as('anon',null,()=>reg(k(14),'Agence 14','Casablanca','+212600000014','same@example.ma')),'P0001','partner_rate_limited');pass('rate_limit_counts_email_when_phone_changes');
// Même téléphone, e-mails différents ou absents : la 4e est refusée.
await asCommit('anon',null,()=>reg(k(21),'Agence 21','Rabat','+212611111111',null));
await asCommit('anon',null,()=>reg(k(22),'Agence 22','Rabat','+212611111111','x22@ex.ma'));
await asCommit('anon',null,()=>reg(k(23),'Agence 23','Rabat','+212611111111','x23@ex.ma'));
await rejects(()=>as('anon',null,()=>reg(k(24),'Agence 24','Rabat','+212611111111','x24@ex.ma')),'P0001','partner_rate_limited');pass('rate_limit_counts_phone_when_email_changes');
// Droits de lecture et d'écriture.
await rejects(()=>as('anon',null,()=>db.query('SELECT * FROM public.partner_agencies')),'42501');pass('anon_cannot_read');
await rejects(()=>as('anon',null,()=>db.query("INSERT INTO public.partner_agencies(agency_name,city,phone) VALUES ('Direct','Casablanca','+212600000000')")),'42501');pass('anon_cannot_insert_directly');
await rejects(()=>as('anon',null,()=>db.query('SELECT * FROM partner_intake_private.submissions')),'42501');pass('anon_cannot_read_private_ledger');
assert.equal((await as('authenticated',other,()=>db.query('SELECT * FROM public.partner_agencies'))).rows.length,0);pass('non_admin_sees_nothing');
assert.equal((await as('authenticated',other,()=>db.query("UPDATE public.partner_agencies SET status='verifie' RETURNING id"))).rows.length,0);pass('non_admin_cannot_update');
await rejects(()=>as('authenticated',admin,()=>db.query("INSERT INTO public.partner_agencies(agency_name,city,phone) VALUES ('Direct','Casablanca','+212600000000')")),'42501');pass('admin_cannot_insert_directly');
await rejects(()=>as('authenticated',admin,()=>db.query('DELETE FROM public.partner_agencies')),'42501');pass('admin_cannot_delete');
const seen=await as('authenticated',admin,()=>db.query('SELECT id FROM public.partner_agencies'));assert.equal(seen.rows.length,11);pass('admin_reads_all');
const updated=await asCommit('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET status='verifie',registre_commerce='RC 12345',ice='001234567000089',bank_account='007780000123456789012345',verified_at=now() WHERE agency_name='Agence Atlas' RETURNING status,updated_at>created_at AS touched"));
assert.equal(updated.rows[0].status,'verifie');assert.equal(updated.rows[0].touched,true);pass('admin_updates_status_documents_and_updated_at');
await rejects(()=>as('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET status='actif'")),'23514');pass('status_check_enforced');
// Vérifié : RC, ICE et date obligatoires ; NULL, vide et espaces refusés ; impossible de vider un document ensuite.
for(const [rc,ice,at] of [['NULL','NULL','now()'],["''","'001234567000089'",'now()'],["'RC 1'","'   '",'now()'],["'RC 1'","'001234567000089'",'NULL']])
  await rejects(()=>as('authenticated',admin,()=>db.query(`UPDATE public.partner_agencies SET status='verifie',registre_commerce=${rc},ice=${ice},verified_at=${at} WHERE agency_name='Rabat Cars'`)),'23514');
await rejects(()=>as('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET registre_commerce='  ' WHERE agency_name='Agence Atlas'")),'23514');
await rejects(()=>as('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET ice=NULL WHERE agency_name='Agence Atlas'")),'23514');
pass('verified_requires_rc_ice_date_in_database');
// RIB : 24 chiffres seulement, aucun texte (donc pas de nom du titulaire).
for(const bank of ['Titulaire Exemple 123456','Titulaire Exemple 007780000123456789012345','007 780 0001234567890123 45','00778000012345678901234','MA64007780000123456789012345'])
  await rejects(()=>as('authenticated',admin,()=>db.query('UPDATE public.partner_agencies SET bank_account=$1 WHERE agency_name=$2',[bank,'Rabat Cars'])),'23514');
assert.equal((await as('authenticated',admin,()=>db.query("UPDATE public.partner_agencies SET bank_account='181780211110001234567890' WHERE agency_name='Rabat Cars' RETURNING bank_account"))).rows[0].bank_account,'181780211110001234567890');
pass('bank_account_digits_only');
console.log(JSON.stringify({checks:checks.length,passed:true,names:checks}));
