(() => {
  'use strict';
  const data=window.GUITAR_DATA;
  const figures=window.GUITAR_FIGURES||{};
  const {dailyKid,missionTips,stuckTips,missionSteps:childSteps,bridgeSteps}=window.KID_COPY;
  const content=document.getElementById('content');
  const titles=['Upoznajem gitaru','Prsti stvaraju zvukove','Moja prva pjesmica','Moj mali koncert'];
  const goals=['Pronađi dvije žice, odsviraj četiri ravnomjerna zvuka i zaustavi ih.','Pročitaj 0, 1 i 3 te odsviraj kratak niz po poljima.','Odsviraj dio A i dio B pjesmice, svaki zasebno.','Poveži A-A-B-B i ponovi samostalno drugi dan.'];
  const kidGoals=['Pronađi dvije žice i odsviraj četiri lijepa zvuka!','Nauči brojeve 0, 1 i 3 — to su tvoja mjesta na vratu!','Odsviraj dio A i dio B — tvoje prve dijelove pjesmice!','Spoji sve u mali koncert i pokaži ga drugi dan!'];
  const nav=[['pocetak','Početak','·'],...titles.map((t,i)=>['tjedan-'+(i+1),(i+1)+'. tjedan','★'+(i+1)]),['pjesmica','Pjesmice','♪'],['zvuk','Poslušaj','♪'],['napredak','Moje zvjezdice','★'],['trebas-pomoc','Trebaš pomoć?','♥'],['pomoc','Savjeti i upute','?']];
  const mascotName='Zvonko';
  const mascotLines={pocetak:[`Bok, Marija! Ja sam ${mascotName}, tvoj glazbeni zmaj.`,'Skupa učimo — danas polako istraži gitaru. Lijep zvuk je važniji od brzine!'],tjedan1:['Tjedan 1 — upoznaj gitaru!','Dotakni žice nježno. Četiri ravna zvuka su tvoja prva super pobjeda!'],tjedan2:['Tjedan 2 — prsti na mapi!','Brojevi na kartici pokazuju gdje staviš prst. Polako, pa se sve zapamti.'],tjedan3:['Tjedan 3 — pjesmica!','Danas učiš mali dio melodije. Jedan dio odjednom — to je dovoljno i super je!'],tjedan4:['Tjedan 4 — tvoj koncert!','Spoji dijelove koje znaš. Ako nešto zapne, ponovi — ja uvijek ponovim dok ne zazvoni lijepo.'],zvuk:['Vrijeme za uši!','Dodirni play i slušaj. Možeš pljeskati prstima uz zvuk prije nego sviraš na gitari.'],pjesmica:['Odaberi pjesmicu!','Dodirni onu koja ti se sviđa. Ne znaš što znači broj? Dodirni ga — objasnit ću ti!'],pjesmicaPjevanje:['Sviraj ovaj dio!','Red po red, polako. Dodirni broj ili slog kad trebaš pomoć — tu sam!'],napredak:['Tvoje zvjezdice!','Ovdje bilježimo što si vježbala. Nisu ocjene — samo tvoji mali uspjesi. Svaka ★ se računa!'],pomoc:['Mala pomoć za lijepe zvukove!','Ovdje su savjeti za gitaru i vježbanje. Pogledaj ih s osobom koja ti pomaže — zajedno ćete lakše pronaći odgovor.']};
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fingerWord=/(?<![\p{L}])(mal(?:i|og|im) prst(?:a|om|u)?|srednj(?:i|eg|im) prst(?:a|om|u)?|srednjak(?:a|om|u)?|ka[žz]iprst(?:a|om|u)?|prstenjak(?:a|om|u)?|pal(?:ac|ca|cem|cu))(?![\p{L}])/giu;
  const fingerKey=word=>{
    const w=word.toLocaleLowerCase('hr');
    if(w.startsWith('pal'))return 'palac';
    if(w.includes('žip')||w.includes('zip'))return 'kaziprst';
    if(w.startsWith('sred'))return 'srednji';
    if(w.startsWith('prsten'))return 'prstenjak';
    if(w.startsWith('mal'))return 'mali';
    return '';
  };
  const fingerButton=word=>{
    const key=fingerKey(word);
    if(!key)return escape(word);
    return `<button type="button" class="finger-word" data-finger="${key}" aria-label="${escape('Otvori sliku ruke: '+word)}">${escape(word)}</button>`;
  };
  const withFingers=html=>String(html).replace(/(<[^>]+>)|([^<]+)/g,(m,tag,text)=>tag||text.replace(fingerWord,fingerButton));
  const fingerPlain=text=>withFingers(escape(text));
  window.withFingers=withFingers;
  const key=(kind,values)=>kind+'|'+JSON.stringify(values);
  const diagram=(kind,values)=>{
    const drawing=figures[key(kind,values)]||'';
    const labels=kind==='guitar'?[
      ['Glava','Tu nam odrasla osoba pomaže ugađati žice.'],['Vrat i pragovi','Ovdje stavljamo prste — svako mjesto ima svoj zvuk.'],['Šest žica','Dotakni žicu, pusti i slušaj — to je tvoj ton!'],['Zvučni otvor','Desna ruka svira žice iznad ovog velikog kruga.'],['Tijelo gitare','Ovdje zvuk postaje glasniji i lijepši.']
    ]:kind==='posture'?[
      ['Opuštena ramena','Sjedi uspravno i diši — kao princeza ili superheroj.'],['Desna ruka svira','Podlaktica miruje na gitari. Prsti su iznad otvora.'],['Lijeva ruka bira ton','Dosegni vrat bez podizanja ramena. Palac lagano drži vrat.'],['Oba stopala miruju','Gitara stoji na lijevoj nozi. Podnožak ti pomaže da ti bude udobno.']
    ]:kind==='strings'?[
      ['Prva žica','Najtanja — kad gitara stoji na krilu, to je najniža žica.'],['Druga žica','Odmah uz prvu, malo deblja. Pronađi ih jedna po jedna.']
    ]:kind==='neck'?[
      ['Metalna prečka','To je prag. Prst stavi tik uz nju, ne na sredinu.'],['Točka na žici','Tu stišćeš — samo toliko da zvuk bude čist.']
    ]:null;
    const caption=kind==='tab'?'Crta = žica. Broj = prag. <strong>0</strong> = prazna žica (bez prsta). Čitaj slijeva nadesno.'
      :kind==='rhythm'?'Puni krug = <strong>zvuk</strong>. Prazno / „tišina” = <strong>stani</strong>.'
      :kind==='repeat'?'<strong>A</strong> i <strong>B</strong> su dijelovi pjesmice. Strelica = ponovi.'
      :kind==='blank'?'Četiri prazna mjesta — tu upišeš ili nacrtaj <strong>svoju</strong> melodiju.'
      :kind==='posture'?'Prikazan je desnoruki položaj. Mama/tata namjesti stolac i podnožak.'
      :kind==='strings'?'Na crtežu su prva i druga žica — to su tvoje dvije „staze”.'
      :kind==='neck'?'Prst traži kućicu blizu metalne prečke.'
      :'';
    const stringLegend=(kind==='tab'||kind==='strings')
      ?`<div class="string-legend" aria-hidden="true"><span class="sl-item sl-1"><i></i>1. žica</span><span class="sl-item sl-2"><i></i>2. žica</span></div>`
      :'';
    const colorizeTab=svg=>{
      if(kind!=='tab'||!svg)return svg;
      return svg
        .replace(/fill="#173941"([^>]*>\s*1\.\s*žica)/g,'fill="#ec407a"$1')
        .replace(/fill="#173941"([^>]*>\s*2\.\s*žica)/g,'fill="#e69100"$1')
        .replace(/fill="#173941"([^>]*>\s*1\.\s*zica)/gi,'fill="#ec407a"$1')
        .replace(/fill="#173941"([^>]*>\s*2\.\s*zica)/gi,'fill="#e69100"$1');
    };
    const art=colorizeTab(drawing);
    if(labels){
      const picture=kind==='posture'
        ?`<img class="posture-girl" src="assets/illustrations/udobno-sjedenje-curica.jpg" alt="Curica udobno sjedi s gitarom — isti položaj kao na uputama" width="600" height="800" loading="lazy">`
        :art;
      return `<div class="learning-illustration ${kind}-illustration">${picture}<ol class="picture-legend">${labels.map(([title,desc],i)=>`<li><span class="picture-number">${i+1}</span><div><strong>${withFingers(title)}</strong><p>${withFingers(desc)}</p></div></li>`).join('')}</ol>${stringLegend}${caption?`<p class="picture-caption">${withFingers(caption)}</p>`:''}</div>`;
    }
    if(!art)return '';
    return `<div class="card-figure">${art}${stringLegend}${caption?`<p class="card-figure-caption">${caption}</p>`:''}</div>`;
  };
  const storageKey='gitarska-pustolovina-v1';
  let state={skills:{},notes:{},days:{},missionStars:{},melodyPicks:{},missionSteps:{},dayPractice:{},resumeRoute:'',activeWeek:1,guitarName:'',guitarNamed:false,metZvonko:false,zvonkoDay:''};
  let storageAvailable=true;
  try{
    const s=JSON.parse(localStorage.getItem(storageKey)||'null');
    if(s&&typeof s==='object'){
      state.skills=s.skills&&typeof s.skills==='object'?s.skills:{};
      state.notes=s.notes&&typeof s.notes==='object'?s.notes:{};
      state.days=s.days&&typeof s.days==='object'?s.days:{};
      state.missionStars=s.missionStars&&typeof s.missionStars==='object'?s.missionStars:{};
      if(s.doneMissions&&typeof s.doneMissions==='object'){
        Object.keys(s.doneMissions).forEach(k=>{if(s.doneMissions[k]&&!state.missionStars[k])state.missionStars[k]=1;});
      }
      state.dayPractice=s.dayPractice&&typeof s.dayPractice==='object'?s.dayPractice:{};
      state.missionSteps=s.missionSteps&&typeof s.missionSteps==='object'?s.missionSteps:{};
      state.resumeRoute=/^tjedan-[1-4]\/kartica-[1-4]-[1-7](\/dan-[1-7])?$/.test(s.resumeRoute||'')?s.resumeRoute:'';
      state.activeWeek=Math.min(4,Math.max(1,Number(s.activeWeek)||1));
      state.guitarName=typeof s.guitarName==='string'?s.guitarName:'';
      state.guitarNamed=s.guitarNamed===true||(s.guitarNamed===undefined&&!!state.guitarName.trim());
      state.metZvonko=!!s.metZvonko;
      state.zvonkoDay=typeof s.zvonkoDay==='string'?s.zvonkoDay:'';
      state.melodyPicks=s.melodyPicks&&typeof s.melodyPicks==='object'?s.melodyPicks:{};
    }
  }catch{storageAvailable=false}
  const MELODY_CHOICES=[
    {id:'1-0',s:1,f:0,label:'1. žica · prazna'},
    {id:'1-1',s:1,f:1,label:'1. žica · prag 1'},
    {id:'1-3',s:1,f:3,label:'1. žica · prag 3'},
    {id:'2-1',s:2,f:1,label:'2. žica · prag 1'},
    {id:'2-3',s:2,f:3,label:'2. žica · prag 3'}
  ];
  const melodyChoice=id=>MELODY_CHOICES.find(x=>x.id===id);
  const melodySlots=missionKey=>{const a=state.melodyPicks[missionKey];return Array.isArray(a)?a.slice(0,4):[];};
  const melodyBuilder=missionKey=>{
    const slots=melodySlots(missionKey);
    const slotHtml=[0,1,2,3].map(i=>{
      const id=slots[i];
      const ch=id?melodyChoice(id):null;
      const txt=ch?escape(ch.label):String(i+1);
      return `<div class="melody-slot${ch?' is-on':''}" aria-label="Zvuk ${i+1}">${txt}</div>`;
    }).join('');
    const picks=MELODY_CHOICES.map(ch=>`<button type="button" class="melody-choice" data-melody-pick="${escape(ch.id)}" data-melody-mission="${escape(missionKey)}"${slots.length===4?' disabled':''}>${escape(ch.label)}</button>`).join('');
    const spots=slots.map(id=>{const ch=melodyChoice(id);return ch?{string:ch.s,fret:ch.f,text:ch.f===0?'0':String(ch.f)}:null;}).filter(Boolean);
    const preview=teachFig(figNeck({aria:'Tvoja četiri zvuka na vratu',strings:[1,2],spots}),spots.length===4?'Sviraj redom s lijeva nadesno.':'Ovdje vidiš zvukove koje biraš.');
    const reset=`<div class="melody-actions"><button type="button" class="melody-reset secondary" data-melody-undo="${escape(missionKey)}"${slots.length?'':' disabled'}>Makni zadnji zvuk</button> <button type="button" class="melody-reset secondary" data-melody-reset="${escape(missionKey)}"${slots.length?'':' disabled'}>Počni ispočetka</button></div>`;
    return `<div class="melody-builder"><p class="melody-builder-lede">Izaberi četiri zvuka za svoju melodiju. Isti zvuk možeš izabrati više puta.</p><div class="melody-slots" role="list">${slotHtml}</div><div class="melody-choices" role="group" aria-label="Poznata mjesta">${picks}</div>${reset}${preview}</div>`;
  };
  const hideCardFig=(c,hero)=>{
    if(!hero)return false;
    if(c.week===2||c.week===3)return true;
    if(c.week===4&&c.num===2)return true;
    if(c.week===4&&c.num===5)return true;
    if(c.week===4&&c.num===4)return true;
    if(c.week===4&&(c.num===3||c.num===6)&&c.kind==='repeat')return true;
    return false;
  };
  const guitarNameTrim=()=>(state.guitarName||'').trim();
  const updateChrome=()=>{const el=document.getElementById('topbar-greeting');if(!el)return;const name=guitarNameTrim();el.textContent=name||'Gitara';el.setAttribute('aria-label',name?`${name}. Promijeni ime gitare`:'Dodaj ime gitare');document.documentElement.style.setProperty('--app-dock-height','0px');document.documentElement.style.setProperty('--app-topbar-height',Math.ceil(document.querySelector('.topbar').getBoundingClientRect().height)+'px');document.documentElement.style.setProperty('--app-utility-height','0px');};
  const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(state));storageAvailable=true}catch{storageAvailable=false}const status=document.getElementById('save-status');if(status)status.textContent=storageAvailable?'':'Zvjezdice se nisu mogle spremiti.';};
  const section=(title,body,id='',label='')=>`<section class="sheet"${id?` id="${id}"`:''}>${label?`<div class="sheet-label">${escape(label)}</div>`:''}<h2>${escape(title)}</h2>${body}</section>`;
  const heading=(label,title,desc)=>`<div class="page-heading"><div><div class="eyebrow">${escape(label)}</div><h1>${escape(title)}</h1><p class="lede">${escape(desc)}</p></div></div>`;
  const printQuiet=(label='Ispiši listić')=>`<p class="print-row"><button type="button" class="print print-quiet">${label}</button></p>`;
  const block=b=>{
    if(b[0]==='p')return `<p>${b[1]}</p>`;
    if(b[0]==='h')return `<h3>${escape(b[1])}</h3>`;
    if(b[0]==='note')return `<div class="note">${b[1]}</div>`;
    if(b[0]==='fig')return `<figure>${diagram(b[1],b[2])}</figure>`;
    if(b[0]==='table')return `<div class="tablewrap"><table><thead><tr>${b[1].map(v=>`<th>${escape(v).replace(/\n/g,'<br>')}</th>`).join('')}</tr></thead><tbody>${b[2].map(row=>`<tr>${row.map(v=>`<td>${escape(v).replace(/\n/g,'<br>')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    return '';
  };
  const pageBody=n=>data.pages[n-1].blocks.map(block).join('');
  const starLabels=['','Probala sam','Mogu sama','Znam napamet'];
  const getStars=key=>Math.min(3,Math.max(0,Number(state.missionStars[key])||0));
  const weekMissionCount=week=>data.cards.filter(c=>c.week===week).length;
  const starCards=week=>data.cards.filter(c=>c.week===week&&c.kind!=='review');
  const weekStarTotal=week=>starCards(week).reduce((sum,c)=>sum+getStars(`${c.week}-${c.num}`),0);
  const weekStarMax=week=>starCards(week).length*3;
  const totalStars=()=>[1,2,3,4].reduce((a,w)=>a+weekStarTotal(w),0);
  const badges=[
    {id:'zice',title:'Lovac na žice',icon:'string',week:1,need:['1-4','1-6']},
    {id:'prsti',title:'Čarobni prsti',icon:'hand',week:2,need:['2-3','2-6']},
    {id:'pjesmica',title:'Pjevačica',icon:'note',week:3,need:['3-5','3-6']},
    {id:'koncert',title:'Mali koncert',icon:'spark',week:4,needAny:['4-3','4-6']}
  ];
  const badgeIcon=kind=>`<span class="app-ico app-ico-${kind}" aria-hidden="true"></span>`;
  const badgeOn=b=>b.needAny?b.needAny.some(k=>getStars(k)>=1):b.need.every(k=>getStars(k)>=1);
  const unlockedBadges=()=>badges.filter(badgeOn);
  const nextBadge=()=>badges.find(b=>!badgeOn(b));
  const celebrate=(title,text,kind='star')=>{
    const toast=document.getElementById('zvonko-toast');if(!toast)return;
    clearTimeout(celebrate._t);
    toast.hidden=false;
    toast.className='zvonko-toast is-show is-'+kind;
    toast.innerHTML=`<img src="assets/dragon-guitar-pixar.jpg" alt="" width="72" height="72"><div><strong>${escape(title)}</strong><span>${escape(text)}</span></div>`;
    celebrate._t=setTimeout(()=>{
      toast.classList.remove('is-show');
      toast.hidden=true;
      toast.className='zvonko-toast';
      toast.innerHTML='';
    },3200);
  };
  const starHowTo=`<aside class="star-howto" aria-label="Kako dobivaš zvjezdice"><p class="star-howto-title"><span class="app-ico app-ico-star" aria-hidden="true"></span> Kako skupljaš zvjezdice?</p><ol class="star-howto-steps"><li><strong>Probaj</strong> sve korake vježbe.</li><li>Na zadnjem koraku dodirni <strong>Završi</strong>, pa odaberi zvjezdice — mama ili tata mogu pomoći.</li><li><strong>★</strong> Probala sam · <strong>★★</strong> Mogu sama · <strong>★★★</strong> Znam napamet</li></ol><p class="star-howto-note">Za tri zvjezdice pokaži cijelu vježbu napamet, bez pomoći i gledanja u upute. Ako zapneš, još malo vježbaj pa pokušaj opet.</p></aside>`;
  const starButtons=(key,n)=>`<div class="star-picker" role="group" aria-label="Zvjezdice za vježbu">
      <p class="star-picker-label">Završila si? Odaberi zvjezdice:</p>
      <div class="star-choice-row">${[
        [1,'★','Probala sam','Danas sam vježbala.'],
        [2,'★★','Mogu sama','Bez tuđe pomoći.'],
        [3,'★★★','Znam napamet','Bez pomoći i uputa.']
      ].map(([i,stars,label,desc])=>`<button type="button" class="star-choice${n===i?' is-on':''}" data-mission-star="${key}" data-stars="${i}" aria-pressed="${n===i}"><span class="star-choice-stars" aria-hidden="true">${stars}</span><span class="star-choice-label">${label}</span><span class="star-choice-desc">${desc}</span></button>`).join('')}</div>
      <p class="star-mastery-hint">Za ★★★ pokaži cijelu vježbu napamet, bez pomoći i gledanja u upute.</p>
      <div class="star-clear-slot">${n?`<button type="button" class="star-clear secondary" data-mission-star="${key}" data-stars="0">Makni zvjezdice</button>`:''}</div>
    </div>`;
  const cardTip=key=>{const tip=missionTips[key]||['Hajde!','Tri mala koraka. Polako — ja navijam!'];return tip;};
  /* Audio usklađen s misijom (ritam + tab gdje postoji snimka). */
  const cardAudioIndex=c=>{
    if(c.kind==='rhythm'){
      if(c.week===1&&c.num===3)return 5; /* zvuk–tišina */
      if(c.week===1&&c.num===5)return 2; /* Bratec A */
      if(c.week===2&&c.num===2)return 0; /* puls — četiri ravna zvuka */
      if(c.week===4&&c.num===4)return null; /* 4.4: dva playera u cardMedia */
      return 0; /* puls */
    }
    if(c.kind==='tab'){
      if(c.week===2&&(c.num===3||c.num===6))return 1; /* 0-1-3-1 */
      if(c.week===2&&c.num===4)return 9; /* 0-1-3 */
      if(c.week===2&&c.num===5)return 7; /* druga žica 1-3-1 */
      if(c.week===3&&c.num===3)return 6; /* most 3→0 */
      if(c.week===3&&c.num===5)return 2; /* dio A */
      if(c.week===3&&c.num===2)return 3; /* dio B / držanje */
      if(c.week===4&&c.num===2)return 2; /* A-A ≈ dio A */
    }
    if(c.kind==='repeat'){
      if(c.week===3&&(c.num===4||c.num===6))return [2,3]; /* A pa B */
      if(c.week===4&&(c.num===3||c.num===6))return 4; /* A-A-B-B */
    }
    return null;
  };
  const cardAudioBlock=(ai,extraNote,opts={})=>{
    const silence=ai===5;
    const note=opts.omitNote?'':(extraNote!=null?extraNote:(silence
      ?'Čuješ: <strong>zvuk</strong> · <strong>tišina</strong> · <strong>zvuk</strong> · <strong>tišina</strong>. Na tišini zaustavi žicu!'
      :'Prvo dva kratka otkucaja. Onda važni dio — tri puta. Sviraj uz njih.'));
    const label=opts.label||'▶ Poslušaj pa ponovi';
    const noteHtml=note?`<p class="card-audio-note">${note}</p>`:'';
    return `<div class="card-audio"><p class="card-audio-label">${label}</p><audio data-audio-index="${ai}" controls preload="none" aria-label="${escape(audioTitles[ai])}" src="assets/audio/${audioNames[ai]}"></audio>${noteHtml}</div>`;
  };
  const cardAudioBlocks=(ais,extraNote='')=>ais.map((ai,i)=>cardAudioBlock(ai,null,{omitNote:true,label:i===0?'▶ Dio A':'▶ Dio B'})).join('')+(extraNote?`<p class="card-audio-note card-audio-note-dual">${extraNote}</p>`:'');
  /* Jednostavni crteži ugrađeni u HTML — rade i bez učitavanja datoteke. */
    const figStrings=`<svg class="teach-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 687 311" role="img" aria-label="Cijela gitara vodoravno: prva i druga &#382;ica"><rect width="687" height="311" rx="20" fill="#fff5fb"/><polygon points="115.0,170 115.0,126 334.0,126 334.0,170" fill="#654839"/><line x1="149.0" y1="170" x2="149.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="169.0" y1="170" x2="169.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="188.0" y1="170" x2="188.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="206.0" y1="170" x2="206.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="223.0" y1="170" x2="223.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="239.0" y1="170" x2="239.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="254.0" y1="170" x2="254.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="268.0" y1="170" x2="268.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="281.0" y1="170" x2="281.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="293.0" y1="170" x2="293.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="304.0" y1="170" x2="304.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="315.0" y1="170" x2="315.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="325.0" y1="170" x2="325.0" y2="126" stroke="#c4a484" stroke-width="2"/><path d="M123.0 170.0 L51.0 175.0 Q38.0 175.0 36.0 165.0 L36.0 131.0 Q38.0 121.0 51.0 121.0 L123.0 126.0 Z" fill="#c9a06a" stroke="#8d6e4a" stroke-width="2.5" stroke-linejoin="round"/><polygon points="51.0,167 51.0,158 106.0,158 106.0,167" fill="#342a23"/><polygon points="51.0,138 51.0,129 106.0,129 106.0,138" fill="#342a23"/><line x1="58.0" y1="179" x2="58.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="179" x2="79.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="179" x2="100.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="58.0" y1="132" x2="58.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="132" x2="79.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="132" x2="100.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><polygon points="122.0,171 122.0,125 128.0,125 128.0,171" fill="#f8efe1"/><path d="M296.0 172.0 C281.0 196.0 293.0 234.0 319.0 242.0 C340.0 250.0 361.0 241.0 377.0 225.0 C394.0 210.0 408.0 213.0 429.0 232.0 C469.0 263.0 514.0 260.0 539.0 235.0 C567.0 208.0 567.0 88.0 539.0 61.0 C514.0 36.0 469.0 33.0 429.0 64.0 C408.0 83.0 394.0 86.0 377.0 71.0 C361.0 55.0 340.0 46.0 319.0 54.0 C293.0 62.0 281.0 100.0 296.0 124.0 Z" fill="#f0c878" stroke="#8d6e4a" stroke-width="3" stroke-linejoin="round"/><path d="M302.0 171.0 C288.0 199.0 300.0 227.0 322.0 235.0 C342.0 242.0 362.0 232.0 377.0 218.0 C398.0 201.0 411.0 205.0 434.0 225.0 C471.0 254.0 511.0 251.0 534.0 228.0 C559.0 203.0 559.0 93.0 534.0 68.0 C511.0 45.0 471.0 42.0 434.0 71.0 C411.0 91.0 398.0 95.0 377.0 78.0 C362.0 64.0 342.0 54.0 322.0 61.0 C300.0 69.0 288.0 97.0 302.0 125.0" fill="none" stroke="#d7b57a" stroke-width="1.5"/><circle cx="386.0" cy="148" r="32" fill="none" stroke="#956a3f" stroke-width="7"/><circle cx="386.0" cy="148" r="24" fill="#342b23"/><polygon points="481.0,190 481.0,106 497.0,106 497.0,190" fill="#63452e"/><polygon points="485.0,172 485.0,124 490.0,124 490.0,172" fill="#f3e6cf"/><line x1="64.0" y1="165" x2="488.0" y2="165" stroke="#ec407a" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="158" x2="488.0" y2="158" stroke="#ff9800" stroke-width="5" stroke-linecap="round"/><line x1="64.0" y1="151" x2="488.0" y2="151" stroke="#bdbdbd" stroke-width="3.5" stroke-linecap="round"/><line x1="64.0" y1="144" x2="488.0" y2="144" stroke="#bdbdbd" stroke-width="4" stroke-linecap="round"/><line x1="64.0" y1="137" x2="488.0" y2="137" stroke="#c8c8c8" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="130" x2="488.0" y2="130" stroke="#d0d0d0" stroke-width="5.2" stroke-linecap="round"/><line x1="484.0" y1="158" x2="597.0" y2="129" stroke="#ff9800" stroke-width="3" stroke-linecap="round"/><circle cx="619.0" cy="129" r="20" fill="#ff9800"/><text x="619.0" y="136" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">2</text><line x1="484.0" y1="165" x2="597.0" y2="193" stroke="#ec407a" stroke-width="3" stroke-linecap="round"/><circle cx="619.0" cy="193" r="20" fill="#ec407a"/><text x="619.0" y="200" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">1</text><polygon points="619.0,237 611.0,225 627.0,225" fill="#c2185b"/><text x="619.0" y="255" text-anchor="middle" fill="#c2185b" font-size="16" font-family="Arial,sans-serif" font-weight="bold">pod</text></svg>`;
  const figRhythm=`<svg class="teach-svg" data-rhythm-audio="0" viewBox="0 0 520 170" role="img" aria-label="Četiri koraka u ritmu"><rect width="520" height="170" rx="20" fill="#fff5fb"/><circle cx="70" cy="75" r="36" fill="#ec407a"/><text x="70" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="70" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="190" cy="75" r="36" fill="#ec407a"/><text x="190" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="190" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="310" cy="75" r="36" fill="#ec407a"/><text x="310" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="310" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="430" cy="75" r="36" fill="#ec407a"/><text x="430" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="430" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><g class="rhythm-marker" data-rhythm-step="0" aria-hidden="true"><circle cx="70" cy="75" r="43" class="rhythm-halo"/><path d="M61 15 H79 L70 27 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="1" aria-hidden="true"><circle cx="190" cy="75" r="43" class="rhythm-halo"/><path d="M181 15 H199 L190 27 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="2" aria-hidden="true"><circle cx="310" cy="75" r="43" class="rhythm-halo"/><path d="M301 15 H319 L310 27 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="3" aria-hidden="true"><circle cx="430" cy="75" r="43" class="rhythm-halo"/><path d="M421 15 H439 L430 27 Z" class="rhythm-pointer"/></g></svg>`;
  const figShow=`<svg class="teach-svg" data-rhythm-audio="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 687 510" role="img" aria-label="Prva žica na gitari, pa četiri zvuka"><rect width="687" height="510" rx="20" fill="#fff5fb"/><polygon points="115.0,170 115.0,126 334.0,126 334.0,170" fill="#654839"/><line x1="149.0" y1="170" x2="149.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="169.0" y1="170" x2="169.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="188.0" y1="170" x2="188.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="206.0" y1="170" x2="206.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="223.0" y1="170" x2="223.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="239.0" y1="170" x2="239.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="254.0" y1="170" x2="254.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="268.0" y1="170" x2="268.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="281.0" y1="170" x2="281.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="293.0" y1="170" x2="293.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="304.0" y1="170" x2="304.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="315.0" y1="170" x2="315.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="325.0" y1="170" x2="325.0" y2="126" stroke="#c4a484" stroke-width="2"/><path d="M123.0 170.0 L51.0 175.0 Q38.0 175.0 36.0 165.0 L36.0 131.0 Q38.0 121.0 51.0 121.0 L123.0 126.0 Z" fill="#c9a06a" stroke="#8d6e4a" stroke-width="2.5" stroke-linejoin="round"/><polygon points="51.0,167 51.0,158 106.0,158 106.0,167" fill="#342a23"/><polygon points="51.0,138 51.0,129 106.0,129 106.0,138" fill="#342a23"/><line x1="58.0" y1="179" x2="58.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="179" x2="79.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="179" x2="100.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="58.0" y1="132" x2="58.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="132" x2="79.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="132" x2="100.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><polygon points="122.0,171 122.0,125 128.0,125 128.0,171" fill="#f8efe1"/><path d="M296.0 172.0 C281.0 196.0 293.0 234.0 319.0 242.0 C340.0 250.0 361.0 241.0 377.0 225.0 C394.0 210.0 408.0 213.0 429.0 232.0 C469.0 263.0 514.0 260.0 539.0 235.0 C567.0 208.0 567.0 88.0 539.0 61.0 C514.0 36.0 469.0 33.0 429.0 64.0 C408.0 83.0 394.0 86.0 377.0 71.0 C361.0 55.0 340.0 46.0 319.0 54.0 C293.0 62.0 281.0 100.0 296.0 124.0 Z" fill="#f0c878" stroke="#8d6e4a" stroke-width="3" stroke-linejoin="round"/><path d="M302.0 171.0 C288.0 199.0 300.0 227.0 322.0 235.0 C342.0 242.0 362.0 232.0 377.0 218.0 C398.0 201.0 411.0 205.0 434.0 225.0 C471.0 254.0 511.0 251.0 534.0 228.0 C559.0 203.0 559.0 93.0 534.0 68.0 C511.0 45.0 471.0 42.0 434.0 71.0 C411.0 91.0 398.0 95.0 377.0 78.0 C362.0 64.0 342.0 54.0 322.0 61.0 C300.0 69.0 288.0 97.0 302.0 125.0" fill="none" stroke="#d7b57a" stroke-width="1.5"/><circle cx="386.0" cy="148" r="32" fill="none" stroke="#956a3f" stroke-width="7"/><circle cx="386.0" cy="148" r="24" fill="#342b23"/><polygon points="481.0,190 481.0,106 497.0,106 497.0,190" fill="#63452e"/><polygon points="485.0,172 485.0,124 490.0,124 490.0,172" fill="#f3e6cf"/><line x1="64.0" y1="165" x2="488.0" y2="165" stroke="#ec407a" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="158" x2="488.0" y2="158" stroke="#bdbdbd" stroke-width="4" stroke-linecap="round"/><line x1="64.0" y1="151" x2="488.0" y2="151" stroke="#bdbdbd" stroke-width="3.5" stroke-linecap="round"/><line x1="64.0" y1="144" x2="488.0" y2="144" stroke="#bdbdbd" stroke-width="4" stroke-linecap="round"/><line x1="64.0" y1="137" x2="488.0" y2="137" stroke="#c8c8c8" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="130" x2="488.0" y2="130" stroke="#d0d0d0" stroke-width="5.2" stroke-linecap="round"/><line x1="484.0" y1="165" x2="597.0" y2="193" stroke="#ec407a" stroke-width="3" stroke-linecap="round"/><circle cx="619.0" cy="193" r="20" fill="#ec407a"/><text x="619.0" y="200" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">1</text><polygon points="619.0,237 611.0,225 627.0,225" fill="#c2185b"/><text x="619.0" y="255" text-anchor="middle" fill="#c2185b" font-size="16" font-family="Arial,sans-serif" font-weight="bold">pod</text><circle cx="152" cy="388" r="50" fill="#ec407a"/><text x="152" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="152" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="280" cy="388" r="50" fill="#ec407a"/><text x="280" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="280" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="408" cy="388" r="50" fill="#ec407a"/><text x="408" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="408" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="536" cy="388" r="50" fill="#ec407a"/><text x="536" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="536" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><g class="rhythm-marker" data-rhythm-step="0" aria-hidden="true"><circle cx="152" cy="388" r="57" class="rhythm-halo"/><path d="M143 314 H161 L152 326 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="1" aria-hidden="true"><circle cx="280" cy="388" r="57" class="rhythm-halo"/><path d="M271 314 H289 L280 326 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="2" aria-hidden="true"><circle cx="408" cy="388" r="57" class="rhythm-halo"/><path d="M399 314 H417 L408 326 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="3" aria-hidden="true"><circle cx="536" cy="388" r="57" class="rhythm-halo"/><path d="M527 314 H545 L536 326 Z" class="rhythm-pointer"/></g></svg>`;
  const figSilence=`<svg class="teach-svg" data-rhythm-audio="5" viewBox="0 0 520 170" role="img" aria-label="Zvuk pa tišina"><rect width="520" height="170" rx="20" fill="#fff5fb"/><circle cx="70" cy="75" r="36" fill="#ec407a"/><text x="70" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="70" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="190" cy="75" r="36" fill="none" stroke="#bdbdbd" stroke-width="4" stroke-dasharray="7 5"/><text x="190" y="82" text-anchor="middle" fill="#9e9e9e" font-size="26" font-family="Arial,sans-serif" font-weight="bold">×</text><text x="190" y="140" text-anchor="middle" fill="#757575" font-size="15" font-family="Arial,sans-serif" font-weight="bold">tišina</text><circle cx="310" cy="75" r="36" fill="#ec407a"/><text x="310" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="310" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="430" cy="75" r="36" fill="none" stroke="#bdbdbd" stroke-width="4" stroke-dasharray="7 5"/><text x="430" y="82" text-anchor="middle" fill="#9e9e9e" font-size="26" font-family="Arial,sans-serif" font-weight="bold">×</text><text x="430" y="140" text-anchor="middle" fill="#757575" font-size="15" font-family="Arial,sans-serif" font-weight="bold">tišina</text><g class="rhythm-marker" data-rhythm-step="0" aria-hidden="true"><circle cx="70" cy="75" r="43" class="rhythm-halo"/><path d="M61 15 H79 L70 27 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="1" aria-hidden="true"><circle cx="190" cy="75" r="43" class="rhythm-halo"/><path d="M181 15 H199 L190 27 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="2" aria-hidden="true"><circle cx="310" cy="75" r="43" class="rhythm-halo"/><path d="M301 15 H319 L310 27 Z" class="rhythm-pointer"/></g><g class="rhythm-marker" data-rhythm-step="3" aria-hidden="true"><circle cx="430" cy="75" r="43" class="rhythm-halo"/><path d="M421 15 H439 L430 27 Z" class="rhythm-pointer"/></g></svg>`;
  const figBridge=`<svg class="teach-svg" viewBox="0 0 520 200" role="img" aria-label="Most između žica"><rect width="520" height="200" rx="20" fill="#fff5fb"/><rect x="30" y="40" width="170" height="100" rx="12" fill="#fff3e0" stroke="#ff9800" stroke-width="3"/><line x1="50" y1="80" x2="180" y2="80" stroke="#ff9800" stroke-width="5" stroke-linecap="round"/><circle cx="115" cy="80" r="20" fill="#ff9800"/><text x="115" y="87" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">3</text><text x="115" y="120" text-anchor="middle" fill="#e65100" font-size="14" font-family="Arial,sans-serif" font-weight="bold">2. žica</text><path d="M220 90 H280" stroke="#ec407a" stroke-width="5" stroke-linecap="round"/><polygon points="290,90 274,82 274,98" fill="#ec407a"/><rect x="310" y="40" width="170" height="100" rx="12" fill="#ffe4f0" stroke="#ec407a" stroke-width="3"/><line x1="330" y1="80" x2="460" y2="80" stroke="#ec407a" stroke-width="3.5" stroke-linecap="round"/><circle cx="395" cy="80" r="20" fill="#ec407a"/><text x="395" y="87" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">0</text><text x="395" y="120" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">1. žica</text><text x="260" y="175" text-anchor="middle" fill="#880e4f" font-size="16" font-family="Arial,sans-serif" font-weight="bold">skok!</text></svg>`;
  const figReviewFavorite=`<svg class="teach-svg" viewBox="0 0 420 200" role="img" aria-label="Izaberi omiljenu misiju"><rect width="420" height="200" rx="20" fill="#fff5fb"/><circle cx="210" cy="88" r="52" fill="#ffe4f0" stroke="#ec407a" stroke-width="3"/><text x="210" y="100" text-anchor="middle" fill="#c2185b" font-size="44" font-family="Arial,sans-serif" font-weight="bold">★</text><text x="210" y="168" text-anchor="middle" fill="#c2185b" font-size="22" font-family="Fredoka,Nunito,Arial,sans-serif" font-weight="bold">Tvoj izbor!</text></svg>`;
  const figRepeatMotif=`<svg class="teach-svg" viewBox="0 0 560 170" role="img" aria-label="Dva puta A, dva puta B"><rect width="560" height="170" rx="20" fill="#fff5fb"/><rect x="36" y="42" width="104" height="72" rx="16" fill="#ffe4f0" stroke="#ec407a" stroke-width="3"/><text x="88" y="92" text-anchor="middle" fill="#c2185b" font-size="36" font-family="Arial,sans-serif" font-weight="bold">A</text><rect x="160" y="42" width="104" height="72" rx="16" fill="#ffe4f0" stroke="#ec407a" stroke-width="3"/><text x="212" y="92" text-anchor="middle" fill="#c2185b" font-size="36" font-family="Arial,sans-serif" font-weight="bold">A</text><rect x="284" y="42" width="104" height="72" rx="16" fill="#fff8e1" stroke="#f06292" stroke-width="3"/><text x="336" y="92" text-anchor="middle" fill="#ad1457" font-size="36" font-family="Arial,sans-serif" font-weight="bold">B</text><rect x="408" y="42" width="104" height="72" rx="16" fill="#fff8e1" stroke="#f06292" stroke-width="3"/><text x="460" y="92" text-anchor="middle" fill="#ad1457" font-size="36" font-family="Arial,sans-serif" font-weight="bold">B</text><text x="88" y="138" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">dio</text><text x="212" y="138" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">ponovi</text><text x="336" y="138" text-anchor="middle" fill="#ad1457" font-size="14" font-family="Arial,sans-serif" font-weight="bold">dio</text><text x="460" y="138" text-anchor="middle" fill="#ad1457" font-size="14" font-family="Arial,sans-serif" font-weight="bold">ponovi</text></svg>`;
  const figDoubleA=`<svg class="teach-svg" viewBox="0 0 360 170" role="img" aria-label="Dva puta dio A"><rect width="360" height="170" rx="20" fill="#fff5fb"/><rect x="48" y="42" width="120" height="72" rx="16" fill="#ffe4f0" stroke="#ec407a" stroke-width="3"/><text x="108" y="92" text-anchor="middle" fill="#c2185b" font-size="36" font-family="Arial,sans-serif" font-weight="bold">A</text><rect x="192" y="42" width="120" height="72" rx="16" fill="#ffe4f0" stroke="#ec407a" stroke-width="3"/><text x="252" y="92" text-anchor="middle" fill="#c2185b" font-size="36" font-family="Arial,sans-serif" font-weight="bold">A</text><text x="108" y="138" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">prvi</text><text x="252" y="138" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">odmah opet</text></svg>`;
  const figFourSlots=`<svg class="teach-svg" viewBox="0 0 480 150" role="img" aria-label="Četiri mjesta za tvoju melodiju"><rect width="480" height="150" rx="20" fill="#fff5fb"/><rect x="36" y="40" width="84" height="70" rx="14" fill="#fff" stroke="#ec407a" stroke-width="3" stroke-dasharray="8 6"/><rect x="138" y="40" width="84" height="70" rx="14" fill="#fff" stroke="#ec407a" stroke-width="3" stroke-dasharray="8 6"/><rect x="240" y="40" width="84" height="70" rx="14" fill="#fff" stroke="#ec407a" stroke-width="3" stroke-dasharray="8 6"/><rect x="342" y="40" width="84" height="70" rx="14" fill="#fff" stroke="#ec407a" stroke-width="3" stroke-dasharray="8 6"/><text x="78" y="88" text-anchor="middle" fill="#c2185b" font-size="22" font-family="Arial,sans-serif" font-weight="bold">1</text><text x="180" y="88" text-anchor="middle" fill="#c2185b" font-size="22" font-family="Arial,sans-serif" font-weight="bold">2</text><text x="282" y="88" text-anchor="middle" fill="#c2185b" font-size="22" font-family="Arial,sans-serif" font-weight="bold">3</text><text x="384" y="88" text-anchor="middle" fill="#c2185b" font-size="22" font-family="Arial,sans-serif" font-weight="bold">4</text><text x="240" y="132" text-anchor="middle" fill="#880e4f" font-size="14" font-family="Arial,sans-serif" font-weight="bold">ti biraš — redom</text></svg>`;
  const figTogetherPulse=`<svg class="teach-svg" viewBox="0 0 520 200" role="img" aria-label="Mama tapka puls, Marija svira motiv"><rect width="520" height="200" rx="20" fill="#fff5fb"/><text x="130" y="34" text-anchor="middle" fill="#6a1b9a" font-size="14" font-family="Arial,sans-serif" font-weight="bold">mama / tata</text><circle cx="58" cy="92" r="20" fill="#ce93d8"/><circle cx="98" cy="92" r="20" fill="#ce93d8"/><circle cx="138" cy="92" r="20" fill="#ce93d8"/><circle cx="178" cy="92" r="20" fill="#ce93d8"/><text x="118" y="100" text-anchor="middle" fill="#fff" font-size="16" font-family="Arial,sans-serif">♪</text><text x="130" y="142" text-anchor="middle" fill="#6a1b9a" font-size="13" font-family="Arial,sans-serif" font-weight="bold">tiho tapka</text><text x="260" y="100" text-anchor="middle" fill="#c2185b" font-size="28" font-family="Arial,sans-serif" font-weight="bold">+</text><text x="390" y="34" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">ti</text><rect x="302" y="68" width="40" height="32" rx="8" fill="#ffe4f0" stroke="#ec407a" stroke-width="2"/><text x="322" y="90" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">A</text><rect x="348" y="68" width="40" height="32" rx="8" fill="#ffe4f0" stroke="#ec407a" stroke-width="2"/><text x="368" y="90" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">A</text><rect x="394" y="68" width="40" height="32" rx="8" fill="#fff8e1" stroke="#f06292" stroke-width="2"/><text x="414" y="90" text-anchor="middle" fill="#ad1457" font-size="15" font-family="Arial,sans-serif" font-weight="bold">B</text><rect x="440" y="68" width="40" height="32" rx="8" fill="#fff8e1" stroke="#f06292" stroke-width="2"/><text x="460" y="90" text-anchor="middle" fill="#ad1457" font-size="15" font-family="Arial,sans-serif" font-weight="bold">B</text><text x="390" y="142" text-anchor="middle" fill="#c2185b" font-size="13" font-family="Arial,sans-serif" font-weight="bold">motiv na gitari</text><text x="260" y="178" text-anchor="middle" fill="#880e4f" font-size="15" font-family="Arial,sans-serif" font-weight="bold">u istom koraku</text></svg>`;
  const figNeck=o=>{
    const aria=o.aria||'Vrat gitare i mjesto prsta';
    const string=o.string||1;
    const highlight=o.strings||(o.string?[o.string]:[1]);
    const spots=o.spots||[];
    const seq=o.seq||null;
    const seqSteps=o.seqSteps||null;
    const W=680;
    const H=(seq||seqSteps)?372:286;
    const neckTop=64, neckBot=204, neckL=168, neckR=520;
    const frets=[286,362,438,500];
    const sy={6:82,5:100,4:118,3:136,2:164,1:192};
    const hot=fret=>spots.some(s=>s.fret===fret);
    const parts=[];
    parts.push('<svg class="teach-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+aria+'">');
    parts.push('<rect width="'+W+'" height="'+H+'" rx="20" fill="#fff5fb"/>');
    const head='M174 64 L152 64 C140 64 136 50 124 46 L56 46 C36 46 28 58 28 78 L28 190 C28 210 36 222 56 222 L124 222 C136 218 140 204 152 204 L174 204 Z';
    parts.push('<path d="'+head+'" fill="#f0c878" stroke="#8d6e4a" stroke-width="2.5" stroke-linejoin="round"/>');
    const slots=[[40,54],[68,54],[96,54],[40,196],[68,196],[96,196]];
    slots.forEach(([x,y])=>parts.push('<rect x="'+x+'" y="'+y+'" width="24" height="18" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>'));
    const rollers=[[38,58],[66,58],[94,58],[38,200],[66,200],[94,200]];
    rollers.forEach(([x,y])=>parts.push('<rect x="'+x+'" y="'+y+'" width="28" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>'));
    const pegs=[[52,32,'#f48fb1',42],[80,32,'#f48fb1',42],[108,32,'#f48fb1',42],[52,236,'#ec407a',226],[80,236,'#ec407a',226],[108,236,'#ec407a',226]];
    pegs.forEach(([cx,cy,fill,stemY])=>{
      parts.push('<line x1="'+cx+'" y1="'+stemY+'" x2="'+cx+'" y2="'+(cy<100?58:208)+'" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>');
      parts.push('<circle cx="'+cx+'" cy="'+cy+'" r="10" fill="'+fill+'"/>');
      parts.push('<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="#fff"/>');
    });
    parts.push('<rect x="'+neckL+'" y="'+neckTop+'" width="'+(neckR-neckL)+'" height="'+(neckBot-neckTop)+'" fill="#654839"/>');
    frets.forEach((x,i)=>{
      const on=hot(i+1);
      parts.push('<line x1="'+x+'" y1="'+neckTop+'" x2="'+x+'" y2="'+neckBot+'" stroke="'+(on?'#3e2723':'#c4a484')+'" stroke-width="'+(on?7:3)+'"/>');
    });
    const colOf=n=>n===1?'#ec407a':n===2?'#ff9800':'#d0d0d0';
    const wOf=n=>highlight.includes(n)?7:n<=2?4:3;
    const fan={6:[108,62],5:[80,62],4:[52,62],3:[52,204],2:[80,204],1:[108,204]};
    [6,5,4,3,2,1].forEach(n=>{
      const y=sy[n];
      const [fx,fy]=fan[n];
      const fanCol=colOf(n)==='#d0d0d0'?'#8d6e63':colOf(n);
      parts.push('<line x1="164" y1="'+y+'" x2="'+fx+'" y2="'+fy+'" stroke="'+fanCol+'" stroke-width="'+Math.max(2,wOf(n)-1)+'" stroke-linecap="round"/>');
      parts.push('<line x1="176" y1="'+y+'" x2="'+(neckR-6)+'" y2="'+y+'" stroke="'+colOf(n)+'" stroke-width="'+wOf(n)+'" stroke-linecap="round"/>');
    });
    parts.push('<rect x="'+(neckL-7)+'" y="'+(neckTop-3)+'" width="14" height="'+(neckBot-neckTop+6)+'" fill="#f8efe1" stroke="#8d6e4a"/>');
    const yStr=sy[string];
    const b2x=618, b1x=618;
    parts.push('<line x1="'+(neckR-6)+'" y1="'+sy[2]+'" x2="'+(b2x-16)+'" y2="'+sy[2]+'" stroke="#ff9800" stroke-width="3" stroke-linecap="round"/>');
    parts.push('<circle cx="'+b2x+'" cy="'+sy[2]+'" r="15" fill="#ff9800"/><text x="'+b2x+'" y="'+(sy[2]+5)+'" text-anchor="middle" fill="#fff" font-size="16" font-family="Arial,sans-serif" font-weight="bold">2</text>');
    parts.push('<line x1="'+(neckR-6)+'" y1="'+sy[1]+'" x2="'+(b1x-16)+'" y2="'+sy[1]+'" stroke="#ec407a" stroke-width="3" stroke-linecap="round"/>');
    parts.push('<circle cx="'+b1x+'" cy="'+sy[1]+'" r="15" fill="#ec407a"/><text x="'+b1x+'" y="'+(sy[1]+5)+'" text-anchor="middle" fill="#fff" font-size="16" font-family="Arial,sans-serif" font-weight="bold">1</text>');
    parts.push('<polygon points="'+b1x+','+(sy[1]+40)+' '+(b1x-8)+','+(sy[1]+26)+' '+(b1x+8)+','+(sy[1]+26)+'" fill="#c2185b"/>');
    parts.push('<text x="'+b1x+'" y="'+(sy[1]+56)+'" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">pod</text>');
    spots.forEach(s=>{
      const str=s.string||string;
      const ySpot=sy[str];
      if(s.fret===0){
        const x=208;
        parts.push('<circle cx="'+x+'" cy="'+ySpot+'" r="13" fill="#fff5fb" stroke="#c2185b" stroke-width="3"/>');
        parts.push('<text x="'+x+'" y="'+(ySpot+5)+'" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">0</text>');
      }else{
        const fx=frets[s.fret-1]-26;
        parts.push('<ellipse cx="'+fx+'" cy="'+ySpot+'" rx="18" ry="14" fill="#ffccbc" stroke="#e57373" stroke-width="3"/>');
        if(s.text)parts.push('<text x="'+fx+'" y="'+(neckBot+26)+'" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">'+s.text+'</text>');
        if(s.mark)parts.push('<text x="'+frets[s.fret-1]+'" y="'+(neckTop-14)+'" text-anchor="middle" fill="#5d4037" font-size="15" font-family="Arial,sans-serif" font-weight="bold">'+s.mark+'</text>');
      }
    });
    if(seqSteps){
      const n=seqSteps.length;
      const left=96, right=500;
      seqSteps.forEach((step,i)=>{
        const x=n===1?(left+right)/2:left+i*(right-left)/(n-1);
        const open=step.f===0;
        const hold=!!step.hold;
        const label=step.label||(hold?'drži':open?'prazno':step.f===1?'kažiprst':step.f===3?'prstenjak':'');
        const numText=hold?'3':String(step.f);
        parts.push('<circle cx="'+x+'" cy="304" r="26" '+(open?'fill="#fff5fb" stroke="#c2185b" stroke-width="4"':hold?'fill="#fff3e0" stroke="#ff9800" stroke-width="4"':'fill="#ec407a"')+'/>');
        parts.push('<text x="'+x+'" y="312" text-anchor="middle" fill="'+(open||hold?'#c2185b':'#fff')+'" font-size="'+(hold?18:20)+'" font-family="Arial,sans-serif" font-weight="bold">'+numText+'</text>');
        const sub=step.s?(step.s+'. žica · '):'';
        parts.push('<text x="'+x+'" y="350" text-anchor="middle" fill="#c2185b" font-size="13" font-family="Arial,sans-serif" font-weight="bold">'+sub+label+'</text>');
      });
    }else if(seq){
      const words={0:'prazno',1:'kažiprst',3:'prstenjak'};
      const n=seq.length;
      const left=96, right=500;
      seq.forEach((num,i)=>{
        const x=n===1?(left+right)/2:left+i*(right-left)/(n-1);
        const open=num===0;
        parts.push('<circle cx="'+x+'" cy="304" r="26" '+(open?'fill="#fff5fb" stroke="#c2185b" stroke-width="4"':'fill="#ec407a"')+'/>');
        parts.push('<text x="'+x+'" y="312" text-anchor="middle" fill="'+(open?'#c2185b':'#fff')+'" font-size="20" font-family="Arial,sans-serif" font-weight="bold">'+num+'</text>');
        parts.push('<text x="'+x+'" y="350" text-anchor="middle" fill="#c2185b" font-size="14" font-family="Arial,sans-serif" font-weight="bold">'+(words[num]||'')+'</text>');
      });
    }
    parts.push('</svg>');
    return parts.join('');
  };

  const figSit=`<svg class="teach-svg teach-svg-tall" viewBox="0 0 360 380" role="img" aria-label="Udobno sjedim"><rect width="360" height="380" rx="20" fill="#fff5fb"/><rect x="95" y="250" width="160" height="16" rx="4" fill="#ce93d8"/><rect x="110" y="266" width="14" height="55" fill="#ab47bc"/><rect x="226" y="266" width="14" height="55" fill="#ab47bc"/><ellipse cx="180" cy="190" rx="48" ry="60" fill="#f8bbd0"/><circle cx="180" cy="100" r="32" fill="#ffccbc"/><ellipse cx="170" cy="96" rx="2.5" ry="3.5" fill="#5d4037"/><ellipse cx="190" cy="96" rx="2.5" ry="3.5" fill="#5d4037"/><path d="M168 112 Q180 120 192 112" fill="none" stroke="#e57373" stroke-width="2"/><path d="M150 92 Q155 64 180 62 Q205 64 210 92" fill="#8d6e63"/><ellipse cx="230" cy="210" rx="58" ry="48" fill="#f0c878" stroke="#8d6e4a" stroke-width="2" transform="rotate(-12 230 210)"/><circle cx="235" cy="205" r="14" fill="#3e2723"/><rect x="185" y="125" width="18" height="75" rx="2" fill="#a1887f" transform="rotate(-12 194 162)"/><path d="M145 165 Q110 200 130 230" fill="none" stroke="#ffccbc" stroke-width="12" stroke-linecap="round"/><path d="M205 170 Q250 180 245 220" fill="none" stroke="#ffccbc" stroke-width="12" stroke-linecap="round"/><path d="M158 248 Q145 290 135 335" fill="none" stroke="#f48fb1" stroke-width="14" stroke-linecap="round"/><path d="M200 248 Q220 290 240 335" fill="none" stroke="#f48fb1" stroke-width="14" stroke-linecap="round"/><ellipse cx="130" cy="345" rx="18" ry="8" fill="#ec407a"/><ellipse cx="245" cy="345" rx="18" ry="8" fill="#ec407a"/></svg>`;
  const teachFig=(svg,caption)=>`<div class="teach-hero">${svg}${caption?`<p class="card-figure-caption">${withFingers(caption)}</p>`:''}</div>`;
  const missionHero=(c,shownStep)=>{
    const k=`${c.week}-${c.num}`;
    /* Sjedenje: originalni crtež s legendom (bez AI slike). */
    if(k==='1-1'){
      const step=shownStep??(missionStep[missionStepKey(k)]||0);
      if(step===2)return teachFig(figStrings,'Prva žica je najtanja i najbliža podu. Nježno je dotakni.');
      return `<figure class="step-posture"><img class="posture-girl" src="assets/illustrations/udobno-sjedenje-curica.jpg" alt="Udoban položaj s gitarom: opuštena ramena i oslonjena stopala" width="600" height="800"><figcaption>${step===0?'Oba stopala imaju oslonac. Gitara miruje na nozi.':'Spusti ramena. Šake neka budu mekane i opuštene.'}</figcaption></figure>`;
    }
    if(k==='4-1')return '';
    if(k==='1-2')return teachFig(figRhythm,'');
    if(k==='1-6')return teachFig(figShow,'<span class="c-s1">1</span> = najtanja, najbliža podu');
    if(k==='1-3')return teachFig(figSilence,'');
    if(k==='1-4')return teachFig(figStrings,'<span class="c-s1">1</span> = najtanja, najbliža podu · <span class="c-s2">2</span> = odmah iznad');
    if(k==='2-1')return teachFig(figNeck({aria:'Kažiprst na prvoj žici, tik uz prvu prečku',string:1,spots:[{fret:1,text:'kažiprst',mark:'prečka'}]}),'<span class="c-s1">1</span> = najtanja, najbliža podu.');
    if(k==='2-2')return teachFig(figNeck({aria:'Četiri puta prazna prva žica',string:1,seq:[0,0,0,0]}),'<span class="c-s1">1</span> = najtanja, najbliža podu.');
    if(k==='2-3')return teachFig(figNeck({aria:'Na prvoj žici mjesta 1 i 3, niz 0 1 3 1',string:1,spots:[{fret:1,text:'1'},{fret:3,text:'3'}],seq:[0,1,3,1]}),'');
    if(k==='2-6')return teachFig(figNeck({aria:'Na prvoj žici mjesta 1 i 3, niz 0 1 3 1',string:1,spots:[{fret:1,text:'1'},{fret:3,text:'3'}],seq:[0,1,3,1]}),'1 = kažiprst uz prvu prečku. 3 = prstenjak uz treću.');
    if(k==='2-4')return teachFig(figNeck({aria:'Na prvoj žici redoslijed 0, 1, 3: krug 1 je kažiprst, krug 3 je prstenjak',string:1,spots:[{fret:0},{fret:1,text:'kažiprst'},{fret:3,text:'prstenjak'}],seq:[0,1,3]}),'');
    if(k==='2-5')return teachFig(figNeck({aria:'Na drugoj žici kažiprst uz prvu prečku i prstenjak uz treću',string:2,spots:[{fret:1,text:'kažiprst'},{fret:3,text:'prstenjak'}],seq:[1,3,1]}),'<span class="c-s2">2</span> = narančasta, odmah iznad prve. 1 = kažiprst. 3 = prstenjak.');
    if(k==='3-1')return teachFig(figNeck({aria:'Kažiprst na prvom pragu druge žice',string:2,strings:[1,2],spots:[{string:2,fret:1,text:'kažiprst',mark:'prečka'}]}),'<span class="c-s2">2</span> = narančasta. Kažiprst tik uz prvu prečku.');
    if(k==='3-2')return teachFig(figNeck({aria:'Prva žica: 0, 1, 3 — zadnji ton drži',string:1,spots:[{fret:0},{fret:1,text:'1'},{fret:3,text:'3'}],seqSteps:[{s:1,f:0},{s:1,f:1},{s:1,f:3},{s:1,f:3,hold:true}]}),'');
    if(k==='3-3')return teachFig(figNeck({aria:'Most: druga žica 3, pa prva prazna',strings:[1,2],spots:[{string:2,fret:3,text:'3'},{string:1,fret:0}],seqSteps:[{s:2,f:3,label:'2. žica'},{s:1,f:0,label:'1. žica'}]}),'');
    if(k==='3-5')return teachFig(figNeck({aria:'Bratec Martin, dio A',strings:[1,2],spots:[{string:2,fret:1,text:'1'},{string:2,fret:3,text:'3'},{string:1,fret:0},{string:2,fret:1,text:'1'}],seqSteps:[{s:2,f:1},{s:2,f:3},{s:1,f:0},{s:2,f:1}]}),'');
    if(k==='3-4')return teachFig(figRepeatMotif,'');
    if(k==='3-6')return teachFig(figRepeatMotif,'');
    if(k==='4-2')return teachFig(figNeck({aria:'Dio A — pa odmah isti red još jednom',strings:[1,2],spots:[{string:2,fret:1,text:'1'},{string:2,fret:3,text:'3'},{string:1,fret:0},{string:2,fret:1,text:'1'}],seqSteps:[{s:2,f:1},{s:2,f:3},{s:1,f:0},{s:2,f:1}]}),'');
    if(k==='4-3'&&missionDay(4,3)===3)return teachFig(figNeck({aria:'Kraj A i početak B: druga žica prvi prag, pa prazna prva žica',strings:[1,2],spots:[{string:2,fret:1},{string:1,fret:0}],seqSteps:[{s:2,f:1},{s:1,f:0}]}),'Samo ova dva zvuka.');
    if(k==='4-3')return teachFig(figRepeatMotif,'');
    if(k==='4-4')return teachFig(figTogetherPulse,'');
    if(k==='4-5')return teachFig(figFourSlots,'');
    if(k==='4-6')return teachFig(figRepeatMotif,'');
    if(c.kind==='review')return teachFig(figReviewFavorite,'');
    return '';
  };
  const reviewPickList=week=>{
    const picks=data.cards.filter(c=>c.week===week&&c.kind!=='review');
    return `<div class="review-picks"><p class="review-picks-lede">Dodirni vježbu koju želiš ponoviti:</p><div class="review-picks-grid">${picks.map(c=>`<a class="review-pick" href="${missionRoute(week,c.num)}"><span class="review-pick-title">${escape(cardTitle(week,c.num))}</span></a>`).join('')}</div></div>`;
  };
  const partReminder=()=>`<details class="part-reminder"><summary>Podsjeti me: dio A i dio B</summary><p><strong>Dio A:</strong> druga žica 1 → druga žica 3 → prva žica 0 → druga žica 1.</p><p><strong>Dio B:</strong> prva žica 0 → 1 → 3. Zadnji zvuk drži dva koraka.</p><a class="button secondary" href="#pjesmica/bratec-vjezba">Otvori vježbu s dijelovima A i B</a></details>`;
  const cardParts=(c,shownStep)=>{
    const hero=()=>missionHero(c,shownStep);
    const fig=c.kind==='neck'?'':diagram(c.kind,c.data);
    const drawn=hero();
    const hideFig=hideCardFig(c,drawn);
    const picture=()=>{
      if(c.kind==='review')return '';
      if(c.week===1&&c.num===1)return drawn;
      if(c.week===4&&c.num===5)return `${drawn}${melodyBuilder(`${c.week}-${c.num}`)}`;
      if(c.week===1&&c.num===5)return '';
      if(c.kind==='posture')return drawn||'<figure class="step-posture"><img class="posture-girl" src="assets/illustrations/udobno-sjedenje-curica.jpg" alt="Udoban položaj s gitarom" width="600" height="800"><figcaption>Sjedni udobno, osloni stopala i opusti ramena.</figcaption></figure>';
      if(drawn&&(c.kind==='strings'||c.kind==='neck'||c.kind==='rhythm'))return drawn;
      if(drawn)return `${drawn}${hideFig?'':fig}`;
      return fig;
    };
    const sound=()=>{
      if(c.kind==='review'||(c.week===4&&c.num===5))return '';
      if(c.week===4&&c.num===3&&missionDay(4,3)===3)return '<div class="card-audio"><button type="button" class="button" data-play-song="bratec-prijelaz" data-play-label="▶ Poslušaj ova dva zvuka">▶ Poslušaj ova dva zvuka</button></div>';
      if(c.week===4&&c.num===4){
        const note='Mama ili tata tapkaju dok ti sviraš. Prvo poslušajte svaki primjer zasebno.';
        return `${cardAudioBlock(0,null,{omitNote:true,label:'▶ 1. Mama ili tata tapkaju'})}${cardAudioBlock(4,null,{omitNote:true,label:'▶ 2. Ti sviraš A, A, B, B'})}<p class="card-audio-note">${note}</p>`;
      }
      const ai=cardAudioIndex(c);
      if(ai===null)return '';
      if(c.kind==='rhythm')return cardAudioBlock(ai,'');
      if(Array.isArray(ai)){
        const dualNote=c.week===3&&c.num===4
          ?'Za 3. korak: <a href="#pjesmica/bratec-vjezba">Pjesmice → Bratec Martin</a>.'
          :c.week===3&&c.num===6
          ?'U B-u zadnji ton traje duže.'
          :'';
        return cardAudioBlocks(ai,dualNote);
      }
      const tip=c.week===3&&c.num===2
        ?'Slušaj dio B: zadnji ton traje duže — ne trzaj!'
        :c.week===2&&c.num===5
        ?'Sve na <strong>drugoj</strong> žici.'
        :c.week===2&&c.num===6
        ?'Poslušaj jednom, pa sviraj sama.'
        :c.week===2&&c.num===3
        ?'Prvo uši, pa prsti uz crtež.'
        :c.week===4&&c.num===6
        ?'Poslušaj jednom. Onda sviraj s lista.'
        :'';
      return cardAudioBlock(ai,tip);
    };
    return {picture:picture(),sound:sound()};
  };
  const missionStep=state.missionSteps;
  const missionStepKey=key=>/\/dan-[1-7]$/.test(location.hash)?key+'-'+location.hash.split('/')[2]:key;
  let stuckOpen={};
  /* 1.5 je pjevanje i pljesak, 3.4 je list i glas — gitara čeka. */
  const lessonUsesGuitar=c=>!(c.week===1&&c.num===5)&&!(c.week===3&&c.num===4);
  const tuneReminder=()=>`<p class="tune-check">Je li gitara naštimana?</p>`;
  const tuneFigure=()=>`<svg class="teach-svg tune-svg" viewBox="0 0 320 210" role="img" aria-label="Glava klasične gitare: vrat, šest žica i ružičaste mehanike s obje strane. Na telefonu crtica na sredini znači da je žica naštimana">
    <rect width="320" height="210" rx="20" fill="#fff5fb"/>
    <text x="76" y="18" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-size="13" font-weight="700" fill="#c2185b">glava</text>
    <path d="M44 30h64q14 0 14 14v66q0 14-16 18h-14v62h-32v-62h-14q-16-4-16-18v-66q0-14 14-14z" fill="#f0c878" stroke="#8d6e4a" stroke-width="2"/>
    <rect x="38" y="42" width="26" height="16" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>
    <rect x="38" y="66" width="26" height="16" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>
    <rect x="38" y="90" width="26" height="16" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>
    <rect x="88" y="42" width="26" height="16" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>
    <rect x="88" y="66" width="26" height="16" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>
    <rect x="88" y="90" width="26" height="16" rx="3" fill="#fff5fb" stroke="#8d6e4a" stroke-width="1.5"/>
    <rect x="36" y="46" width="30" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>
    <rect x="36" y="70" width="30" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>
    <rect x="36" y="94" width="30" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>
    <rect x="86" y="46" width="30" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>
    <rect x="86" y="70" width="30" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>
    <rect x="86" y="94" width="30" height="8" rx="4" fill="#e6b85c" stroke="#8d6e4a"/>
    <line x1="26" y1="50" x2="36" y2="50" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>
    <line x1="26" y1="74" x2="36" y2="74" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>
    <line x1="26" y1="98" x2="36" y2="98" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>
    <line x1="116" y1="50" x2="126" y2="50" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>
    <line x1="116" y1="74" x2="126" y2="74" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>
    <line x1="116" y1="98" x2="126" y2="98" stroke="#8d6e4a" stroke-width="3" stroke-linecap="round"/>
    <circle cx="18" cy="50" r="8" fill="#ec407a"/><circle cx="18" cy="74" r="8" fill="#ec407a"/><circle cx="18" cy="98" r="8" fill="#ec407a"/>
    <circle cx="134" cy="50" r="8" fill="#f48fb1"/><circle cx="134" cy="74" r="8" fill="#f48fb1"/><circle cx="134" cy="98" r="8" fill="#f48fb1"/>
    <circle cx="18" cy="50" r="2.5" fill="#fff"/><circle cx="18" cy="74" r="2.5" fill="#fff"/><circle cx="18" cy="98" r="2.5" fill="#fff"/>
    <circle cx="134" cy="50" r="2.5" fill="#fff"/><circle cx="134" cy="74" r="2.5" fill="#fff"/><circle cx="134" cy="98" r="2.5" fill="#fff"/>
    <rect x="58" y="122" width="36" height="7" rx="1.5" fill="#fff8ee" stroke="#c4a574"/>
    <line x1="60" y1="154" x2="92" y2="154" stroke="#c4a06a" stroke-width="2"/>
    <line x1="60" y1="170" x2="92" y2="170" stroke="#c4a06a" stroke-width="2"/>
    <path d="M66 128 L50 98" fill="none" stroke="#7a4e16" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M70 128 L50 74" fill="none" stroke="#7a4e16" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M74 128 L50 50" fill="none" stroke="#a56b28" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M78 128 L102 50" fill="none" stroke="#c48a3a" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M82 128 L102 74" fill="none" stroke="#d7a85a" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M86 128 L102 98" fill="none" stroke="#e6c98a" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="66" y1="129" x2="66" y2="186" stroke="#7a4e16" stroke-width="2.6" stroke-linecap="round"/>
    <line x1="70" y1="129" x2="70" y2="186" stroke="#7a4e16" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="74" y1="129" x2="74" y2="186" stroke="#a56b28" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="78" y1="129" x2="78" y2="186" stroke="#c48a3a" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="82" y1="129" x2="82" y2="186" stroke="#d7a85a" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="86" y1="129" x2="86" y2="186" stroke="#e6c98a" stroke-width="1.3" stroke-linecap="round"/>
    <rect x="168" y="36" width="120" height="140" rx="16" fill="#fff" stroke="#ec407a" stroke-width="3"/>
    <rect x="186" y="54" width="84" height="90" rx="10" fill="#ffe4f0"/>
    <path d="M204 124 A 24 24 0 0 1 252 124" fill="none" stroke="#f8bbd0" stroke-width="8" stroke-linecap="round"/>
    <line x1="228" y1="124" x2="228" y2="92" stroke="#c2185b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="228" cy="124" r="5" fill="#c2185b"/>
    <text x="228" y="162" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-size="14" font-weight="700" fill="#c2185b">sredina</text>
  </svg>`;
  const tuneSection=()=>`<section class="sheet tune-home" id="stimanje"><div class="sheet-label">PRIJE SVIRANJA</div><h2>Štimamo uz odraslu osobu</h2><p class="lede">Na glavi gitare su mehanike — kotačići koji se okreću. Svaka žica ide do svoje. Mama ili tata ih polako okreću. Ti pomažeš jednim nježnim zvukom.</p><div class="tune-layout"><figure class="tune-figure">${tuneFigure()}<figcaption>Ružičaste mehanike se okreću. Crtica na sredini = žica je naštimana.</figcaption></figure><ol class="tune-steps"><li><strong>Pozovi mamu ili tatu.</strong> Oni okreću kotačiće na glavi gitare.</li><li><strong>Ti odsviraj jednu žicu.</strong> Nježno odsviraj žicu koju ti pokažu, pa slušaj.</li><li><strong>Kad je gitara spremna, vrati se na vježbu.</strong> Gumb za povratak je ispod.</li></ol></div>${printQuiet()}<details class="parent-fold"><summary>Za mamu ili tatu · štimer i upute</summary><p class="tune-app"><a class="button" href="https://play.google.com/store/apps/details?id=com.ovelin.guitartuna" target="_blank" rel="noopener noreferrer">Guitar Tuna · Android</a><a class="button secondary" href="https://apps.apple.com/us/app/guitartuna-tune-play-guitar/id527588389" target="_blank" rel="noopener noreferrer">Guitar Tuna · iPhone / iPad</a><a class="button secondary" href="https://www.youtube.com/watch?v=RA3l0QOo4aw" target="_blank" rel="noopener noreferrer">Pogledaj kako se okreću mehanike</a></p><p class="day-parent" role="note">Video je na hrvatskom, prva lekcija škole za početnike. Gledajte dio sa štimerom; štimanje po sluhu preskočite. Smjer okretanja ovisi o gitari — okrenite malo i gledajte ide li crtica prema sredini. Ne okrećite naglo, da žica ne pukne. U Guitar Tuni odaberite gitaru i standardno štimanje. Prva prazna žica: E, druga: B (često H). Mehanike okreće odrasla osoba.</p></details></section>`;
  const card=(c,shownStep)=>{
    const key=`${c.week}-${c.num}`;const n=getStars(key);const stuck=key==='4-3'&&missionDay(4,3)===3?'probaj svaki zvuk zasebno. Onda ih spoji polako: druga žica na 1, pa prazna prva žica.':stuckTips[key];
    const withStars=c.kind!=='review';
    const day=missionDay(c.week,c.num);
    const kid=day?dailyKid[c.week-1][day-1]:null;
    const steps=key==='4-3'&&day===3?bridgeSteps:childSteps[key]||(Array.isArray(c.steps)?c.steps:[]);
    const needsMelody=key==='4-5'&&melodySlots(key).length<4;
    const lastIndex=Math.max(0,steps.length-1);
    const i=Math.min(shownStep??(missionStep[missionStepKey(key)]||0),lastIndex);
    const last=steps.length===0||i>=lastIndex;
    const {picture,sound}=cardParts(c,i);
    const showNav=steps.length>1;
    const prevHtml=showNav?`<button type="button" class="secondary step-prev" data-step-prev="${key}"${i===0?' disabled':''} aria-label="Prethodni korak">Natrag</button>`:'';
    const nextHtml=showNav&&!last?`<button type="button" class="button step-next" data-step-next="${key}" data-step-max="${lastIndex}"${needsMelody?' disabled':''} aria-label="Sljedeći korak">Dalje</button>`:'';
    const reminder=(c.week===3&&[4,6].includes(c.num))||(c.week===4&&c.num!==5&&c.kind!=='review');
    const stepHtml=steps.length?`<p class="step-kicker">Korak ${i+1} od ${steps.length}</p><p class="step-one" tabindex="-1">${fingerPlain(steps[i].replace('misiju','vježbu'))}</p>${c.kind==='review'?reviewPickList(c.week):''}${reminder?partReminder():''}${needsMelody?`<p class="step-guidance" role="status">Izaberi još ${4-melodySlots(key).length} ${4-melodySlots(key).length===1?'zvuk':'zvuka'} ispod upute.</p>`:''}${showNav?`<p class="step-guidance">${last?'Probaj zadatak, pa dodirni Završi.':c.kind==='review'&&i===0?'Izaberi vježbu iznad. Kad je ponoviš, vrati se ovamo.':'Probaj ovaj zadatak, pa nastavi.'}</p>`:''}`:'';
    const controlsHtml=showNav?`<div class="step-actions">${prevHtml}<span class="step-position" aria-hidden="true">${i+1} / ${steps.length}</span>${nextHtml||'<button type="button" class="button step-next" data-step-finish aria-label="Završi vježbu">Završi</button>'}</div>`:'<div class="step-actions"><button type="button" class="button step-next" data-step-finish aria-label="Završi vježbu">Završi</button></div>';
    const open=!!stuckOpen[key];
    const tip=key==='4-3'&&day===3?['Mali prijelaz!','Sviramo samo dva zvuka: kraj A i početak B.']:cardTip(key);
    const zvonkoHtml=`<aside class="card-zvonko" aria-label="${escape(mascotName)}"><img src="assets/dragon-guitar-pixar.jpg" alt="" width="56" height="56"><p><strong>${escape(tip[0])}</strong>${fingerPlain(tip[1])}</p></aside>`;
    const parentHtml=kid?.parent?`<button type="button" class="secondary parent-info-toggle" data-parent-info="${key}" aria-haspopup="dialog" aria-controls="parent-info-dialog">Za mamu ili tatu</button>`:'';
    const stuckHtml=stuck?`<button type="button" class="stuck-toggle secondary" data-stuck-toggle="${key}" aria-expanded="${open?'true':'false'}">Ako zapne</button>`:'';
    const stuckTipHtml=stuck&&open?`<div class="stuck-tip" id="stuck-${key}" role="note"><img src="assets/dragon-guitar-pixar.jpg" alt="" width="48" height="48"><p><strong>${escape(mascotName)}:</strong> ${fingerPlain(stuck)}</p></div>`:'';
    return `<article class="exercise-card${c.kind==='review'?' review-card':''}${c.kind==='posture'?' instruction-card':''}${withStars&&n?' has-stars':''}" id="kartica-${c.week}-${c.num}">
      <div class="card-tag">${c.week}. TJEDAN · ${missionDay(c.week,c.num)?`DAN ${missionDay(c.week,c.num)}`:'DODATNA VJEŽBA'}</div>
      <h3>${escape(key==='4-3'?(day===3?'Mali most: kraj A i početak B':'Sviram A, A, B, B'):cardTitle(c.week,c.num))}</h3>
      ${lessonUsesGuitar(c)?tuneReminder():''}
      <div class="mission-work"><div class="mission-step" aria-live="polite">${stepHtml}</div><div class="mission-picture">${picture}</div><div class="mission-sound">${sound}</div></div><div class="mission-controls">${controlsHtml}</div>
      ${c.kind==='posture'?`<details class="parent-fold posture-reference"><summary>Pogledaj cijeli položaj</summary>${diagram(c.kind,c.data)}</details>`:''}
      ${zvonkoHtml}
      ${kid?.game?`<p class="mission-game">${fingerPlain(kid.game)}</p>`:''}
      ${listenLinks(videosForMission(c.week,c.num))}
      ${parentHtml||stuck?`<div class="mission-help"><div class="mission-help-actions">${parentHtml}${stuckHtml}</div>${stuckTipHtml}</div>`:''}
      ${printQuiet()}
    </article>`;
  };
  const stabiliseLesson=()=>{
    const current=document.querySelector('.exercise-card');if(!current)return;
    const match=/kartica-(\d)-(\d)/.exec(current.id);
    const c=match&&data.cards.find(c=>c.week===Number(match[1])&&c.num===Number(match[2]));if(!c)return;
    const host=document.createElement('div');host.className='lesson-measure';
    host.style.cssText=`position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none;width:${current.getBoundingClientRect().width}px;`;
    host.setAttribute('aria-hidden','true');
    // Measure every step at the card's actual width without changing saved progress.
    let extraHeight=0,pictureHeight=0,textHeight=0;
    const count=(childSteps[`${c.week}-${c.num}`]||c.steps||[]).length;
    for(let i=0;i<count;i++){
      const template=document.createElement('template');template.innerHTML=card(c,i);
      const sample=template.content.firstElementChild;
      sample.removeAttribute('id');sample.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
      Array.from(sample.children).forEach(el=>{if(!el.classList.contains('mission-work'))el.remove();});
      sample.querySelector('.mission-sound')?.remove();
      sample.querySelectorAll('details').forEach(el=>{el.open=!!current.querySelector('.'+el.classList[0])?.open;});
      host.replaceChildren(sample);content.appendChild(host);
      const text=sample.querySelector('.step-one').getBoundingClientRect().height;
      textHeight=Math.max(textHeight,text);
      extraHeight=Math.max(extraHeight,sample.querySelector('.mission-step').getBoundingClientRect().height-text);
      pictureHeight=Math.max(pictureHeight,sample.querySelector('.mission-picture').getBoundingClientRect().height);
    }
    host.remove();
    current.style.setProperty('--lesson-text-height',Math.ceil(textHeight)+'px');
    current.style.setProperty('--lesson-step-height',Math.ceil(textHeight+extraHeight)+'px');
    current.style.setProperty('--lesson-picture-height',Math.ceil(pictureHeight)+'px');
  };
  // Keep playing audio mounted; the first lesson also changes its illustration by step.
  const refreshMission=key=>{
    const [w,n]=key.split('-').map(Number);
    const c=data.cards.find(x=>x.week===w&&x.num===n);
    const current=document.getElementById('kartica-'+key);
    if(!c||!current)return;
    const template=document.createElement('template');template.innerHTML=card(c);
    const next=template.content.firstElementChild;
    const focus=current.contains(document.activeElement)?document.activeElement:null;
    const focusSelector=focus?.matches('.step-next')?'.step-next':focus?.matches('.step-prev')?'.step-prev':null;
    current.querySelectorAll('details[open]').forEach(el=>{const counterpart=next.querySelector('.'+el.classList[0]);if(counterpart)counterpart.open=true;});
    for(const selector of ['.mission-step','.mission-controls','.mission-help']){
      current.querySelector(selector)?.replaceWith(next.querySelector(selector));
    }
    if(key==='1-1')current.querySelector('.mission-picture').replaceWith(next.querySelector('.mission-picture'));
    if(current.querySelector('.melody-builder'))current.querySelector('.melody-builder').replaceWith(next.querySelector('.melody-builder'));
    current.className=next.className;
    const orientation=document.querySelector('.week-orientation');
    if(orientation){
      const compass=document.createElement('template');
      compass.innerHTML=weekOrientation(w,missionDay(w,n),!missionDay(w,n));
      const wasOpen=orientation.querySelector('.lesson-map')?.open;
      const replacement=compass.content.querySelector('.week-orientation');
      if(replacement.querySelector('.lesson-map'))replacement.querySelector('.lesson-map').open=!!wasOpen;
      orientation.replaceWith(replacement);
    }
    updateShortcuts();
    if(focusSelector){const control=current.querySelector(focusSelector);if(control&&!control.disabled)control.focus({preventScroll:true});}
  };
  const revealMissionStep=(selector='.mission-work')=>{
    const work=document.querySelector(selector);if(!work)return;
    const bottom=selector=>{const el=document.querySelector(selector);return el&&getComputedStyle(el).position==='sticky'?el.getBoundingClientRect().bottom:0;};
    const top=Math.max(bottom('.topbar'),bottom('.utility-bar'),bottom('.location-path'))+12;
    window.scrollTo({top:Math.max(0,window.scrollY+work.getBoundingClientRect().top-top),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
    const focus=selector==='.mission-work'?document.querySelector('.step-one'):work.querySelector('button');
    focus?.focus({preventScroll:true});
  };
  const keepMissionStepVisible=()=>{
    const instruction=document.querySelector('.step-one');if(!instruction)return;
    const path=document.querySelector('.location-path');
    const top=path?Math.max(0,path.getBoundingClientRect().bottom)+8:12;
    const controls=document.querySelector('.mission-controls');
    const bottom=controls?.getBoundingClientRect().top||window.innerHeight;
    const rect=instruction.getBoundingClientRect();
    if(rect.top<top||rect.bottom>bottom)revealMissionStep();
  };
  const weekMeter=week=>{
    const got=weekStarTotal(week);const max=weekStarMax(week);const pct=Math.round(got/max*100);
    return `<section class="sheet week-meter" aria-label="Zvjezdice ovog tjedna"><div class="sheet-label">TVOJE ZVJEZDICE</div><div class="week-meter-top"><strong>${got}</strong><span> / ${max} ★ ovaj tjedan</span></div><div class="week-meter-track"><div class="week-meter-fill" style="width:${pct}%"></div></div><p class="storage-note">Zvjezdice pokazuju kako ti ide vježba — nisu ocjene.</p></section>`;
  };
  const badgesPanel=()=>{
    const next=nextBadge();
    return `<section class="sheet badges-panel" id="bedzevi"><div class="sheet-label">MOJI BEDŽEVI</div><h2>Velike nagrade</h2><div class="badge-grid">${badges.map(b=>{const on=badgeOn(b);return `<div class="badge-tile${on?' is-unlocked':''}">${badgeIcon(b.icon)}<strong>${escape(b.title)}</strong><span class="badge-state">${on?'Otključano! <span class="app-ico app-ico-spark app-ico-inline" aria-hidden="true"></span>':escape(badgeNeedText(b))}</span></div>`;}).join('')}</div>${next?`<p class="badge-next">${escape(mascotName)}: Sljedeći bedž je „${escape(next.title)}”. ${escape(badgeNeedText(next))}</p>`:`<p class="badge-next">${escape(mascotName)}: Imaš sve bedževe! Ti si prava gitaristica!</p>`}</section>`;
  };
  const starGallery=()=>`<section class="sheet star-gallery"><div class="sheet-label">SVE MISIJE</div><h2>Gdje su tvoje ★</h2><div class="gallery-weeks">${[1,2,3,4].map(w=>`<div class="gallery-week"><h3>Tjedan ${w}</h3><div class="gallery-missions">${Array.from({length:weekMissionCount(w)},(_,i)=>i+1).map(n=>{const k=`${w}-${n}`;const stars=getStars(k);const c=data.cards.find(x=>x.week===w&&x.num===n);const withStars=!c||c.kind!=='review';return `<a class="gallery-mission${withStars&&stars?' has-stars':''}" href="${missionRoute(w,n)}">${withStars?`<span class="gallery-stars">${[1,2,3].map(i=>`<span class="${i<=stars?'is-on':''}">★</span>`).join('')}</span>`:''}<span class="gallery-title">${escape(c?cardTitle(w,n):k)}</span></a>`;}).join('')}</div><p class="gallery-sum">${weekStarTotal(w)} / ${weekStarMax(w)} ★</p></div>`).join('')}</div></section>`;
  const concertInvite=(id='pozivnica')=>{const g=guitarNameTrim()||'moja gitara';return `<section class="sheet concert-invite" id="${id}"><div class="sheet-label">POZIVNICA</div><h2>Moj mali koncert!</h2><p class="concert-lede">Pozivam te da dođeš slušati kako sviram na gitari <strong>${escape(g)}</strong>!</p><p class="concert-sub">Sviram početak pjesmice <em>Bratec Martin</em>.</p><p class="invite-instruction">Ispiši pozivnicu, pa datum, vrijeme i goste napiši olovkom.</p><div class="concert-dates"><p class="concert-date-row"><span>Datum:</span><span class="concert-blank" aria-hidden="true"></span></p><p class="concert-date-row"><span>Vrijeme:</span><span class="concert-blank" aria-hidden="true"></span></p></div><p class="concert-field">Tko dolazi (mama, tata, baka…)?</p><div class="concert-lines" aria-hidden="true"></div><p class="print-row"><button class="print print-quiet print-invite" type="button">Ispiši pozivnicu</button></p></section>`;};
  const audioNames=['01_cetiri_otkucaja.wav','02_prva_zica_0_1_3_1.wav','03_bratec_martin_dio_A.wav','04_bratec_martin_dio_B.wav','05_bratec_martin_motiv.wav','06_zvuk_tisina.wav','07_most_druga3_prva0.wav','08_druga_zica_1_3_1.wav','09_prva_zica_0_1_0_1.wav','10_prva_zica_0_1_3.wav'];
  const audioTitles=['Četiri ravnomjerna zvuka','Prva žica: 0, 1, 3, 1','Bratec Martin · dio A','Bratec Martin · dio B','Bratec Martin · A-A-B-B','Zvuk · tišina · zvuk · tišina','Most: druga 3 → prva 0','Druga žica: 1, 3, 1','Prva žica: 0, 1, 0, 1','Prva žica: 0, 1, 3'];
  const audioHints=['Dva kratka otkucaja, pa četiri zvuka — tri puta.','Dva otkucaja, pa 0, 1, 3, 1 — tri puta.','Dva otkucaja, pa dio A — tri puta.','Dva otkucaja, pa dio B — tri puta. Zadnji ton traje duže.','Dva otkucaja, pa dijelovi A-A-B-B — tri puta.','Dva otkucaja, pa zvuk, tišina, zvuk, tišina — tri puta. Na tišini zaustavi žicu!','Dva otkucaja, pa druga žica na 3 i prazna prva — tri puta.','Dva otkucaja, pa na drugoj žici 1, 3, 1 — tri puta.','Dva otkucaja, pa na prvoj žici 0, 1, 0, 1 — tri puta.','Dva otkucaja, pa na prvoj žici 0, 1, 3 — tri puta.'];
  const audio=i=>`<article class="sound"><h3>${audioTitles[i]}</h3><p>${audioHints[i]}</p><audio controls preload="none" aria-label="${escape(audioTitles[i])}" src="assets/audio/${audioNames[i]}"></audio></article>`;
  let positionShift=0;
  let reopenParentFold=false;
  let songTempo=60;
  let synth=null;
  let playing=false;
  let playGeneration=0;
  const stopSong=()=>{
    playGeneration++;playing=false;
    if(synth){synth.close().catch(()=>{});synth=null;}
    document.querySelectorAll('.tab-note.active').forEach(n=>n.classList.remove('active'));
    document.querySelectorAll('[data-play-song]').forEach(b=>b.textContent=b.dataset.playLabel||'▶ Slušaj me');
    const stop=document.getElementById('stop-song');if(stop)stop.disabled=true;
  };
  async function playSong(id){
    if(playing&&document.querySelector(`[data-play-song="${id}"]`)?.textContent==='■ Zaustavi'){stopSong();return;}
    stopSong();document.querySelectorAll('audio').forEach(a=>a.pause());
    const song=window.GUITAR_SONGS.find(s=>s.id===id);if(!song)return;
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext)return;
    synth=new AudioContext();const context=synth;await context.resume();
    const generation=playGeneration;playing=true;
    const button=document.querySelector(`[data-play-song="${id}"]`);if(button)button.textContent='■ Zaustavi';

    const shift=song.lesson||song.hidden?0:positionShift;
    const beat=60/Number(document.getElementById('song-tempo')?.value||songTempo);let time=context.currentTime+.1;
    function sound(frequency,start,duration,volume){
      const oscillator=context.createOscillator();const gain=context.createGain();oscillator.type='triangle';oscillator.frequency.value=frequency;
      gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.015);gain.gain.exponentialRampToValueAtTime(.001,start+duration*.9);
      oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+duration);
    }
    for(let i=0;i<2;i++){sound(988,time,.05,.09);time+=beat;}
    const events=[];
    song.rows.forEach((row,r)=>row.forEach((n,i)=>{const frequency=(n[0]===1?329.6275569:246.9416506)*2**((n[1]+shift)/12);sound(frequency,time,n[2]*beat,.14);events.push({start:time,end:time+n[2]*beat,id:`${id}-${r}-${i}`});time+=n[2]*beat;}));
    const finish=time;
    function animate(){
      if(generation!==playGeneration)return;
      const current=events.find(e=>context.currentTime>=e.start&&context.currentTime<e.end);
      document.querySelectorAll('.tab-note.active').forEach(n=>n.classList.remove('active'));
      if(current){
        const note=document.querySelector(`[data-song-note="${current.id}"]`);
        note?.classList.add('active');
        if(note&&animate.last!==current.id&&!document.querySelector('dialog[open]')){
          animate.last=current.id;
          const scroller=note.closest('.compact-tab-scroll');
          const box=note.getBoundingClientRect(),frame=scroller.getBoundingClientRect();
          if(box.left<frame.left+36||box.right>frame.right-36)scroller.scrollTo({left:scroller.scrollLeft+box.left-frame.left-scroller.clientWidth/2+box.width/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
          const topbar=document.querySelector('.topbar').getBoundingClientRect().bottom;
          if(frame.top<topbar||frame.bottom>window.innerHeight)scroller.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
        }
      }
      if(context.currentTime>=finish){stopSong();return;}requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
  const mascotBubble=(title,text)=>`<section class="mascot-panel" aria-label="${escape(mascotName)} daje upute"><div class="mascot-frame"><img src="assets/dragon-guitar-pixar.jpg" width="160" height="160" alt="${escape(mascotName)}, slatki zmaj s malom gitarom"></div><p class="speech-bubble"><strong>${escape(title)}</strong> ${fingerPlain(text)}</p></section>`;
  const mascotFor=key=>{const line=mascotLines[key]||mascotLines.pocetak;return mascotBubble(line[0],line[1]);};
  const cardTitle=(week,num)=>{if(week===4&&num===3)return 'Dijelovi A i B';const c=data.cards.find(x=>x.week===week&&x.num===num);return c?c.title.replace('Sam/a','Sama'):`Vježba ${week}.${num}`};
  const starAcc=n=>{const a=n%10,b=n%100;if(a===1&&b!==11)return 'zvjezdicu';if(a>=2&&a<=4&&(b<12||b>14))return 'zvjezdice';return 'zvjezdica';};
  const badgeNeedText=b=>{
    const titleOf=k=>{const [w,n]=k.split('-').map(Number);return cardTitle(w,n);};
    const joinNames=names=>names.length<=1?names[0]||'':names.length===2?`${names[0]} i ${names[1]}`:`${names.slice(0,-1).join(', ')} i ${names[names.length-1]}`;
    if(b.needAny){
      const names=b.needAny.map(titleOf);
      const list=names.length===2?`${names[0]} ili ${names[1]}`:joinNames(names);
      return `U tjednu ${b.week} stavi barem jednu ★ na ${list}.`;
    }
    const missing=b.need.filter(k=>getStars(k)<1);
    const names=(missing.length?missing:b.need).map(titleOf);
    if(missing.length===1)return `U tjednu ${b.week} još treba barem jedna ★ na vježbi ${names[0]}.`;
    return `U tjednu ${b.week} stavi barem jednu ★ na vježbe ${joinNames(names)}.`;
  };
  const missionLink=(week,num)=>`<a class="mission-link" href="${missionRoute(week,num)}">${escape(cardTitle(week,num))}</a>`;
  const missionLinks=(week,nums)=>nums.map(num=>missionLink(week,num)).join(' · ');
  const listenLinks=list=>{
    if(!list||!list.length) return '';
    return `<div class="listen-links">${list.map(v=>`<a class="button secondary" href="${escape(v.href)}" target="_blank" rel="noopener noreferrer">${escape(v.label)}</a>`).join('')}</div>`;
  };
  const videosForMission=(week,num)=>(dailyKid[week-1]||[]).find(d=>d.videos&&d.missions&&d.missions[0]===num)?.videos||[];
  const focusDay=(week,dayIndex)=>{const hook=data.daily[week-1][dayIndex][0];const kid=dailyKid[week-1][dayIndex];const firstMission=kid.missions[0];return {hook,kid,firstMission};};
  const activeWeek=()=>Math.min(4,Math.max(1,Number(state.activeWeek)||1));
  const backToWeek=n=>`<p class="mission-back"><a class="button secondary" href="#tjedan-${n}">Svi dani ovog tjedna</a></p>`;
  const dayTitle=(w,d)=>w===4&&d===3?'Mali prijelaz A → B':w===4&&d===4?'Sviram A, A, B, B':w===4&&d===5?'Sviramo zajedno':data.daily[w-1][d-1][0];
  const dayRoute=(w,d)=>`#tjedan-${w}/kartica-${w}-${dailyKid[w-1][d-1].missions[0]}/dan-${d}`;
  const missionDay=(w,num)=>{
    const requested=Number((location.hash.split('/')[2]||'').replace('dan-',''));
    if(requested>=1&&requested<=7&&dailyKid[w-1][requested-1].missions[0]===num)return requested;
    const at=dailyKid[w-1].findIndex(d=>d.missions[0]===num);
    return at<0?0:at+1;
  };
  const weekTabs=n=>`<nav class="week-picker" aria-label="Odaberi tjedan">${[1,2,3,4].map(w=>`<a class="week-pick${w===n?' is-active':''}" href="#tjedan-${w}"${w===n?' aria-current="page"':''}>Tjedan ${w}</a>`).join('')}</nav>`;
  const missionRoute=(w,num)=>{
    const saved=state.resumeRoute.split('/');
    if(saved[0]===`tjedan-${w}`&&saved[1]===`kartica-${w}-${num}`)return '#'+state.resumeRoute;
    const selected=Number(state.days[w])||1;
    if(dailyKid[w-1][selected-1]?.missions[0]===num)return dayRoute(w,selected);
    const at=dailyKid[w-1].findIndex(d=>d.missions[0]===num);
    return at>=0?dayRoute(w,at+1):`#tjedan-${w}/kartica-${w}-${num}`;
  };
  const weekOrientation=(n,day=0,extra=false)=>{
    const path=`<nav class="location-path" aria-label="Putanja"><a href="#pocetak">Početak</a><span aria-hidden="true">›</span><a href="#tjedan-${n}">${n}. tjedan</a>${day?`<span aria-hidden="true">›</span><strong>Dan ${day} od 7</strong>`:extra?'<span aria-hidden="true">›</span><strong>Dodatna vježba</strong>':''}</nav>`;
    const timeline=`<nav class="week-timeline" aria-label="Dani ${n}. tjedna">${[1,2,3,4,5,6,7].map(d=>`<a href="${dayRoute(n,d)}"${d===day?' aria-current="step"':''} aria-label="Dan ${d}: ${escape(dayTitle(n,d))}${d===day?', ovdje si':state.dayPractice[`${n}-${d}`]?', probala si ovaj dan':''}"><span>Dan ${d}</span><span class="timeline-status">${d===day?'Ovdje si':state.dayPractice[`${n}-${d}`]?'✓ Probala':'Probaj'}</span></a>`).join('')}</nav><p class="timeline-legend">✓ znači da si probala taj dan. Zadnji dan ponavljamo omiljeno.</p>`;
    const maps=day||extra?`<details class="lesson-map"${matchMedia('(min-width:1000px)').matches?' open':''}><summary>Dani i tjedni · otvori izbor</summary>${weekTabs(n)}${timeline}</details>`:weekTabs(n);
    return path+`<section class="week-orientation" aria-label="Tjedni i dani">${maps}</section>`;
  };
  const nextMission=(week,num)=>{
    const day=missionDay(week,num);
    if(day&&day<7)return {href:dayRoute(week,day+1),label:'Sljedeća vježba',hint:`Dan ${day+1}: ${dayTitle(week,day+1)}`};
    if(!day){const next=data.cards.find(c=>c.week===week&&c.num>num);if(next)return {href:missionRoute(week,next.num),label:'Sljedeća vježba',hint:cardTitle(week,next.num)};}
    if(week<4)return {href:dayRoute(week+1,1),label:'Sljedeća vježba',hint:`${week+1}. tjedan · Dan 1`};
    return {href:'#napredak',label:'Moje zvjezdice',hint:'Završila si sve tjedne!'};
  };
  let completionContext=null;
  const updateCompletion=(badge=null)=>{
    const ctx=completionContext;if(!ctx)return;
    const n=getStars(ctx.key),ready=ctx.review||n>0;
    document.getElementById('completion-body').innerHTML=ctx.review?'<p class="completion-review">Bravo za ponavljanje omiljene vježbe!</p>':starButtons(ctx.key,n);
    document.getElementById('completion-feedback').textContent=badge?`Otključala si bedž „${badge.title}”!`:ctx.review?'Odaberi kamo želiš dalje.':n?`Spremljeno: ${'★'.repeat(n)} ${starLabels[n]}`:'Odaberi zvjezdice pa izaberi kamo dalje.';
    document.getElementById('completion-actions').hidden=!ready;
    document.getElementById('completion-next-hint').textContent=ready?ctx.next.hint:'';
  };
  const openCompletion=()=>{
    const match=/kartica-(\d)-(\d)/.exec(document.querySelector('.exercise-card')?.id||'');if(!match)return;
    const week=Number(match[1]),num=Number(match[2]),c=data.cards.find(c=>c.week===week&&c.num===num);
    const key=`${week}-${num}`,review=c.kind==='review';
    completionContext={key,hash:location.hash,review,next:nextMission(week,num)};
    setShortcutsOpen(false);stopSong();document.querySelectorAll('audio').forEach(a=>a.pause());
    document.getElementById('completion-title').textContent=review?'Vježba je gotova!':'Kako je išlo?';
    document.getElementById('completion-lesson').textContent=document.querySelector('.exercise-card h3').textContent;
    const next=document.getElementById('completion-next');next.href=completionContext.next.href;next.textContent=completionContext.next.label+' →';
    updateCompletion();
    document.getElementById('completion-dialog').showModal();
    (document.querySelector('#completion-dialog .star-choice[aria-pressed=true]')||document.querySelector('#completion-dialog .star-choice'))?.focus({preventScroll:true});
  };
  const todayView=(week,opts={})=>{
    const day=Math.min(7,Math.max(1,Number(state.days[week])||1));
    const {hook,kid,firstMission}=focusDay(week,day-1);
    const mission=firstMission?data.cards.find(c=>c.week===week&&c.num===firstMission):null;
    const picture=mission?cardParts(mission).picture:'';
    const cta=firstMission?`#tjedan-${week}/kartica-${week}-${firstMission}`:`#tjedan-${week}`;
    const parent=kid.parent?`<details class="sheet adult-fold parent-fold" id="za-mamu"><summary>Za mamu ili tatu</summary><div class="adult-fold-body"><p>${fingerPlain(kid.parent)}</p></div></details>`:'';
    const other=opts.home?`<p class="home-other"><a href="#tjedan-${week}">Drugi dan</a></p>`:'';
    return `${opts.back?backToWeek(week):''}<section class="sheet today-focus today-focus-home" id="danas"><div class="sheet-label">DAN ${day} · TJEDAN ${week}</div><h2>${escape(hook)}</h2><p class="lede">${fingerPlain(kid.text)}</p>${picture}${listenLinks(kid.videos)}<div class="today-focus-actions"><a class="button" href="${cta}">Kreni</a></div>${other}${printQuiet()}</section>${parent}`;
  };
  const guitarNameField=()=>`<div class="hero-guitar-field"><label class="form-label" for="guitar-name">Kako se zove tvoja gitara?</label><input type="text" id="guitar-name" data-guitar-name maxlength="24" placeholder="npr. Luna, Zvjezdica…" value="${escape(state.guitarName||'')}"></div>`;
  const guitarRenameCard=()=>`<section class="sheet hero hero-home guitar-rename" id="moja-gitara"><div class="hero-home-text"><div class="sheet-label">TVOJA GITARA</div><h2>Dijelovi i ime</h2><p>Pogledaj dijelove. Ime možeš promijeniti.</p>${guitarNameField()}<button type="button" class="button guitar-ready" id="guitar-name-ready"${guitarNameTrim()?'':' disabled'}>Spremi ime</button></div><figure class="hero-home-figure">${diagram('guitar',null)}</figure></section>`;
  const meetGuitar=()=>`<div class="kid-flow"><section class="sheet hero hero-home" id="moja-gitara"><div class="hero-home-text"><div class="sheet-label">UPOZNAJMO SE</div><h2>Ovo je tvoja gitara.</h2><p>Pogledaj dijelove. Onda joj daj ime.</p>${guitarNameField()}<button type="button" class="button guitar-ready" id="guitar-name-ready"${guitarNameTrim()?'':' disabled'}>To je moja gitara</button><button type="button" class="secondary name-later" data-name-later>Ime ću odabrati poslije</button></div><figure class="hero-home-figure">${diagram('guitar',null)}</figure></section></div>`;
  const tunePage=()=>`<div class="kid-flow">${tuneSection()}<p class="tune-return"><button type="button" class="button" data-screen-back>Gitara je spremna · natrag na vježbu</button></p></div>`;
  const dailyRow=(week,dayIndex)=>{
    const hook=data.daily[week-1][dayIndex][0];
    const kid=dailyKid[week-1][dayIndex];
    const missions=kid.missions.length?`<p class="day-missions">${missionLinks(week,kid.missions)}</p>`:`<p>${escape(data.daily[week-1][dayIndex][1])}</p>`;
    const game=kid.game?`<p class="day-game">${fingerPlain(kid.game)}</p>`:'';
    const parent=kid.parent?`<p class="day-parent"><strong>Za mamu ili tatu:</strong> ${fingerPlain(kid.parent)}</p>`:'';
    const listen=listenLinks(kid.videos);
    return `<div class="day"><strong>Dan ${dayIndex+1}</strong><div><b>${escape(hook)}</b><p>${fingerPlain(kid.text)}</p>${missions}${game}${listen}${parent}</div></div>`;
  };
  function home(){
    const resumed=/^tjedan-([1-4])\/kartica-\d-(\d)/.exec(state.resumeRoute||'');
    const resumeDay=Number((state.resumeRoute.split('/')[2]||'').replace('dan-',''));
    const resume=resumed?`<section class="resume-summary"><p>Zadnja otvorena vježba: <strong>${resumed[1]}. tjedan${resumeDay?` · Dan ${resumeDay}`:''} · ${escape(cardTitle(Number(resumed[1]),Number(resumed[2])))}</strong></p><a class="button secondary" href="#${state.resumeRoute}">Nastavi tu vježbu</a></section>`:'';
    return `<div class="kid-flow course-home">${heading('POČETAK','Moja gitarska pustolovina','Odaberi tjedan, pa dan koji želiš vježbati.')}<nav class="course-weeks" aria-label="Četiri tjedna">${[1,2,3,4].map(w=>`<a href="#tjedan-${w}" class="course-week"><span class="course-week-number">${w}</span><span><strong>${w}. tjedan</strong><span>${escape(titles[w-1])}</span><small>${[1,2,3,4,5,6,7].filter(d=>state.dayPractice[`${w}-${d}`]).length} od 7 dana si probala · zadnji dan ponavljamo</small></span><span aria-hidden="true">›</span></a>`).join('')}</nav>${resume}</div>`;
  }
  const howToReadMap=()=>`<section class="sheet how-to-read" id="kako-citam"><div class="sheet-label">PRIJE MISIJA</div><h2>Kako čitam kartu?</h2><p class="lede">Tri znaka — i možeš svirati!</p><div class="read-map-grid">
    <article class="read-map-card"><div class="rm-visual rm-line" aria-hidden="true"><span class="rm-string rm-s1"></span><span class="rm-string rm-s2"></span><span class="rm-string"></span></div><h3>1. Crta = žica</h3><p>Gornja crta je <strong class="c-s1">1. žica</strong> (ružičasta). Ispod nje <strong class="c-s2">2. žica</strong> (žuta).</p></article>
    <article class="read-map-card"><div class="rm-visual rm-num" aria-hidden="true"><span class="rm-fret">1</span><span class="rm-fret">3</span></div><h3>2. Broj = prag</h3><p>Broj kaže <strong>gdje</strong> staviš prst. 1 = prvi prag, 3 = treći.</p></article>
    <article class="read-map-card"><div class="rm-visual rm-zero" aria-hidden="true"><span class="rm-fret rm-open">0</span></div><h3>3. Nula = prazno</h3><p><strong>0</strong> znači: ne stišći — sviraj praznu žicu.</p></article>
  </div><p class="note">Čitaj slijeva nadesno, kao priču. Ako zapneš, vrati se ovdje!</p>${printQuiet()}</section>`;
  function week(n,anchor=''){
    const cards=data.cards.filter(c=>c.week===n);
    const aud=n===1?[0,5]:n===2?[8,9,1,7]:n===3?[6,2,3]:[4];
    if(anchor==='danas')return `<div class="kid-flow">${weekOrientation(n)}${todayView(n,{back:true})}</div>`;
    const missionMatch=/^kartica-(\d+)-(\d+)$/.exec(anchor||'');
    if(missionMatch&&Number(missionMatch[1])===n){
      const c=cards.find(x=>x.num===Number(missionMatch[2]));
      if(c)return `<div class="kid-flow">${weekOrientation(n,missionDay(n,c.num),!missionDay(n,c.num))}${card(c)}</div>`;
    }
    if(anchor==='kako-citam'&&n>=2)return `<div class="kid-flow">${weekOrientation(n)}${backToWeek(n)}${howToReadMap()}</div>`;
    if(anchor==='poslusaj')return `<div class="kid-flow">${weekOrientation(n)}${backToWeek(n)}${section('Svi zvukovi',`<div class="sounds">${aud.map(audio).join('')}</div><p class="storage-note">Prvo slušaj, pa probaj uz zvuk. Ruke ti pokaže odrasla osoba.</p>`,'poslusaj')}</div>`;
    const today=Math.min(7,Math.max(1,Number(state.days[n])||1));
    const tiles=[0,1,2,3,4,5,6].map(i=>{
      const hook=dayTitle(n,i+1);
      const kid=dailyKid[n-1][i];
      const num=kid.missions[0];
      const href=num?dayRoute(n,i+1):`#tjedan-${n}`;
      const practiced=!!state.dayPractice[`${n}-${i+1}`];
      const found=num?cards.find(x=>x.num===num):null;
      const star=`<span class="day-tile-practice">${practiced?'✓ Probala si':'Probaj'}</span>`;
      return `<a class="day-tile${i+1===today?' is-today':''}" href="${href}" data-pick-day="${n}" data-day="${i+1}"><span class="day-tile-num">Dan ${i+1}</span><span class="day-tile-title">${escape(hook)}${i+1===today&&state.resumeRoute.startsWith(`tjedan-${n}/`)?'<small class="last-day-label">Zadnje otvoren</small>':''}</span>${star}</a>`;
    }).join('');
    const extraCards=cards.filter(c=>!dailyKid[n-1].some(d=>d.missions.includes(c.num)));
    const extra=extraCards.length?`<section class="extra-missions"><h2>Dodatne vježbe</h2>${missionLinks(n,extraCards.map(c=>c.num))}</section>`:'';
    const links=`<nav class="week-links" aria-label="Poveznice tjedna">${n>=2?`<button type="button" class="secondary" data-read-help>Kako čitam kartu</button>`:''}<a href="#tjedan-${n}/poslusaj">Svi zvukovi</a></nav>`;
    return `<div class="kid-flow">${heading('TJEDAN '+n,titles[n-1],'Otvori jedan dan.')}${weekOrientation(n)}${mascotFor('tjedan'+n)}<div class="day-path">${tiles}</div>${extra}${links}${n===4?concertInvite():''}<div class="week-footer"><a class="button secondary" href="#${n===1?'pocetak':'tjedan-'+(n-1)}">${n===1?'Početak':'Prethodni tjedan'}</a><a class="button" href="#${n===4?'napredak':'tjedan-'+(n+1)}">${n===4?'Moje zvjezdice':'Sljedeći tjedan'}</a></div></div>`;
  }
  function progress(){
    const total=totalStars();const maxAll=[1,2,3,4].reduce((a,w)=>a+weekStarMax(w),0);const unlocked=unlockedBadges().length;
    const next=nextBadge();
    const mascotProg=next
      ? [total?`Skupila si ${total} ${starAcc(total)}!`:'Svaki pokušaj vrijedi!',`Sljedeći bedž je „${next.title}”. ${badgeNeedText(next)}`]
      : [`Sjajna si!`,`${total} ★ i sva ${unlocked} bedža. Zvonko je ponosan!`];
    return heading('MOJE ZVJEZDICE','Tvoja galerija sjaja','Odaberi zvjezdice na vježbama — ovdje vidiš sve što si zaradila!')+

      `<section class="sheet star-hero"><div class="star-hero-count" aria-label="Ukupno zvjezdica"><span class="star-hero-num">${total}</span><span class="star-hero-label">zvjezdica</span></div><div class="star-hero-bar"><div class="week-meter-fill" style="width:${Math.round(total/maxAll*100)}%"></div></div><p>${unlocked} od 4 nagrade otključano</p><div id="save-status" class="saved" role="status"></div></section>`+
      mascotBubble(mascotProg[0],mascotProg[1])+
      starHowTo+
      badgesPanel()+
      starGallery()+
      `<p class="guitar-settings"><button type="button" class="secondary" data-guitar-settings>Dijelovi i ime gitare</button></p>`+
      '<details class="sheet parent-fold"><summary>Moja pozivnica za koncert</summary>'+concertInvite('pozivnica-napredak')+'</details>'+
      '<details class="sheet parent-fold"><summary>Moja poruka sebi</summary>'+
      section('Moja poruka sebi',`<p>Napiši nešto lijepo sebi — ostaje ovdje i kad odeš pa se vratiš.</p>${[['samostalno','Ovo znam sama'],['pomoc','Za ovo još trebam pomoć'],['sljedece','Sljedeći mali korak']].map(([k,label])=>`<label class="form-label" for="note-${k}">${label}</label><textarea id="note-${k}" data-note="${k}" placeholder="Napiši nešto lijepo sebi…">${escape(state.notes[k]||'')}</textarea>`).join('')}`)+'</details>';
  }
  function needHelp(){
    return heading('ZVONKO KAŽE','Trebaš pomoć?','Ako nešto zapne, Zvonko zna kome se javiti.')+
      `<section class="mascot-panel" aria-label="${escape(mascotName)} daje upute"><div class="mascot-frame"><img src="assets/dragon-guitar-pixar.jpg" width="160" height="160" alt="${escape(mascotName)}, slatki zmaj s malom gitarom"></div><div class="speech-bubble"><strong>Tu sam, Marija!</strong><p>Pozovi mamu, tatu ili učitelja i pokaži im što ti nije jasno. Zajedno možete pitati Krešu ili Antoniju.</p><ul class="help-reasons"><li>ako ti u lekcijama nešto nije jasno</li><li>ako želiš nove lekcije ili nove pjesmice</li><li>ili te samo zanima neka sitnica</li></ul><p class="help-note">Oni su mi pomogli složiti ove lekcije baš za tebe. Jako će se razveseliti da čuju kako ti ide!</p></div></section>`;
  }
  function help(){return mascotFor('pomoc')+heading('SAVJETI I UPUTE','Sve što pomaže pri vježbanju','Priprema gitare, objašnjenja, plan vježbanja i pomoć kada nešto zapne.')+
    section('Kod kuće','<p>Jednom tjedno imate susret od oko sat vremena. Kod kuće je dovoljno 15–20 minuta. Dan je uspio kad Marija može sama i može ponoviti sutra.</p><p>Od tjedna 2 karta se čita ovako: <a href="#tjedan-2/kako-citam">Kako čitam kartu?</a></p>')+
    section('Plan susreta','<p>Jedan susret traje oko 60 minuta. Otvori tjedan koji vam treba.</p>'+[1,2,3,4].map(n=>{const page=data.pages[n+2];return `<details class="sheet adult-fold parent-fold" id="susret-${n}"><summary><span class="sheet-label">TJEDAN ${n}</span> ${escape(page.title)}</summary><div class="adult-fold-body">${pageBody(n+3)}</div></details>`;}).join(''))+
    section('Prije sviranja',pageBody(2))+
    section('Žica, prag ili prst?',pageBody(3))+
    section('Kad nešto zapne',pageBody(9))+
    section('Android kao pomoćnik',pageBody(10))+
    section('Pouzdani izvori',pageBody(11))+
    section('Ispis','<p><a href="output/pdf/gitarska_pustolovina_prvi_mjesec.pdf">PDF cijelog mjeseca</a> · <a href="output/gitarska_pustolovina.html">Dugi HTML list svih materijala</a></p>');}
  function render(keepPosition=false){
    if(document.getElementById('parent-info-dialog').open)document.getElementById('parent-info-dialog').close();
    if(document.getElementById('completion-dialog').open)document.getElementById('completion-dialog').close();
    stopSong();
    const openDialog=document.getElementById('explain-dialog');if(openDialog.open)openDialog.close();
    const handDialog=document.getElementById('hand-dialog');if(handDialog?.open)handDialog.close();
    const previousScroll=window.scrollY;
    const [requested='pocetak',anchor='']=location.hash.slice(1).split('/');const route=nav.some(n=>n[0]===requested)?requested:'pocetak';
    content.dataset.view=route==='pjesmica'?'songs':'';
    document.getElementById('navigation').innerHTML=nav.map(([id,title,num])=>`<a href="#${id}" aria-label="${title}" title="${title}"${route===id?' aria-current="page"':''}><span class="nav-number" aria-hidden="true">${id==='pocetak'?'⌂':id==='zvuk'?'▶':id==='pomoc'?'ⓘ':num}</span><span class="nav-label">${title}</span></a>`).join('');
    if(route==='pocetak'&&anchor==='stimanje')content.innerHTML=tunePage();
        else if(route==='pocetak')content.innerHTML=home();
    else if(route.startsWith('tjedan-')){
      const w=Number(route.slice(-1));
      if(/^kartica-/.test(anchor)){
        const c=data.cards.find(c=>`kartica-${c.week}-${c.num}`===anchor&&c.week===w);
        if(c){state.activeWeek=w;state.resumeRoute=location.hash.slice(1);const day=missionDay(w,c.num);if(day)state.days[w]=day;save();}
      }
      content.innerHTML=week(w,anchor);
    }
    else if(route==='pjesmica')content.innerHTML=(anchor?'':mascotFor('pjesmica'))+window.GuitarSongUI.render(anchor,positionShift,songTempo);
    else if(route==='zvuk')content.innerHTML=heading('POSLUŠAJ I SVIRAJ','Moji zvučni prijatelji','Deset kratkih primjera. Najprije uši, pa prsti!')+mascotFor('zvuk')+section('Od otkucaja do pjesmice',`<div class="sounds">${audioNames.map((_,i)=>audio(i)).join('')}</div><div class="note">Svaki zvuk počinje s dva kratka otkucaja. Onda čuješ važni dio tri puta. Pokušaj na gitari uz pomoć odrasle osobe.</div>`);
    else if(route==='napredak')content.innerHTML=progress();
    else if(route==='trebas-pomoc')content.innerHTML=needHelp();
    else content.innerHTML=help();
    const contextBanner=supportBanner();if(contextBanner)content.insertAdjacentHTML('afterbegin',contextBanner);
    document.title=(route==='pjesmica'?window.GUITAR_SONGS.find(s=>s.id===anchor)?.title||'Pjesmice':nav.find(n=>n[0]===route)[1])+' · Gitarska pustolovina';
    setNavOpen(false);
    setShortcutsOpen(false);
    if(reopenParentFold){
      const fold=document.querySelector('.parent-fold');
      if(fold)fold.open=true;
      reopenParentFold=false;
    }
    if(keepPosition===true)window.scrollTo({top:previousScroll,behavior:'instant'});else window.scrollTo({top:0,behavior:'instant'});
    document.querySelectorAll('audio').forEach(a=>a.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{if(other!==a)other.pause()})));
    window.GuitarRhythmFollow.bind(content);
    updateShortcuts();
    updateHomeNavigation();
    stabiliseLesson();
    updateChrome();
  }
  const desktopNav=matchMedia('(min-width:1000px)');
  let sidebarHidden=false;
  try{sidebarHidden=localStorage.getItem('mare-sidebar-hidden')==='true';}catch{}
  document.body.classList.toggle('sidebar-hidden',sidebarHidden);

  const setNavOpen=open=>{
    const desktop=desktopNav.matches;
    open=!!open&&!desktop;
    if(open)setShortcutsOpen(false);
    document.body.classList.toggle('nav-open',!!open);
    const toggle=document.getElementById('nav-toggle');
    const backdrop=document.getElementById('nav-backdrop');
    if(toggle){const expanded=desktop?!sidebarHidden:open;const label=desktop?(sidebarHidden?'Prikaži izbornik':'Sakrij izbornik'):(open?'Zatvori izbornik':'Otvori izbornik');toggle.setAttribute('aria-expanded',expanded?'true':'false');toggle.setAttribute('aria-label',label);toggle.title=label;}
    const close=document.getElementById('nav-close');
    close.setAttribute('aria-label',desktop?'Sakrij izbornik':'Zatvori izbornik');
    close.title=desktop?'Sakrij izbornik':'Zatvori izbornik';
    if(backdrop)backdrop.hidden=!open;
    document.getElementById('app-sidebar').inert=!(desktop&&!sidebarHidden||open);
    if(open)document.getElementById('nav-close').focus({preventScroll:true});
  };
  const setShortcutsOpen=(open,restoreFocus=false)=>{
    const panel=document.getElementById('header-shortcuts-panel');
    const toggle=document.getElementById('shortcuts-toggle');
    panel.hidden=!open;
    toggle.setAttribute('aria-expanded',open?'true':'false');
    toggle.setAttribute('aria-label',open?'Zatvori prečace':'Otvori prečace');
    if(restoreFocus)toggle.focus({preventScroll:true});
  };
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const weekdayHr=['nedjelja','ponedjeljak','utorak','srijeda','četvrtak','petak','subota'][new Date().getDay()];
  const dailyHello=()=>{
    const w=activeWeek();
    const day=Math.min(7,Math.max(1,Number(state.days[w])||1));
    const kid=(typeof dailyKid!=='undefined'&&dailyKid[w-1])?dailyKid[w-1][day-1]:null;
    const missionBit=kid&&kid.text?kid.text:kidGoals[w-1];
    const pool=[
      [`Bok, Marija!`,`Danas je ${weekdayHr}. Skupa učimo — ja sam uz tebe. Danas: ${missionBit}`],
      [`Hej, Marija!`,`Ja sam ${mascotName}. Veselim se tvojim zvukovima! Danas u tjednu ${w}: ${missionBit}`],
      [`Marija, gitaristica!`,`Jedan mali korak danas je dovoljan — i ti to možeš. ${missionBit}`],
      [`Drago mi je opet, Marija!`,`Polako i veselo. Lijep zvuk i tvoj osmijeh — to je pobjeda. Danas: ${missionBit}`]
    ];
    return pool[day%pool.length];
  };
  const showZvonkoWelcome=(mode='daily')=>{
    const el=document.getElementById('zvonko-welcome');if(!el)return;
    const card=el.querySelector('.zvonko-welcome-card');
    const title=document.getElementById('zvonko-welcome-title');
    const text=document.getElementById('zvonko-welcome-text');
    const eye=document.getElementById('zvonko-welcome-eye');
    const go=document.getElementById('zvonko-welcome-go');
    card?.classList.remove('is-highfive');
    if(mode==='intro'){
      eye.textContent='UPOZNAJMO SE';
      title.textContent=`Bok, Marija! Ja sam ${mascotName}`;
      text.textContent='Tvoj glazbeni zmaj. Pratit ću te kroz tvoje prve lekcije sviranja gitare — skupa ćemo učiti, polako i veselo. Najdraži su mi lijep zvuk i tvoj osmijeh.';
      go.textContent='Daj pet!';
    }else{
      const [t,msg]=dailyHello();
      eye.textContent='ZVONKO KAŽE';
      title.textContent=t;
      text.textContent=msg;
      go.textContent='Krenimo!';
    }
    el.hidden=false;
    document.body.classList.add('zvonko-welcome-open');
    go.focus();
  };
  const hideZvonkoWelcome=()=>{
    const el=document.getElementById('zvonko-welcome');if(!el)return;
    el.hidden=true;
    document.body.classList.remove('zvonko-welcome-open');
    el.querySelector('.zvonko-welcome-card')?.classList.remove('is-highfive');
  };
  const badgeCheers={
    zice:['Lovac na žice!','Pronašla si žice i odsvirala četiri zvuka. Tako mi je drago!'],
    prsti:['Čarobni prsti!','Prsti su našli kućice. Slušaj kako lijepo zvoni!'],
    pjesmica:['Pjevačica!','Bratec Martin živi u tebi. Pjevaj, ja slušam!'],
    koncert:['Mali koncert!','Cijela pustolovina zvoni. Ti si prava gitaristica!']
  };
  const showBadgeCheer=b=>{
    const el=document.getElementById('zvonko-badge');if(!el)return;
    const pair=badgeCheers[b.id]||[b.title,`Otključala si bedž „${b.title}”.`];
    const title=document.getElementById('zvonko-badge-title');
    const text=document.getElementById('zvonko-badge-text');
    if(title)title.textContent=pair[0];
    if(text)text.textContent=pair[1];
    el.querySelector('.zvonko-welcome-card')?.classList.remove('is-highfive');
    el.hidden=false;
    document.body.classList.add('zvonko-welcome-open');
    document.getElementById('zvonko-badge-go')?.focus();
  };
  const hideBadgeCheer=()=>{
    const el=document.getElementById('zvonko-badge');if(!el)return;
    el.hidden=true;
    el.querySelector('.zvonko-welcome-card')?.classList.remove('is-highfive');
    if(document.getElementById('zvonko-welcome')?.hidden!==false)document.body.classList.remove('zvonko-welcome-open');
  };
  const maybeGreetZvonko=()=>{
    if(!state.metZvonko){showZvonkoWelcome('intro');return;}
    if(state.zvonkoDay!==today())showZvonkoWelcome('daily');
  };
  const fingerNames={palac:'palac',kaziprst:'kažiprst',srednji:'srednji prst',prstenjak:'prstenjak',mali:'mali prst'};
  const openHand=which=>{
    const dlg=document.getElementById('hand-dialog');if(!dlg)return;
    dlg.querySelectorAll('[data-finger-part]').forEach(el=>el.classList.toggle('is-on',!!which&&el.dataset.fingerPart===which));
    const note=document.getElementById('hand-note');
    if(note)note.textContent=which&&fingerNames[which]?`Označeno je: ${fingerNames[which]}.`:'Svaki prst ima svoje ime. Usporedi s lijevom rukom.';
    if(!dlg.open)dlg.showModal();
  };
  document.addEventListener('click',e=>{
    if(e.target.closest('#shortcuts-toggle')){setShortcutsOpen(document.getElementById('header-shortcuts-panel').hidden);return;}
    if(e.target.closest('#shortcuts-close')){setShortcutsOpen(false,true);return;}
    if(e.target.closest('#header-shortcuts-panel a,#header-shortcuts-panel button'))setShortcutsOpen(false);
    const readButton=e.target.closest('[data-read-help]');
    if(readButton){window.GuitarSongUI.showHelp(howToReadMap().replace('<h2>','<h2 id="explain-title">'),readButton.closest('#header-shortcuts-panel')?document.getElementById('shortcuts-toggle'):readButton);return;}
    const mapButton=e.target.closest('[data-open-map]');
    if(mapButton){const map=document.querySelector('.lesson-map');if(map){map.open=true;map.querySelector('summary').scrollIntoView({block:'nearest'});map.querySelector('summary').focus({preventScroll:true});}return;}
    const homeLink=e.target.closest('a[href="#pocetak"]');
    if(homeLink&&location.hash==='#pocetak'){e.preventDefault();window.scrollTo({top:0,behavior:'instant'});return;}
    const back=e.target.closest('[data-screen-back]');
    if(back){if(screenHistory.index>0)history.back();else location.hash=state.resumeRoute||'pocetak';return;}
    if(e.target.closest('[data-screen-forward]')){if(screenHistory.index<screenHistory.entries.length-1)history.forward();return;}
    if(e.target.closest('[data-guitar-settings]')){openGuitarName();return;}
    if(e.target.closest('[data-name-later]')){state.guitarNamed=true;save();render();return;}
    const fingerBtn=e.target.closest('.finger-word');
    if(fingerBtn){openHand(fingerBtn.dataset.finger||'');return;}
    if(e.target.closest('#hand-close,#hand-done')||e.target.id==='hand-dialog'){document.getElementById('hand-dialog')?.close();return;}
    if(e.target.closest('#zvonko-badge-go')){
      document.querySelector('#zvonko-badge .zvonko-welcome-card')?.classList.add('is-highfive');
      setTimeout(hideBadgeCheer,720);
      return;
    }
    if(e.target.closest('#zvonko-welcome-go')){
      const card=document.querySelector('.zvonko-welcome-card');
      card?.classList.add('is-highfive');
      if(!state.metZvonko)state.metZvonko=true;
      state.zvonkoDay=today();
      save();
      setTimeout(()=>{
        hideZvonkoWelcome();
        if(!location.hash||location.hash==='#')location.hash='pocetak';
        if(!state.guitarNamed)document.getElementById('guitar-name')?.focus();
      },720);
      return;
    }
    if(e.target.closest('#topbar-greeting')){openGuitarName();return;}
    if(e.target.closest('#guitar-name-save')){saveGuitarName();return;}
    if(e.target.closest('#guitar-name-close')){document.getElementById('guitar-name-dialog')?.close();return;}
    if(e.target.closest('#nav-toggle')){
      if(desktopNav.matches){
        sidebarHidden=!sidebarHidden;
        document.body.classList.toggle('sidebar-hidden',sidebarHidden);
        try{localStorage.setItem('mare-sidebar-hidden',String(sidebarHidden));}catch{}
        setNavOpen(false);updateChrome();stabiliseLesson();
      }else setNavOpen(!document.body.classList.contains('nav-open'));
      return;
    }
    if(e.target.closest('#nav-close')||e.target.closest('#nav-backdrop')){
      if(desktopNav.matches){
        sidebarHidden=true;document.body.classList.add('sidebar-hidden');
        try{localStorage.setItem('mare-sidebar-hidden','true');}catch{}
        updateChrome();stabiliseLesson();
      }
      setNavOpen(false);document.getElementById('nav-toggle').focus({preventScroll:true});return;
    }
    if(e.target.closest('#navigation a')||e.target.closest('.brand'))setNavOpen(false);
    const invitePrint=e.target.closest('.print-invite');
    if(invitePrint){
      const invite=invitePrint.closest('.concert-invite');
      if(invite){
        document.querySelectorAll('.concert-invite').forEach(el=>el.removeAttribute('data-print-focus'));
        invite.setAttribute('data-print-focus','');
        document.body.classList.add('print-concert-only');
        window.print();
        return;
      }
    }
    if(e.target.closest('.print'))window.print();
    const parentInfo=e.target.closest('[data-parent-info]');
    if(parentInfo){
      const [w,n]=parentInfo.dataset.parentInfo.split('-').map(Number);
      const day=missionDay(w,n),kid=day?dailyKid[w-1][day-1]:null;
      if(!kid?.parent)return;
      document.getElementById('parent-info-lesson').textContent=parentInfo.closest('.exercise-card').querySelector('h3').textContent;
      document.getElementById('parent-info-body').innerHTML=`<p>${fingerPlain(kid.parent)}</p>`;
      parentInfoOrigin={hash:location.hash,key:parentInfo.dataset.parentInfo};
      document.getElementById('parent-info-dialog').showModal();
      return;
    }
    if(e.target.closest('#parent-info-close,#parent-info-done')){document.getElementById('parent-info-dialog').close();return;}
    if(e.target.closest('[data-step-finish]')){openCompletion();return;}
    if(e.target.closest('#completion-close,#completion-stay,#completion-next')){
      if(completionContext?.review&&e.target.closest('#completion-stay,#completion-next')){
        const [w,n]=completionContext.key.split('-').map(Number),day=missionDay(w,n);
        if(day){state.dayPractice[`${w}-${day}`]=true;save();refreshMission(completionContext.key);}
      }
      document.getElementById('completion-dialog').close();return;
    }
    const stepPrev=e.target.closest('[data-step-prev]');
    if(stepPrev&&!stepPrev.disabled){
      const key=stepPrev.dataset.stepPrev;
      missionStep[missionStepKey(key)]=Math.max(0,(missionStep[missionStepKey(key)]||0)-1);
      save();refreshMission(key);
      keepMissionStepVisible();
      return;
    }
    const stepNext=e.target.closest('[data-step-next]');
    if(stepNext&&!stepNext.disabled){
      const key=stepNext.dataset.stepNext;
      const max=Number(stepNext.dataset.stepMax);
      const next=Math.min(max,(missionStep[missionStepKey(key)]||0)+1);
      missionStep[missionStepKey(key)]=next;
      save();refreshMission(key);
      keepMissionStepVisible();

      return;
    }
    const stuckBtn=e.target.closest('[data-stuck-toggle]');
    if(stuckBtn){
      const key=stuckBtn.dataset.stuckToggle;
      stuckOpen[key]=!stuckOpen[key];
      refreshMission(key);
      document.querySelector('.stuck-toggle')?.focus({preventScroll:true});
      return;
    }
    const starBtn=e.target.closest('[data-mission-star]');
    if(starBtn){
      const key=starBtn.dataset.missionStar;const next=Number(starBtn.dataset.stars);const prev=getStars(key);
      const beforeBadges=new Set(unlockedBadges().map(b=>b.id));
      if(next===0)delete state.missionStars[key];else state.missionStars[key]=next;
      const w=Number(key.split('-')[0]),num=Number(key.split('-')[1]),day=missionDay(w,num);if(next>0&&day)state.dayPractice[`${w}-${day}`]=true;
      save();
      const after=unlockedBadges().find(b=>!beforeBadges.has(b.id));
      if(starBtn.closest('#completion-dialog')){
        refreshMission(key);updateCompletion(after);
        (document.querySelector(`#completion-dialog [data-stars="${next}"]`)||document.querySelector('#completion-dialog .star-choice'))?.focus({preventScroll:true});return;
      }
      if(after)showBadgeCheer(after);
      else if(next>prev)celebrate(next===3?'Znaš napamet!':next===2?'Dvije zvjezdice!':'Zvjezdica!',next===3?'Cijela vježba bez pomoći i uputa — bravo!':next===2?'Sama si — super!':'Probala si — Zvonko je sretan!','star');
      else if(next===0)celebrate('U redu!','Možeš opet zaraditi ★ kad budeš spremna.','soft');
      refreshMission(key);document.querySelector(`[data-mission-star="${key}"][data-stars="${next}"]`)?.focus({preventScroll:true});return;
    }
    const nameReady=e.target.closest('#guitar-name-ready');
    if(nameReady){
      if(!guitarNameTrim())return;
      const stay=state.guitarNamed;
      state.guitarNamed=true;
      save();
      render(stay);
      return;
    }
    const pickDay=e.target.closest('[data-pick-day]');
    if(pickDay){
      const w=Number(pickDay.dataset.pickDay);
      state.days[w]=Number(pickDay.dataset.day);
      state.activeWeek=w;
      save();
    }
    const weekBtn=e.target.closest('.week-pick');
    if(weekBtn){
      const w=Number(weekBtn.dataset.homeWeek);
      save();
      const next='tjedan-'+w;
      if(location.hash!=='#'+next)location.hash=next;
      else render(true);
      return;
    }
    const dayBtn=e.target.closest('.day-pick');
    if(dayBtn){
      const w=dayBtn.dataset.weekDay,d=dayBtn.dataset.day;
      state.days[w]=Number(d);
      save();
      reopenParentFold=true;
      render(true);
      return;
    }
    const melPick=e.target.closest('[data-melody-pick]');
    if(melPick){
      const mk=melPick.dataset.melodyMission;const id=melPick.dataset.melodyPick;
      let slots=melodySlots(mk);
      if(slots.length>=4)return;
      if(slots.length<4){slots.push(id);state.melodyPicks[mk]=slots;save();refreshMission(mk);}
      return;
    }
    const melUndo=e.target.closest('[data-melody-undo]');
    if(melUndo){const mk=melUndo.dataset.melodyUndo;state.melodyPicks[mk]=melodySlots(mk).slice(0,-1);save();refreshMission(mk);return;}
    const melReset=e.target.closest('[data-melody-reset]');
    if(melReset){const mk=melReset.dataset.melodyReset;delete state.melodyPicks[mk];save();refreshMission(mk);return;}
    const explain=e.target.closest('[data-explain]');if(explain){window.GuitarSongUI.explain(explain);return;}
    const b=e.target.closest('[data-play-song]');if(b)playSong(b.dataset.playSong);if(e.target.closest('#stop-song'))stopSong();
  });
  const openGuitarName=()=>{
    const dlg=document.getElementById('guitar-name-dialog');
    const input=document.getElementById('guitar-name-edit');
    const parts=document.getElementById('guitar-name-parts');
    if(!dlg||!input)return;
    if(parts)parts.innerHTML=diagram('guitar',null);
    input.value=guitarNameTrim();
    if(!dlg.open)dlg.showModal();
    input.focus();
  };
  const saveGuitarName=()=>{
    const input=document.getElementById('guitar-name-edit');
    const name=(input?.value||'').trim();
    if(!name){input?.focus();return;}
    state.guitarName=name;
    state.guitarNamed=true;
    save();
    document.getElementById('guitar-name-dialog')?.close();
    render(true);
  };
  content.addEventListener('input',e=>{
    if(e.target.dataset.guitarName!==undefined){
      state.guitarName=e.target.value;
      save();
      updateChrome();
      const ready=document.getElementById('guitar-name-ready');
      if(ready)ready.disabled=!guitarNameTrim();
      return;
    }
    const k=e.target.dataset.note;
    if(k){state.notes[k]=e.target.value;save();}
  });
  content.addEventListener('change',e=>{
    if(e.target.id==='song-position'){positionShift=Number(e.target.value);render(true);const options=document.querySelector('.song-options');if(options)options.open=true;document.getElementById('song-position')?.focus({preventScroll:true});return;}
    if(e.target.id==='song-tempo'){songTempo=Number(e.target.value);stopSong();return;}
  });
  window.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&e.target.id==='guitar-name-edit'){e.preventDefault();saveGuitarName();return;}
    if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.guitarName!==undefined){e.preventDefault();document.getElementById('guitar-name-ready')?.click();return;}
    if(e.key==='Escape'){
      if(!document.getElementById('zvonko-welcome')?.hidden){hideZvonkoWelcome();}
      else if(!document.getElementById('header-shortcuts-panel').hidden)setShortcutsOpen(false,true);
      else if(document.body.classList.contains('nav-open')){setNavOpen(false);document.getElementById('nav-toggle').focus({preventScroll:true});}
    }
    if(e.key==='Tab'&&document.body.classList.contains('nav-open')){
      const controls=Array.from(document.querySelectorAll('#app-sidebar a,#app-sidebar button'));
      const first=controls[0],last=controls.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  document.addEventListener('pointerdown',e=>{
    if(!e.target.closest('.header-tools'))setShortcutsOpen(false);
  },{passive:true});
  document.addEventListener('focusin',e=>{
    if(!e.target.closest('.header-tools'))setShortcutsOpen(false);
  });
  let parentInfoOrigin=null;
  const parentInfoDialog=document.getElementById('parent-info-dialog');
  parentInfoDialog.addEventListener('close',()=>{
    if(parentInfoOrigin?.hash===location.hash)document.querySelector(`[data-parent-info="${parentInfoOrigin.key}"]`)?.focus({preventScroll:true});
    parentInfoOrigin=null;
  });
  parentInfoDialog.addEventListener('click',e=>{
    if(e.target!==e.currentTarget)return;
    const r=e.currentTarget.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();
  });
  document.getElementById('completion-dialog').addEventListener('close',()=>{
    if(completionContext?.hash===location.hash)document.querySelector('[data-step-finish]')?.focus({preventScroll:true});
    completionContext=null;
  });
  document.getElementById('completion-dialog').addEventListener('click',e=>{
    if(e.target!==e.currentTarget)return;
    const r=e.currentTarget.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();
  });
  window.addEventListener('afterprint',()=>{
    document.body.classList.remove('print-concert-only');
    document.querySelectorAll('.concert-invite[data-print-focus]').forEach(el=>el.removeAttribute('data-print-focus'));
  });
  let supportReturn=null,pendingReturnScroll=null;
  try{const stored=JSON.parse(sessionStorage.getItem('mare-support-return')||'null');if(/^#tjedan-[1-4]\/kartica-[1-4]-[1-7](\/dan-[1-7])?$/.test(stored?.origin||''))supportReturn=stored;}catch{}
  const storeSupport=()=>{try{if(supportReturn)sessionStorage.setItem('mare-support-return',JSON.stringify(supportReturn));else sessionStorage.removeItem('mare-support-return');}catch{}};
  const supportBanner=()=>supportReturn&&location.hash!==supportReturn.origin&&(/^#pjesmica|^#zvuk|\/poslusaj$/.test(location.hash)||supportReturn.review&&document.querySelector('.exercise-card'))?`<p class="context-return"><a class="button secondary" data-context-return href="${escape(supportReturn.origin)}">← Vrati se na ${supportReturn.review?'ponavljanje':'moju vježbu'}</a></p>`:'';
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href^="#"]');if(!link)return;
    if(link.hasAttribute('data-context-return')){pendingReturnScroll=supportReturn?.scroll||0;supportReturn=null;storeSupport();return;}
    const href=link.getAttribute('href');
    if(document.querySelector('.exercise-card')&&(/^#pjesmica|^#zvuk|\/poslusaj$/.test(href)||link.classList.contains('review-pick'))){supportReturn={origin:location.hash,scroll:window.scrollY,review:link.classList.contains('review-pick')};storeSupport();}
    else if(link.closest('.week-picker,.week-timeline,.day-path,.mission-back,.course-weeks')||href==='#pocetak'){supportReturn=null;storeSupport();}
  },{capture:true});
  const historyKey='mare-screen-history';
  let screenHistory={entries:[],index:0,sequence:0};
  const routeHash=()=>location.hash||'#pocetak';
  try{
    const stored=JSON.parse(sessionStorage.getItem(historyKey)||'null');
    if(stored&&Array.isArray(stored.entries)&&stored.entries[stored.index]?.id===history.state?.mareScreen&&stored.entries[stored.index]?.hash===routeHash())screenHistory=stored;
  }catch{}
  const storeScreenHistory=()=>{try{sessionStorage.setItem(historyKey,JSON.stringify(screenHistory));}catch{}};
  if(!screenHistory.entries.length){
    screenHistory.entries=[{id:++screenHistory.sequence,hash:routeHash(),scroll:0}];
    history.replaceState({...history.state,mareScreen:screenHistory.sequence},'',location.href.split('#')[0]+routeHash());
  }
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  const updateHomeNavigation=()=>{
    const el=document.getElementById('screen-navigation');
    el.innerHTML=`<a class="home-shortcut" href="#pocetak" aria-label="Početak · svi tjedni"><span aria-hidden="true">⌂</span><span>Početak</span></a>`;
  };
  const shortcutIcon=kind=>kind==='guitar'?'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M29 5h7v9h-3l-7 13c7 8 2 17-7 16C9 42 5 35 10 28c2-3 6-2 8-6l9-13z" fill="currentColor"/><circle cx="20" cy="31" r="4" fill="white"/><path d="m20 29 12-20" stroke="white" stroke-width="2"/></svg>':`<span aria-hidden="true">${{days:'▦',song:'♪',stars:'★',hand:'☝',help:'?'}[kind]||'♪'}</span>`;
  const updateShortcuts=()=>{
    const [route,anchor='']=location.hash.slice(1).split('/');
    const w=route?.startsWith('tjedan-')?Number(route.slice(-1)):activeWeek();
    const links=[['#pocetak/stimanje','guitar','Štimanje']];
    if(route==='pjesmica'&&anchor)links.push(['','help','Kako čitam','read']);
    if(route?.startsWith('tjedan-')){
      links.push([`#tjedan-${w}`,'days','Svi dani',/^kartica-/.test(anchor)?'map':'']);
      if(w>=2)links.push(['','help','Kako čitam','read']);
      const cardKey=anchor.replace('kartica-','');
      if(stuckTips[cardKey])links.push(['','help','Ako zapne',cardKey]);
    }
    document.getElementById('page-shortcuts').innerHTML=links.map(([href,icon,label,key])=>key?`<button type="button" class="round-shortcut" ${key==='read'?'data-read-help':key==='map'?'data-open-map':`data-shortcut-help="${key}"`} aria-label="${label}">${shortcutIcon(icon)}<span class="shortcut-label">${label}</span></button>`:`<a class="round-shortcut${location.hash===href?' is-current':''}" href="${href}" aria-label="${label}"${location.hash===href?' aria-current="page"':''}>${shortcutIcon(icon)}<span class="shortcut-label">${label}</span></a>`).join('');
  };
  document.addEventListener('click',e=>{
    const shortcut=e.target.closest('[data-shortcut-help]');
    if(shortcut){const key=shortcut.dataset.shortcutHelp;stuckOpen[key]=true;refreshMission(key);document.querySelector('.stuck-toggle')?.scrollIntoView({block:'center'});document.querySelector('.stuck-toggle')?.focus({preventScroll:true});}
  });
  let scrollSave;
  let restoringScreen=false;
  const rememberScreenPosition=()=>{
    const entry=screenHistory.entries[screenHistory.index];
    if(!restoringScreen&&entry?.hash===routeHash()){entry.scroll=window.scrollY;storeScreenHistory();}
  };
  document.addEventListener('pointerdown',rememberScreenPosition,{capture:true,passive:true});
  window.addEventListener('scroll',()=>{
    const entry=screenHistory.entries[screenHistory.index];
    if(!restoringScreen&&entry?.hash===routeHash()){entry.scroll=window.scrollY;clearTimeout(scrollSave);scrollSave=setTimeout(storeScreenHistory,120);}
  },{passive:true});
  window.addEventListener('hashchange',()=>{
    const id=history.state?.mareScreen;
    const index=screenHistory.entries.findIndex(e=>e.id===id&&e.hash===routeHash());
    if(index>=0){screenHistory.index=index;}
    else{
      screenHistory.entries=screenHistory.entries.slice(0,screenHistory.index+1);
      screenHistory.entries.push({id:++screenHistory.sequence,hash:routeHash(),scroll:0});
      screenHistory.index=screenHistory.entries.length-1;
      history.replaceState({...history.state,mareScreen:screenHistory.sequence},'',location.href.split('#')[0]+routeHash());
    }
    const scroll=pendingReturnScroll??screenHistory.entries[screenHistory.index].scroll;pendingReturnScroll=null;screenHistory.entries[screenHistory.index].scroll=scroll;
    restoringScreen=true;storeScreenHistory();render();
    window.scrollTo({top:scroll,behavior:'instant'});
    requestAnimationFrame(()=>{
      window.scrollTo({top:scroll,behavior:'instant'});
      requestAnimationFrame(()=>{restoringScreen=false;rememberScreenPosition();});
    });
  });
  desktopNav.addEventListener('change',()=>{
    const sidebarFocus=document.getElementById('app-sidebar').contains(document.activeElement);
    setNavOpen(false);
    if(sidebarFocus&&!desktopNav.matches)document.getElementById('nav-toggle').focus({preventScroll:true});
    updateChrome();stabiliseLesson();
  });
  window.addEventListener('orientationchange',()=>{setNavOpen(false);setShortcutsOpen(false);},{passive:true});
  window.addEventListener('resize',()=>{updateChrome();stabiliseLesson();},{passive:true});
  window.visualViewport?.addEventListener('resize',()=>{
    if(document.body.classList.contains('nav-open')&&window.visualViewport&&window.visualViewport.width>1280)setNavOpen(false);
  });
  const initialScroll=screenHistory.entries[screenHistory.index].scroll;
  restoringScreen=true;
  render();
  storeScreenHistory();
  requestAnimationFrame(()=>{window.scrollTo({top:initialScroll,behavior:'instant'});requestAnimationFrame(()=>{restoringScreen=false;rememberScreenPosition();});});
  setTimeout(maybeGreetZvonko,350);
})();
