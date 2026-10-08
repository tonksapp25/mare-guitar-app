const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const crypto=require('node:crypto');

(async()=>{
  const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
  assert.equal(manifest.display,'standalone');
  assert(manifest.icons.some(i=>i.sizes==='192x192'));
  assert(manifest.icons.some(i=>i.sizes==='512x512'));
  for(const icon of manifest.icons){
    const png=fs.readFileSync(icon.src);
    assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a');
    const [w,h]=icon.sizes.split('x').map(Number);
    assert.equal(png.readUInt32BE(16),w);assert.equal(png.readUInt32BE(20),h);
  }
  const scope={URL,Request,Response,Headers,OFFLINE_VERSION:'test',OFFLINE_FILES:[],importScripts(){},self:{location:{href:'https://mare.aplikacija.com.hr/sw.js'},addEventListener(){}}};
  vm.createContext(scope);vm.runInContext(fs.readFileSync('sw.js','utf8'),scope);
  const samples=Uint8Array.from([10,20,30,40,50]);
  for(const [range,status,expected] of [['bytes=1-3',206,[20,30,40]],['bytes=2-',206,[30,40,50]],['bytes=-2',206,[40,50]],['bytes=3-99',206,[40,50]],['bytes=8-',416,[]]]){
    const response=await scope.ranged(new Response(samples),range);
    assert.equal(response.status,status);
    assert.deepEqual([...new Uint8Array(await response.arrayBuffer())],expected);
  }
  const cacheScope={};vm.createContext(cacheScope);
  vm.runInContext(fs.readFileSync('cache-list.js','utf8')+';this.files=OFFLINE_FILES;this.version=OFFLINE_VERSION;',cacheScope);
  const hash=crypto.createHash('sha256');
  for(const file of cacheScope.files){assert(fs.existsSync(file),file);hash.update(file);hash.update(fs.readFileSync(file));}
  hash.update(fs.readFileSync('sw.js'));
  assert.equal(hash.digest('hex').slice(0,16),cacheScope.version,'Regenerate cache-list.js with build_hosting.py');
  const html=fs.readFileSync('index.html','utf8');
  for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
    const url=match[1].split('?')[0];
    if(!url.includes(':')&&!url.startsWith('//'))assert(fs.existsSync(path.normalize(url)),url);
  }
  console.log('PWA manifest, PNG dimensions, offline audio ranges, cache version and local HTML references passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
