const assert=require('node:assert/strict');
const fs=require('node:fs');
const {position}=require('./rhythm-follow');
for(const [t,step] of [[0,-1],[1.999,-1],[2,0],[3,1],[4,2],[5,3],[6,-1],[7,0],[10,3],[11,-1],[12,0],[15,3],[16,-1],[16.3,-1]])assert.equal(position(t).step,step,`time ${t}`);
// Validate the timeline against the actual audio samples, including real rests.
for(const [name,silent] of [['01_cetiri_otkucaja.wav',false],['06_zvuk_tisina.wav',true]]){
 const b=fs.readFileSync('assets/audio/'+name);let rate,pcm;
 for(let p=12;p<b.length;){const id=b.toString('ascii',p,p+4),size=b.readUInt32LE(p+4);if(id==='fmt ')rate=b.readUInt32LE(p+12);if(id==='data')pcm=b.subarray(p+8,p+8+size);p+=8+size+(size%2);}
 assert.equal(pcm.length/2/rate,16.3);
 for(let beat=0;beat<16;beat++){
  let peak=0;for(let n=Math.floor((beat+.02)*rate);n<Math.floor((beat+.1)*rate);n++)peak=Math.max(peak,Math.abs(pcm.readInt16LE(n*2)));
  const step=position(beat+.1).step;
  const expectSound=beat<2||(step>=0&&(!silent||step%2===0));
  assert.equal(peak>100,expectSound,`${name} second ${beat}`);
 }
}
console.log('Timing boundaries and actual WAV sound/rest alignment passed.');
