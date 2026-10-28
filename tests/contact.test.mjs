import test from 'node:test';
import assert from 'node:assert/strict';
import {sendContact} from '../src/lib/email.ts';
const message={name:'Preview test',email:'preview@example.test',subject:'Frontend',message:'A local mocked test; never sent.'};
test('preserves existing EmailJS service and template fields',async()=>{
 let captured;
 await sendContact(message,async(url,options)=>{captured={url,options};return new Response('OK',{status:200});});
 assert.equal(captured.url,'https://api.emailjs.com/api/v1.0/email/send');
 const payload=JSON.parse(captured.options.body);
 assert.equal(payload.service_id,'service_syronxp');
 assert.equal(payload.template_id,'template_tilc503');
 assert.deepEqual(payload.template_params,message);
 assert.ok(captured.options.signal instanceof AbortSignal);
});
test('rejects service failures instead of reporting a sent message',async()=>{
 await assert.rejects(()=>sendContact(message,async()=>new Response('Denied',{status:403})),/Email delivery failed/);
});
test('propagates network failures for the email fallback',async()=>{
 await assert.rejects(()=>sendContact(message,async()=>{throw new Error('Offline');}),/Offline/);
});
