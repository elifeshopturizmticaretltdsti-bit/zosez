'use strict';
(function(){const c=window.ZOSEZ_CONTEXT||{mode:'single'},multi=c.mode==='multi';
 const prefix=multi?'zosez:'+c.userId+':':'';
 window.ZosezScope={...c,dbSuffix:multi?'_'+c.userId:'',storage:{getItem(key){if(multi&&key==='elife_api_credentials')return null;return localStorage.getItem(prefix+key);},setItem(key,value){if(multi&&key==='elife_api_credentials')return;localStorage.setItem(prefix+key,value);},removeItem(key){localStorage.removeItem(prefix+key);}}};
 if(!multi)return;const nativeFetch=window.fetch.bind(window);
 window.fetch=async function(input,init={}){const u=new URL(typeof input==='string'?input:input.url,location.href);if(u.origin!==location.origin||!u.pathname.startsWith('/api/'))return nativeFetch(input,init);const headers=new Headers(init.headers||(input instanceof Request?input.headers:undefined));headers.set('X-Zosez-Request','1');headers.set('X-Zosez-Tenant',c.userId);const r=await nativeFetch(input,{...init,headers});if(r.status===401)location.assign('/platform');if(r.status===409&&r.headers.get('Content-Type')?.includes('json')){const d=await r.clone().json().catch(()=>({}));if(String(d.error).includes('Satıcı hesabı değişti'))location.reload();}return r;};
 window.addEventListener('storage',ev=>{if(ev.key==='zosez-auth-event')location.reload();});
 window.addEventListener('pageshow',ev=>{if(ev.persisted)location.reload();});
})();
