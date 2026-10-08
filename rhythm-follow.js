/* Timing matches make_audio in build_package.py: 2 count-in beats,
   three four-beat phrases, 1 beat between phrases, 0.3 s tail. */
(function(root){
  const position=time=>{
    if(time<2)return {step:-1,label:'Pripremi se…'};
    const phrase=Math.floor((time-2)/5);
    const beat=Math.floor((time-2)%5);
    if(phrase>=3)return {step:-1,label:'Bravo! Sada probaj ti.'};
    if(beat===4)return {step:-1,label:phrase===2?'Bravo! Sada probaj ti.':'Kratka pauza…'};
    return {step:beat,label:''};
  };
  let cleanup=()=>{};
  function bind(container){
    cleanup();
    const releases=[];
    container.querySelectorAll('audio[data-audio-index]').forEach(audio=>{
      const card=audio.closest('.exercise-card');
      const diagram=card?.querySelector(`[data-rhythm-audio="${audio.dataset.audioIndex}"]`);
      if(!diagram)return;
      const markers=[...diagram.querySelectorAll('[data-rhythm-step]')];
      const label=audio.closest('.card-audio').querySelector('.card-audio-label');
      const original=label.textContent;
      let frame=0;
      const update=()=>{
        const pos=position(audio.currentTime);
        markers.forEach((marker,i)=>marker.classList.toggle('is-current',i===pos.step&&!audio.ended));
        const isSilence=audio.dataset.audioIndex==='5'&&pos.step%2===1;
        const text=audio.ended?'Bravo! Sada probaj ti.':audio.currentTime===0&&audio.paused?original:
          pos.label||(audio.paused?'Pauza · ':'Sada · ')+(isSilence?'tišina':'zvuk');
        if(label.textContent!==text)label.textContent=text;
      };
      const stop=()=>{cancelAnimationFrame(frame);frame=0;update();};
      const tick=()=>{update();if(!audio.paused&&!audio.ended)frame=requestAnimationFrame(tick);};
      const play=()=>{cancelAnimationFrame(frame);tick();};
      const events={play,pause:stop,ended:stop,seeking:update,seeked:update,timeupdate:update,loadedmetadata:update};
      Object.entries(events).forEach(([event,fn])=>audio.addEventListener(event,fn));
      releases.push(()=>{cancelAnimationFrame(frame);Object.entries(events).forEach(([event,fn])=>audio.removeEventListener(event,fn));});
    });
    cleanup=()=>releases.forEach(release=>release());
  }
  const api={position,bind};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.GuitarRhythmFollow=api;
})(typeof window==='undefined'?globalThis:window);
