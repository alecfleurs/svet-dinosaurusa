var V='sd-v9',FH=/^https:\/\/fonts\.(googleapis|gstatic)\.com\//;
var F=['./','index.html','manifest.webmanifest','trex-192.png','trex-512.png','trex-180.png','trex-maskable-192.png','trex-maskable-512.png'];
var FONT='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Lora:ital,wght@0,700;1,500;1,700&display=swap';
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){
 return c.addAll(F).then(function(){return fetch(FONT,{mode:'cors'}).then(function(r){var cp=r.clone();return c.put(FONT,cp).then(function(){return r.text()})}).then(function(css){
  var u=(css.match(/url\((https:[^)]+)\)/g)||[]).map(function(x){return x.slice(4,-1)});return Promise.all(u.map(function(x){return fetch(x,{mode:'cors'}).then(function(r){return c.put(x,r)}).catch(function(){})}))}).catch(function(){})})}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;var url=e.request.url,same=new URL(url).origin===location.origin;if(!same&&!FH.test(url))return;
 e.respondWith(caches.match(e.request,{ignoreSearch:same}).then(function(r){return r||fetch(e.request).then(function(n){if(n.ok||n.type==='opaque'){var cp=n.clone();caches.open(V).then(function(c){c.put(e.request,cp)})}return n}).catch(function(){return same?caches.match('index.html'):Response.error()})}))});
