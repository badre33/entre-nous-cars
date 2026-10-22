import {build} from 'esbuild';import assert from 'node:assert/strict';
const compiled=await build({entryPoints:['src/utils/rentalRequest.ts'],bundle:true,platform:'node',format:'esm',write:false});const api=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const year=new Date().getFullYear()+1;const valid={vehicles:['Renault Clio'],startDate:`${year}-01-01`,endDate:`${year}-01-04`,city:'Casablanca',pickupId:'cmn',otherPlace:''};let checks=0;
assert.equal(api.validateRental(valid),null);checks++;
for(const patch of [{vehicles:[]},{vehicles:['Camion']},{startDate:''},{endDate:`${year}-01-03`},{endDate:`${year}-07-02`},{pickupId:''},{city:'Rabat',pickupId:'cmn'},{pickupId:'other',otherPlace:'  '}]){assert(api.validateRental({...valid,...patch}));checks++;}
assert.equal(api.validateRental({...valid,vehicles:['VW Golf']}),null);checks++;
const message=api.buildConfirmedRentalMessage(valid);assert(message.includes('Renault Clio'));assert(message.includes(`01/01/${year}`));assert(message.includes('Mohammed'));assert(!/Dates :\s*\n|Modèle souhaité :\s*\n/.test(message));checks++;
assert.throws(()=>api.buildConfirmedRentalMessage({...valid,pickupId:''}));checks++;
console.log(JSON.stringify({checks,passed:true,realMessagesSent:0}));
