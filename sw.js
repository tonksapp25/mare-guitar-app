/* cache-list.js is regenerated from app files when creating the hosting ZIP. */
importScripts('./cache-list.js');
const CACHE='mare-offline-'+OFFLINE_VERSION;
const ROOT=new URL('./',self.location.href);
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(OFFLINE_FILES.map(path=>new Request(new URL(path,ROOT),{cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  await self.clients.claim();
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('mare-offline-')&&key!==CACHE).map(key=>caches.delete(key)));
})()));
async function ranged(response,range){
  const body=await response.arrayBuffer();
  const match=/^bytes=(\d*)-(\d*)$/.exec(range);
  if(!match)return response;
  const length=body.byteLength;
  const start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2]));
  const end=match[1]&&match[2]?Math.min(Number(match[2]),length-1):length-1;
  if(start>=length||start>end)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${length}`}});
  const headers=new Headers(response.headers);
  headers.set('Content-Range',`bytes ${start}-${end}/${length}`);
  headers.set('Content-Length',String(end-start+1));
  headers.set('Accept-Ranges','bytes');
  return new Response(body.slice(start,end+1),{status:206,headers});
}
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(request,{ignoreSearch:true});
    if(request.headers.has('range')&&cached)return ranged(cached,request.headers.get('range'));
    try{
      const response=await fetch(request);
      if(response.ok&&response.status===200){
        event.waitUntil(cache.put(request,response.clone()));
      }
      return response;
    }catch{
      if(cached)return cached;
      if(request.mode==='navigate'){
        const home=await cache.match(new URL('index.html',ROOT));
        if(home)return home;
      }
      return new Response('Sadržaj nije preuzet. Otvori ga jednom uz internet.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});
