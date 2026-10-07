(() => {
  'use strict';
  const data=window.GUITAR_DATA;
  const content=document.getElementById('content');
  const titles=['Upoznajem gitaru','Prsti stvaraju zvukove','Moja prva pjesmica','Moj mali koncert'];
  const goals=['Pronađi dvije žice, odsviraj četiri ravnomjerna zvuka i zaustavi ih.','Pročitaj 0, 1 i 3 te odsviraj kratak niz po poljima.','Odsviraj dio A i dio B pjesmice, svaki zasebno.','Poveži A-A-B-B i ponovi samostalno drugi dan.'];
  const kidGoals=['Pronađi dvije žice i odsviraj četiri lijepa zvuka!','Nauči brojeve 0, 1 i 3 — to su tvoja mjesta na vratu!','Odsviraj dio A i dio B — tvoje prve dijelove pjesmice!','Spoji sve u mali koncert i pokaži ga drugi dan!'];
  const nav=[['pocetak','Početak','·'],...titles.map((t,i)=>['tjedan-'+(i+1),(i+1)+'. tjedan','★'+(i+1)]),['pjesmica','Pjesmice','♪'],['zvuk','Poslušaj','♪'],['napredak','Moje zvjezdice','★'],['pomoc','Za odrasle','?']];
  const mascotName='Zvonko';
  const mascotLines={pocetak:[`Bok, Marija! Ja sam ${mascotName}, tvoj glazbeni zmaj.`,'Skupa učimo — danas polako istraži gitaru. Lijep zvuk je važniji od brzine!'],tjedan1:['Tjedan 1 — upoznaj gitaru!','Dotakni žice nježno. Četiri ravna zvuka su tvoja prva super pobjeda!'],tjedan2:['Tjedan 2 — prsti na mapi!','Brojevi na kartici pokazuju gdje staviš prst. Polako, pa se sve zapamti.'],tjedan3:['Tjedan 3 — pjesmica!','Danas učiš mali dio melodije. Jedan dio odjednom — to je dovoljno i super je!'],tjedan4:['Tjedan 4 — tvoj koncert!','Spoji dijelove koje znaš. Ako nešto zapne, ponovi — ja uvijek ponovim dok ne zazvoni lijepo.'],zvuk:['Vrijeme za uši!','Klikni play i slušaj. Možeš pljeskati prstima uz zvuk prije nego sviraš na gitari.'],pjesmica:['Odaberi pjesmicu!','Klikni onu koja ti se sviđa. Ne znaš što znači broj? Dodirni ga — objasnit ću ti!'],pjesmicaPjevanje:['Sviraj ovaj dio!','Red po red, polako. Dodirni broj ili slog kad trebaš pomoć — tu sam!'],napredak:['Tvoje zvjezdice!','Ovdje bilježimo što si vježbala. Nisu ocjene — samo tvoji mali uspjesi. Svaka ★ se računa!'],pomoc:['Ovo je za odraslu osobu','Dok Marija vježba, tip „Za mama/tata” na Danas i Ako zapne na karticama pomažu. Ti nastavi svirati!']};
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key=(kind,values)=>kind+'|'+JSON.stringify(values);
  const diagram=(kind,values)=>{
    const drawing=data.figures[key(kind,values)]||'';
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
      return `<div class="learning-illustration ${kind}-illustration">${picture}<ol class="picture-legend">${labels.map(([title,desc],i)=>`<li><span class="picture-number">${i+1}</span><div><strong>${title}</strong><p>${desc}</p></div></li>`).join('')}</ol>${stringLegend}${caption?`<p class="picture-caption">${caption}</p>`:''}</div>`;
    }
    if(!art)return '';
    return `<div class="card-figure">${art}${stringLegend}${caption?`<p class="card-figure-caption">${caption}</p>`:''}</div>`;
  };
  const storageKey='gitarska-pustolovina-v1';
  let state={skills:{},notes:{},days:{},missionStars:{},melodyPicks:{},activeWeek:1,guitarName:'',metZvonko:false,zvonkoDay:''};
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
      state.activeWeek=Math.min(4,Math.max(1,Number(s.activeWeek)||1));
      state.guitarName=typeof s.guitarName==='string'?s.guitarName:'';
      state.metZvonko=!!s.metZvonko;
      state.zvonkoDay=typeof s.zvonkoDay==='string'?s.zvonkoDay:'';
      state.melodyPicks=s.melodyPicks&&typeof s.melodyPicks==='object'?s.melodyPicks:{};
    }
  }catch{storageAvailable=false}
  const MELODY_CHOICES=[
    {id:'1-0',s:1,f:0,label:'1 prazna'},
    {id:'1-1',s:1,f:1,label:'1 · prag 1'},
    {id:'1-3',s:1,f:3,label:'1 · prag 3'},
    {id:'2-1',s:2,f:1,label:'2 · prag 1'},
    {id:'2-3',s:2,f:3,label:'2 · prag 3'}
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
    const picks=MELODY_CHOICES.map(ch=>`<button type="button" class="melody-choice" data-melody-pick="${escape(ch.id)}" data-melody-mission="${escape(missionKey)}">${escape(ch.label)}</button>`).join('');
    const spots=slots.map(id=>{const ch=melodyChoice(id);return ch?{string:ch.s,fret:ch.f,text:ch.f===0?'0':String(ch.f)}:null;}).filter(Boolean);
    const preview=spots.length?teachFig(figNeck({aria:'Tvoja četiri zvuka na vratu',strings:[1,2],spots}),spots.length===4?'Sviraj redom s lijeva nadesno.':''):'';
    const reset=slots.length?`<button type="button" class="melody-reset secondary" data-melody-reset="${escape(missionKey)}">Počni ispočetka</button>`:'';
    return `<div class="melody-builder"><p class="melody-builder-lede">Dodirni zvukove <strong>redom</strong> — četiri mjesta = tvoja melodija.</p><div class="melody-slots" role="list">${slotHtml}</div><div class="melody-choices" role="group" aria-label="Poznata mjesta">${picks}</div>${reset}${preview}</div>`;
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
  const updateChrome=()=>{const el=document.getElementById('topbar-greeting');if(!el)return;const name=guitarNameTrim();el.textContent=name?`${name} · Marijina gitara`:'Marijina gitara';};
  const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(state));storageAvailable=true}catch{storageAvailable=false}const status=document.getElementById('save-status');if(status)status.textContent=storageAvailable?'':'Zvjezdice se nisu mogle spremiti.';};
  const section=(title,body,id='',label='')=>`<section class="sheet"${id?` id="${id}"`:''}>${label?`<div class="sheet-label">${escape(label)}</div>`:''}<h2>${escape(title)}</h2>${body}</section>`;
  const heading=(label,title,desc)=>`<div class="page-heading"><div><div class="eyebrow">${escape(label)}</div><h1>${escape(title)}</h1><p class="lede">${escape(desc)}</p></div><button class="print secondary" type="button">Ispiši listić</button></div>`;
  const block=b=>{
    if(b[0]==='p')return `<p>${b[1]}</p>`;
    if(b[0]==='h')return `<h3>${escape(b[1])}</h3>`;
    if(b[0]==='note')return `<div class="note">${b[1]}</div>`;
    if(b[0]==='fig')return `<figure>${diagram(b[1],b[2])}</figure>`;
    if(b[0]==='table')return `<div class="tablewrap"><table><thead><tr>${b[1].map(v=>`<th>${escape(v).replace(/\n/g,'<br>')}</th>`).join('')}</tr></thead><tbody>${b[2].map(row=>`<tr>${row.map(v=>`<td>${escape(v).replace(/\n/g,'<br>')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    return '';
  };
  const pageBody=n=>data.pages[n-1].blocks.map(block).join('');
  const missionTips={
    '1-1':['Sjedi udobno!','Ramena dolje, stopala na podu — onda gitara zvuči sretno.'],
    '1-2':['Četiri koraka!','Pljesni 1-2-3-4, pa isto na žici. Kao hodanje!'],
    '1-3':['Zvuk… tišina!','Kao semafor: zvuk = zeleno, tišina = crveno.'],
    '1-4':['Lov na žice!','Najtanja je prva. Susjedna je druga. Pronađi ih kao detektiv!'],
    '1-5':['Pjevaj Brateca!','Najprije usta i pljesak. Gitara može pričekati.'],
    '1-6':['Tvoj nastup!','Danas sviraš sama. Mama i tata samo slušaju, pa plješću na kraju.'],
    '1-7':['Još jednom!','Izaberi omiljenu igru i ponovi je. To je tvoja pobjeda.'],
    '2-1':['Kućica prsta!','Kažiprst blizu metalne prečke. Ne stišći prejako.'],
    '2-2':['Korak pa žica!','Pljesni ravno — na svaki korak jedan zvuk na praznoj prvoj žici.'],
    '2-3':['Tri kućice!','0, 1, 3, 1 — polako. Zvuk ne smije zujati.'],
    '2-4':['Karta za prste!','Krugovi pokazuju red: 0, pa 1, pa 3. Prvo uši, pa prsti.'],
    '2-5':['Nova staza!','Ista igra na drugoj žici. Prsti već znaju put.'],
    '2-6':['Tvoj nastup!','Danas sviraš sama. Mama i tata samo slušaju, pa plješću na kraju.'],
    '2-7':['Još jednom!','Izaberi omiljenu igru i ponovi je. To je tvoja pobjeda.'],
    '3-1':['Ramena miruju!','Prije zvuka: opusti se. Lijepo sjedenje = lijep zvuk.'],
    '3-2':['Dio B!','Na prvoj žici: 0, 1, 3. Zadnji ton drži — to je dio B pjesmice.'],
    '3-3':['Mali most!','S jedne žice na drugu — kao skok preko potoka.'],
    '3-4':['Tražim A i B!','Otvori Pjesmice (♪) ili list s papira — tamo vidiš crte za A i B.'],
    '3-5':['Dio A!','Pjevuši, pa sviraj. Bratec Martin počinje ovdje.'],
    '3-6':['Koncert!','Prvo A, pa B — sama. Mama i tata slušaju i plješću na kraju.'],
    '3-7':['Još jednom!','Izaberi omiljenu misiju i ponovi je. To je tvoja pobjeda.'],
    '4-7':['Još jednom!','Izaberi omiljenu misiju i ponovi je. To je tvoja pobjeda.'],
    '4-1':['Priprema!','Mama/tata ugodi gitaru. Ti sjedni udobno i pripremi list.'],
    '4-2':['Dva puta A!','Sviraj A, pa odmah opet A — bez stajanja.'],
    '4-3':['A-A-B-B!','Cijeli motiv: A, A, B, B. Polako i ponosno.'],
    '4-4':['Zajedno!','Mama ili tata tapka. Ti sviraš A-A-B-B uz taj puls.'],
    '4-5':['Tvoja melodija!','Četiri zvuka koje TI biraš. Ti si skladateljica!'],
    '4-6':['Koncert!','Odloži telefon. Samo ti, gitara i pljesak na kraju.']
  };
  /* Kratki savjeti na težim misijama — ako zapne / zuji / boli. */
  const stuckTips={
    '1-3':'lagano položi prst na žicu da prestane zvoniti. Ako i dalje zvoni, pričekaj.',
    '1-4':'najtanja je bliže podu. Dodirni samo jednu i slušaj koja je viša.',
    '2-1':'prst malo bliže metalnoj prečci, stisni blaže, odmori šaku.',
    '2-3':'opusti šaku i sviraj samo 0 pa 1. Treći prag dodaj kad bude čisto.',
    '2-5':'vrati se na prvu žicu (0-1-3-1), pa opet na drugu.',
    '3-2':'broji naglas 1-2-3-4 i na 4. samo drži — ne trzaj.',
    '3-3':'sviraj svaku žicu zasebno, pa spoji most.',
    '3-4':'otvori Pjesmice (♪) ili tiskani list. Prstom povuci isti red — A dva puta, B dva puta.',
    '3-5':'najprije samo pjevaj dio A, pa jedan ton odjednom.',
    '4-2':'sviraj jedan A, predahni, pa drugi — kasnije spoji.',
    '4-3':'samo A-A, pa samo B-B. Cijeli motiv kad bude lagano.',
    '4-6':'jedan dio, stani, onda drugi — to je OK!'
  };
  const starLabels=['','Probala sam','Sama!','Sutra opet!'];
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
  const starHowTo=`<aside class="star-howto" aria-label="Kako dobivaš zvjezdice"><p class="star-howto-title"><span class="app-ico app-ico-star" aria-hidden="true"></span> Kako dobivaš zvjezdice?</p><ol class="star-howto-steps"><li><strong>Sviraj</strong> tri koraka na misiji.</li><li>Na dnu kartice klikni <strong>jedan</strong> gumb — ti biraš (mama/tata mogu pomoći).</li><li><strong>★</strong> Probala sam · <strong>★★</strong> Sama! · <strong>★★★</strong> Sutra opet!</li></ol><p class="star-howto-note">Zvjezdice nisu ocjene — samo bilježe što si danas vježbala. Ako nisi sigurna, kreni s jednom ★.</p></aside>`;
  const starButtons=(key,n)=>`<div class="star-picker" role="group" aria-label="Zvjezdice za misiju">
      <p class="star-picker-label">Završila si? Odaberi zvjezdice:</p>
      <div class="star-choice-row">${[
        [1,'★','Probala sam','Danas sam vježbala.'],
        [2,'★★','Sama!','Uspjelo bez pomoći.'],
        [3,'★★★','Sutra opet!','Znala sam i drugi dan.']
      ].map(([i,stars,label,desc])=>`<button type="button" class="star-choice${n===i?' is-on':''}" data-mission-star="${key}" data-stars="${i}" aria-pressed="${n===i}"><span class="star-choice-stars" aria-hidden="true">${stars}</span><span class="star-choice-label">${label}</span><span class="star-choice-desc">${desc}</span></button>`).join('')}</div>
      ${n?`<button type="button" class="star-clear secondary" data-mission-star="${key}" data-stars="0">Makni zvjezdice</button>`:''}
    </div>`;
  const cardTip=key=>{const tip=missionTips[key]||['Hajde!','Tri mala koraka. Polako — ja navijam!'];return tip;};
  /* Audio usklađen s misijom (ritam + tab gdje postoji snimka). */
  const cardAudioIndex=c=>{
    if(c.kind==='rhythm'){
      if(c.week===1&&c.num===3)return 5; /* zvuk–tišina */
      if(c.week===1&&c.num===5)return 2; /* Bratec A */
      if(c.week===2&&c.num===2)return 8; /* prva žica 0-1-0-1 */
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
      :'Prvo čuješ uvodne otkucaje — onda sviraj / plješći uz njih.'));
    const label=opts.label||'▶ Poslušaj pa ponovi';
    const noteHtml=note?`<p class="card-audio-note">${note}</p>`:'';
    return `<div class="card-audio"><p class="card-audio-label">${label}</p><audio controls preload="none" aria-label="${escape(audioTitles[ai])}" src="assets/audio/${audioNames[ai]}"></audio>${noteHtml}</div>`;
  };
  const cardAudioBlocks=(ais,extraNote='')=>ais.map((ai,i)=>cardAudioBlock(ai,null,{omitNote:true,label:i===0?'▶ Dio A':'▶ Dio B'})).join('')+(extraNote?`<p class="card-audio-note card-audio-note-dual">${extraNote}</p>`:'');
  /* Jednostavni crteži ugrađeni u HTML — rade i bez učitavanja datoteke. */
    const figStrings=`<svg class="teach-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 687 311" role="img" aria-label="Cijela gitara vodoravno: prva i druga &#382;ica"><rect width="687" height="311" rx="20" fill="#fff5fb"/><polygon points="115.0,170 115.0,126 334.0,126 334.0,170" fill="#654839"/><line x1="149.0" y1="170" x2="149.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="169.0" y1="170" x2="169.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="188.0" y1="170" x2="188.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="206.0" y1="170" x2="206.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="223.0" y1="170" x2="223.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="239.0" y1="170" x2="239.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="254.0" y1="170" x2="254.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="268.0" y1="170" x2="268.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="281.0" y1="170" x2="281.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="293.0" y1="170" x2="293.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="304.0" y1="170" x2="304.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="315.0" y1="170" x2="315.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="325.0" y1="170" x2="325.0" y2="126" stroke="#c4a484" stroke-width="2"/><path d="M123.0 170.0 L51.0 175.0 Q38.0 175.0 36.0 165.0 L36.0 131.0 Q38.0 121.0 51.0 121.0 L123.0 126.0 Z" fill="#c9a06a" stroke="#8d6e4a" stroke-width="2.5" stroke-linejoin="round"/><polygon points="51.0,167 51.0,158 106.0,158 106.0,167" fill="#342a23"/><polygon points="51.0,138 51.0,129 106.0,129 106.0,138" fill="#342a23"/><line x1="58.0" y1="179" x2="58.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="179" x2="79.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="179" x2="100.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="58.0" y1="132" x2="58.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="132" x2="79.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="132" x2="100.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><polygon points="122.0,171 122.0,125 128.0,125 128.0,171" fill="#f8efe1"/><path d="M296.0 172.0 C281.0 196.0 293.0 234.0 319.0 242.0 C340.0 250.0 361.0 241.0 377.0 225.0 C394.0 210.0 408.0 213.0 429.0 232.0 C469.0 263.0 514.0 260.0 539.0 235.0 C567.0 208.0 567.0 88.0 539.0 61.0 C514.0 36.0 469.0 33.0 429.0 64.0 C408.0 83.0 394.0 86.0 377.0 71.0 C361.0 55.0 340.0 46.0 319.0 54.0 C293.0 62.0 281.0 100.0 296.0 124.0 Z" fill="#f0c878" stroke="#8d6e4a" stroke-width="3" stroke-linejoin="round"/><path d="M302.0 171.0 C288.0 199.0 300.0 227.0 322.0 235.0 C342.0 242.0 362.0 232.0 377.0 218.0 C398.0 201.0 411.0 205.0 434.0 225.0 C471.0 254.0 511.0 251.0 534.0 228.0 C559.0 203.0 559.0 93.0 534.0 68.0 C511.0 45.0 471.0 42.0 434.0 71.0 C411.0 91.0 398.0 95.0 377.0 78.0 C362.0 64.0 342.0 54.0 322.0 61.0 C300.0 69.0 288.0 97.0 302.0 125.0" fill="none" stroke="#d7b57a" stroke-width="1.5"/><circle cx="386.0" cy="148" r="32" fill="none" stroke="#956a3f" stroke-width="7"/><circle cx="386.0" cy="148" r="24" fill="#342b23"/><polygon points="481.0,190 481.0,106 497.0,106 497.0,190" fill="#63452e"/><polygon points="485.0,172 485.0,124 490.0,124 490.0,172" fill="#f3e6cf"/><line x1="64.0" y1="165" x2="488.0" y2="165" stroke="#ec407a" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="158" x2="488.0" y2="158" stroke="#ff9800" stroke-width="5" stroke-linecap="round"/><line x1="64.0" y1="151" x2="488.0" y2="151" stroke="#bdbdbd" stroke-width="3.5" stroke-linecap="round"/><line x1="64.0" y1="144" x2="488.0" y2="144" stroke="#bdbdbd" stroke-width="4" stroke-linecap="round"/><line x1="64.0" y1="137" x2="488.0" y2="137" stroke="#c8c8c8" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="130" x2="488.0" y2="130" stroke="#d0d0d0" stroke-width="5.2" stroke-linecap="round"/><line x1="484.0" y1="158" x2="597.0" y2="129" stroke="#ff9800" stroke-width="3" stroke-linecap="round"/><circle cx="619.0" cy="129" r="20" fill="#ff9800"/><text x="619.0" y="136" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">2</text><line x1="484.0" y1="165" x2="597.0" y2="193" stroke="#ec407a" stroke-width="3" stroke-linecap="round"/><circle cx="619.0" cy="193" r="20" fill="#ec407a"/><text x="619.0" y="200" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">1</text><polygon points="619.0,237 611.0,225 627.0,225" fill="#c2185b"/><text x="619.0" y="255" text-anchor="middle" fill="#c2185b" font-size="16" font-family="Arial,sans-serif" font-weight="bold">pod</text></svg>`;
  const figRhythm=`<svg class="teach-svg" viewBox="0 0 520 170" role="img" aria-label="Četiri koraka u ritmu"><rect width="520" height="170" rx="20" fill="#fff5fb"/><circle cx="70" cy="75" r="36" fill="#ec407a"/><text x="70" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="70" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="190" cy="75" r="36" fill="#ec407a"/><text x="190" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="190" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="310" cy="75" r="36" fill="#ec407a"/><text x="310" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="310" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="430" cy="75" r="36" fill="#ec407a"/><text x="430" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="430" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text></svg>`;
  const figShow=`<svg class="teach-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 687 510" role="img" aria-label="Prva žica na gitari, pa četiri zvuka"><rect width="687" height="510" rx="20" fill="#fff5fb"/><polygon points="115.0,170 115.0,126 334.0,126 334.0,170" fill="#654839"/><line x1="149.0" y1="170" x2="149.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="169.0" y1="170" x2="169.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="188.0" y1="170" x2="188.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="206.0" y1="170" x2="206.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="223.0" y1="170" x2="223.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="239.0" y1="170" x2="239.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="254.0" y1="170" x2="254.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="268.0" y1="170" x2="268.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="281.0" y1="170" x2="281.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="293.0" y1="170" x2="293.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="304.0" y1="170" x2="304.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="315.0" y1="170" x2="315.0" y2="126" stroke="#c4a484" stroke-width="2"/><line x1="325.0" y1="170" x2="325.0" y2="126" stroke="#c4a484" stroke-width="2"/><path d="M123.0 170.0 L51.0 175.0 Q38.0 175.0 36.0 165.0 L36.0 131.0 Q38.0 121.0 51.0 121.0 L123.0 126.0 Z" fill="#c9a06a" stroke="#8d6e4a" stroke-width="2.5" stroke-linejoin="round"/><polygon points="51.0,167 51.0,158 106.0,158 106.0,167" fill="#342a23"/><polygon points="51.0,138 51.0,129 106.0,129 106.0,138" fill="#342a23"/><line x1="58.0" y1="179" x2="58.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="179" x2="79.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="179" x2="100.0" y2="164" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="183" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="58.0" y1="132" x2="58.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="58.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="79.0" y1="132" x2="79.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="79.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><line x1="100.0" y1="132" x2="100.0" y2="117" stroke="#848681" stroke-width="4" stroke-linecap="round"/><circle cx="100.0" cy="113" r="6" fill="#e8e8e4" stroke="#727a75" stroke-width="1.4"/><polygon points="122.0,171 122.0,125 128.0,125 128.0,171" fill="#f8efe1"/><path d="M296.0 172.0 C281.0 196.0 293.0 234.0 319.0 242.0 C340.0 250.0 361.0 241.0 377.0 225.0 C394.0 210.0 408.0 213.0 429.0 232.0 C469.0 263.0 514.0 260.0 539.0 235.0 C567.0 208.0 567.0 88.0 539.0 61.0 C514.0 36.0 469.0 33.0 429.0 64.0 C408.0 83.0 394.0 86.0 377.0 71.0 C361.0 55.0 340.0 46.0 319.0 54.0 C293.0 62.0 281.0 100.0 296.0 124.0 Z" fill="#f0c878" stroke="#8d6e4a" stroke-width="3" stroke-linejoin="round"/><path d="M302.0 171.0 C288.0 199.0 300.0 227.0 322.0 235.0 C342.0 242.0 362.0 232.0 377.0 218.0 C398.0 201.0 411.0 205.0 434.0 225.0 C471.0 254.0 511.0 251.0 534.0 228.0 C559.0 203.0 559.0 93.0 534.0 68.0 C511.0 45.0 471.0 42.0 434.0 71.0 C411.0 91.0 398.0 95.0 377.0 78.0 C362.0 64.0 342.0 54.0 322.0 61.0 C300.0 69.0 288.0 97.0 302.0 125.0" fill="none" stroke="#d7b57a" stroke-width="1.5"/><circle cx="386.0" cy="148" r="32" fill="none" stroke="#956a3f" stroke-width="7"/><circle cx="386.0" cy="148" r="24" fill="#342b23"/><polygon points="481.0,190 481.0,106 497.0,106 497.0,190" fill="#63452e"/><polygon points="485.0,172 485.0,124 490.0,124 490.0,172" fill="#f3e6cf"/><line x1="64.0" y1="165" x2="488.0" y2="165" stroke="#ec407a" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="158" x2="488.0" y2="158" stroke="#bdbdbd" stroke-width="4" stroke-linecap="round"/><line x1="64.0" y1="151" x2="488.0" y2="151" stroke="#bdbdbd" stroke-width="3.5" stroke-linecap="round"/><line x1="64.0" y1="144" x2="488.0" y2="144" stroke="#bdbdbd" stroke-width="4" stroke-linecap="round"/><line x1="64.0" y1="137" x2="488.0" y2="137" stroke="#c8c8c8" stroke-width="4.5" stroke-linecap="round"/><line x1="64.0" y1="130" x2="488.0" y2="130" stroke="#d0d0d0" stroke-width="5.2" stroke-linecap="round"/><line x1="484.0" y1="165" x2="597.0" y2="193" stroke="#ec407a" stroke-width="3" stroke-linecap="round"/><circle cx="619.0" cy="193" r="20" fill="#ec407a"/><text x="619.0" y="200" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial,sans-serif" font-weight="bold">1</text><polygon points="619.0,237 611.0,225 627.0,225" fill="#c2185b"/><text x="619.0" y="255" text-anchor="middle" fill="#c2185b" font-size="16" font-family="Arial,sans-serif" font-weight="bold">pod</text><circle cx="152" cy="388" r="50" fill="#ec407a"/><text x="152" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="152" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="280" cy="388" r="50" fill="#ec407a"/><text x="280" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="280" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="408" cy="388" r="50" fill="#ec407a"/><text x="408" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="408" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="536" cy="388" r="50" fill="#ec407a"/><text x="536" y="400" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial,sans-serif">♪</text><text x="536" y="468" text-anchor="middle" fill="#c2185b" font-size="18" font-family="Arial,sans-serif" font-weight="bold">zvuk</text></svg>`;
  const figSilence=`<svg class="teach-svg" viewBox="0 0 520 170" role="img" aria-label="Zvuk pa tišina"><rect width="520" height="170" rx="20" fill="#fff5fb"/><circle cx="70" cy="75" r="36" fill="#ec407a"/><text x="70" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="70" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="190" cy="75" r="36" fill="none" stroke="#bdbdbd" stroke-width="4" stroke-dasharray="7 5"/><text x="190" y="82" text-anchor="middle" fill="#9e9e9e" font-size="26" font-family="Arial,sans-serif" font-weight="bold">×</text><text x="190" y="140" text-anchor="middle" fill="#757575" font-size="15" font-family="Arial,sans-serif" font-weight="bold">tišina</text><circle cx="310" cy="75" r="36" fill="#ec407a"/><text x="310" y="82" text-anchor="middle" fill="#fff" font-size="24" font-family="Arial,sans-serif">♪</text><text x="310" y="140" text-anchor="middle" fill="#c2185b" font-size="15" font-family="Arial,sans-serif" font-weight="bold">zvuk</text><circle cx="430" cy="75" r="36" fill="none" stroke="#bdbdbd" stroke-width="4" stroke-dasharray="7 5"/><text x="430" y="82" text-anchor="middle" fill="#9e9e9e" font-size="26" font-family="Arial,sans-serif" font-weight="bold">×</text><text x="430" y="140" text-anchor="middle" fill="#757575" font-size="15" font-family="Arial,sans-serif" font-weight="bold">tišina</text></svg>`;
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
    const hX=x=>neckL+(x-123);
    const hY=y=>neckTop+(y-126)*((neckBot-neckTop)/44);
    const r1=v=>Math.round(v);
    const headL=r1(hX(36));
    const headD='M'+r1(hX(123))+' '+r1(hY(170))+' L'+r1(hX(51))+' '+r1(hY(175))+' Q'+r1(hX(38))+' '+r1(hY(175))+' '+r1(hX(36))+' '+r1(hY(165))+' L'+r1(hX(36))+' '+r1(hY(131))+' Q'+r1(hX(38))+' '+r1(hY(121))+' '+r1(hX(51))+' '+r1(hY(121))+' L'+r1(hX(123))+' '+r1(hY(126))+' Z';
    parts.push('<path d="'+headD+'" fill="#8d6e4a" opacity="0.22" transform="translate(3 4)"/>');
    parts.push('<path d="'+headD+'" fill="#c9a06a" stroke="#8d6e4a" stroke-width="2.5" stroke-linejoin="round"/>');
    const slot=(x1,y1,x2,y2)=>parts.push('<polygon points="'+r1(hX(x1))+','+r1(hY(y1))+' '+r1(hX(x1))+','+r1(hY(y2))+' '+r1(hX(x2))+','+r1(hY(y2))+' '+r1(hX(x2))+','+r1(hY(y1))+'" fill="#342a23"/>');
    slot(51,167,106,158);
    slot(51,138,106,129);
    const peg=(xs,y1,y2,ky)=>{
      const x=r1(hX(xs));
      parts.push('<line x1="'+x+'" y1="'+r1(hY(y1))+'" x2="'+x+'" y2="'+r1(hY(y2))+'" stroke="#848681" stroke-width="8" stroke-linecap="round"/>');
      parts.push('<circle cx="'+x+'" cy="'+r1(hY(ky))+'" r="9" fill="#e8e8e4" stroke="#727a75" stroke-width="1.8"/>');
    };
    [58,79,100].forEach(xs=>peg(xs,132,117,113));
    [58,79,100].forEach(xs=>peg(xs,179,164,183));
    parts.push('<rect x="'+neckL+'" y="'+neckTop+'" width="'+(neckR-neckL)+'" height="'+(neckBot-neckTop)+'" fill="#654839"/>');
    frets.forEach((x,i)=>{
      const on=hot(i+1);
      parts.push('<line x1="'+x+'" y1="'+neckTop+'" x2="'+x+'" y2="'+neckBot+'" stroke="'+(on?'#3e2723':'#c4a484')+'" stroke-width="'+(on?7:3)+'"/>');
    });
    const colOf=n=>n===1?'#ec407a':n===2?'#ff9800':'#d0d0d0';
    const wOf=n=>highlight.includes(n)?7:n<=2?4:3;
    [6,5,4,3,2,1].forEach(n=>{
      const y=sy[n];
      parts.push('<line x1="'+headL+'" y1="'+y+'" x2="'+(neckR-6)+'" y2="'+y+'" stroke="'+colOf(n)+'" stroke-width="'+wOf(n)+'" stroke-linecap="round"/>');
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
        const label=step.label||(hold?'drži':open?'prazno':step.f===1?'prst':step.f===3?'prstenjak':'');
        const numText=hold?'3':String(step.f);
        parts.push('<circle cx="'+x+'" cy="304" r="26" '+(open?'fill="#fff5fb" stroke="#c2185b" stroke-width="4"':hold?'fill="#fff3e0" stroke="#ff9800" stroke-width="4"':'fill="#ec407a"')+'/>');
        parts.push('<text x="'+x+'" y="312" text-anchor="middle" fill="'+(open||hold?'#c2185b':'#fff')+'" font-size="'+(hold?18:20)+'" font-family="Arial,sans-serif" font-weight="bold">'+numText+'</text>');
        const sub=step.s?(step.s+'. žica · '):'';
        parts.push('<text x="'+x+'" y="350" text-anchor="middle" fill="#c2185b" font-size="13" font-family="Arial,sans-serif" font-weight="bold">'+sub+label+'</text>');
      });
    }else if(seq){
      const words={0:'prazno',1:'prst',3:'prstenjak'};
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
  const teachFig=(svg,caption)=>`<div class="teach-hero">${svg}${caption?`<p class="card-figure-caption">${caption}</p>`:''}</div>`;
  const missionHero=c=>{
    const k=`${c.week}-${c.num}`;
    /* Sjedenje: originalni crtež s legendom (bez AI slike). */
    if(k==='1-1'||k==='4-1')return '';
    if(k==='1-2')return teachFig(figRhythm,'');
    if(k==='1-6')return teachFig(figShow,'<span class="c-s1">1</span> = najtanja, najbliža podu');
    if(k==='1-3')return teachFig(figSilence,'');
    if(k==='1-4')return teachFig(figStrings,'<span class="c-s1">1</span> = najtanja, najbliža podu · <span class="c-s2">2</span> = odmah iznad');
    if(k==='2-1')return teachFig(figNeck({aria:'Kažiprst na prvoj žici, tik uz prvu prečku',string:1,spots:[{fret:1,text:'prst',mark:'prečka'}]}),'<span class="c-s1">1</span> = najtanja, najbliža podu. Prst tik uz prvu prečku.');
    if(k==='2-2')return teachFig(figNeck({aria:'Prva žica: prazno, pa prst uz prvu prečku',string:1,spots:[{fret:1,text:'prst',mark:'prečka'}],seq:[0,1,0,1]}),'0 = prazno, bez prsta. 1 = kažiprst uz prečku.');
    if(k==='2-3'||k==='2-6')return teachFig(figNeck({aria:'Na prvoj žici mjesta 1 i 3, niz 0 1 3 1',string:1,spots:[{fret:1,text:'1'},{fret:3,text:'3'}],seq:[0,1,3,1]}),'1 = kažiprst uz prvu prečku. 3 = prstenjak uz treću.');
    if(k==='2-4')return teachFig(figNeck({aria:'Na prvoj žici redoslijed 0, 1, 3',string:1,spots:[{fret:0},{fret:1,text:'1'},{fret:3,text:'3'}],seq:[0,1,3]}),'0 = prazno. 1 = prva prečka. 3 = treća prečka.');
    if(k==='2-5')return teachFig(figNeck({aria:'Na drugoj žici prst uz prvu i treću prečku',string:2,spots:[{fret:1,text:'1'},{fret:3,text:'3'}],seq:[1,3,1]}),'<span class="c-s2">2</span> = narančasta, odmah iznad prve. Ista mjesta: 1 i 3.');
    if(k==='3-1')return teachFig(figNeck({aria:'Prvi prag na drugoj žici',string:2,strings:[1,2],spots:[{string:2,fret:1,text:'prst',mark:'prečka'}]}),'<span class="c-s2">2</span> = narančasta. Prst tik uz prvu prečku.');
    if(k==='3-2')return teachFig(figNeck({aria:'Prva žica: 0, 1, 3 — zadnji ton drži',string:1,spots:[{fret:0},{fret:1,text:'1'},{fret:3,text:'3'}],seqSteps:[{s:1,f:0},{s:1,f:1},{s:1,f:3},{s:1,f:3,hold:true}]}),'Na 4. koraku ne trzaj — neka <strong>3</strong> još zvoni.');
    if(k==='3-3')return teachFig(figNeck({aria:'Most: druga žica 3, pa prva prazna',strings:[1,2],spots:[{string:2,fret:3,text:'3'},{string:1,fret:0}],seqSteps:[{s:2,f:3,label:'2. žica'},{s:1,f:0,label:'1. žica'}]}),'Prvo <span class="c-s2">2</span> na 3, pa skok na praznu <span class="c-s1">1</span>.');
    if(k==='3-5')return teachFig(figNeck({aria:'Bratec Martin, dio A',strings:[1,2],spots:[{string:2,fret:1,text:'1'},{string:2,fret:3,text:'3'},{string:1,fret:0},{string:2,fret:1,text:'1'}],seqSteps:[{s:2,f:1},{s:2,f:3},{s:1,f:0},{s:2,f:1}]}),'Red: druga 1 · druga 3 · prva 0 · druga 1.');
    if(k==='3-4')return teachFig(figRepeatMotif,'Otpjevaj <strong>A</strong>, pa ga ponovi. Zatim <strong>B</strong> i ponovi njega. Na kraju pogledaj <strong>Pjesmice</strong> (♪) ili list — tamo su crte.');
    if(k==='3-6')return teachFig(figRepeatMotif,'Prvo <strong>A</strong>, pa <strong>B</strong> — kao na malom koncertu. U B-u zadnji ton traje duže.');
    if(k==='4-2')return teachFig(figNeck({aria:'Dio A — pa odmah isti red još jednom',strings:[1,2],spots:[{string:2,fret:1,text:'1'},{string:2,fret:3,text:'3'},{string:1,fret:0},{string:2,fret:1,text:'1'}],seqSteps:[{s:2,f:1},{s:2,f:3},{s:1,f:0},{s:2,f:1}]}),'Odsviraj ovaj red, pa odmah <strong>isti red</strong> još jednom — bez stajanja.');
    if(k==='4-3')return teachFig(figRepeatMotif,'Cijeli motiv: <strong>A</strong> · <strong>A</strong> · <strong>B</strong> · <strong>B</strong>.');
    if(k==='4-4')return teachFig(figTogetherPulse,'Lijevo: mama ili tata <strong>tiho tapka</strong>. Desno: ti sviraš <strong>A-A-B-B</strong> — u istom koraku.');
    if(k==='4-5')return teachFig(figFourSlots,'Ispod odaberi <strong>četiri zvuka</strong> — tvoja mini skladba.');
    if(k==='4-6')return teachFig(figRepeatMotif,'Sviraj <strong>A-A-B-B</strong> s lista — kao na malom koncertu.');
    if(c.kind==='review')return teachFig(figReviewFavorite,'Izaberi misiju koja ti je najdraža. Odsviraj ju još jednom — polako.');
    return '';
  };
  const reviewPickList=week=>{
    const picks=data.cards.filter(c=>c.week===week&&c.kind!=='review');
    return `<div class="review-picks"><p class="review-picks-lede">Kad odlučiš, otvori tu misiju i sviraj:</p><div class="review-picks-grid">${picks.map(c=>`<a class="review-pick" href="#tjedan-${week}/kartica-${week}-${c.num}"><span class="review-pick-num">${week}.${c.num}</span><span class="review-pick-title">${escape(c.title)}</span></a>`).join('')}</div></div>`;
  };
  const cardMedia=c=>{
    if(c.kind==='review')return missionHero(c);
    if(c.week===4&&c.num===4){
      const hero=missionHero(c);
      const note='Prvo poslušajte <strong>puls</strong> (tapkanje). Zatim <strong>motiv</strong> — to svira Marija. Na gitari: mama ili tata tapka kao u prvom zvuku, Marija svira A-A-B-B kao u drugom, <strong>istovremeno</strong>.';
      return `${hero}${cardAudioBlock(0,null,{omitNote:true,label:'▶ 1. Puls — mama/tata tapka'})}${cardAudioBlock(4,null,{omitNote:true,label:'▶ 2. Motiv — Marija na gitari'})}<p class="card-audio-note">${note}</p>`;
    }
    if(c.week===4&&c.num===5){
      const key=`${c.week}-${c.num}`;
      return `${missionHero(c)}${melodyBuilder(key)}`;
    }
    const ai=cardAudioIndex(c);
    const hero=missionHero(c);
    const fig=c.kind==='neck'?'':diagram(c.kind,c.data);
    const hideFig=hideCardFig(c,hero);
    if(c.kind==='rhythm'&&ai!==null){
      /* 1.5 je pjevanje i pljesak — bez četiri kruga. */
      if(c.week===1&&c.num===5)return cardAudioBlock(ai,'Poslušaj, zapjevaj i plješći uz pjesmu.');
      const note=c.week===1&&c.num===6?'Četiri zvuka na prvoj žici.':c.week===2&&c.num===2?'Na svaki otkucaj odsviraj praznu prvu žicu.':'';
      /* Hero (npr. 1.2) zamjenjuje stari teal ritam-crtež. */
      return hero?`${hero}${cardAudioBlock(ai,note)}`:`${cardAudioBlock(ai,note)}${fig}`;
    }
    if(ai!==null){
      if(Array.isArray(ai)){
        const dualNote=c.week===3&&c.num===4
          ?'Prvo slušaj <strong>dio A</strong>, pa <strong>dio B</strong>. Onda pjevaj i ponovi. Za 3. korak otvori <a href="#pjesmica/bratec"><strong>Pjesmice → Bratec Martin</strong></a> ili tiskani list s tabulaturom.'
          :c.week===3&&c.num===6
          ?'Prvo A, pa B — kao na listu pjesmice. U B-u zadnji ton traje duže.'
          :'';
        const tab=hideFig?'':fig;
        return `${hero}${tab}${cardAudioBlocks(ai,dualNote)}`;
      }
      const tip=c.week===3&&c.num===2
        ?'Slušaj dio B: zadnji ton traje duže — ne trzaj!'
        :c.week===3&&c.num===3
        ?'Čuješ: <strong>druga žica 3</strong>, pa <strong>prva prazna (0)</strong> — to je most!'
        :c.week===3&&c.num===5
        ?'Slušaj <strong>dio A</strong>, pa sviraj isti red na gitari.'
        :c.week===2&&c.num===5
        ?'Sve na <strong>drugoj</strong> (žutoj) žici: 1 · 3 · 1.'
        :c.week===2&&c.num===4
        ?'Uz otkucaje sviraj 0, 1, 3.'
        :c.week===2&&c.num===6
        ?'Poslušaj jednom. Onda sviraj sama i nakloni se.'
        :c.week===4&&c.num===2
        ?'Slušaj <strong>dio A</strong>, pa spoji <strong>A pa A</strong> bez stajanja.'
        :c.week===4&&c.num===3
        ?'Slušaj cijeli motiv <strong>A-A-B-B</strong>. U B-u zadnji ton traje duže.'
        :c.week===4&&c.num===6
        ?'Poslušaj jednom. Onda sviraj s lista — bez ekrana — i nakloni se.'
        :'Prvo uši, pa prsti uz crtež.';
      const tab=hideFig?'':fig;
      return `${hero}${tab}${cardAudioBlock(ai,tip)}`;
    }
    /* Hero zamjenjuje stare figure gdje treba; posture = originalni crtež. */
    if(c.kind==='posture')return hero?`${hero}${diagram(c.kind,c.data)}`:diagram(c.kind,c.data);
    if(hero&&(c.kind==='strings'||c.kind==='neck'))return hero;
    if(hero)return `${hero}${hideFig?'':fig}`;
    return fig;
  };
  const card=c=>{
    const key=`${c.week}-${c.num}`;const n=getStars(key);const tip=cardTip(key);const stuck=stuckTips[key];
    const withStars=c.kind!=='review';
    return `<article class="exercise-card${c.kind==='review'?' review-card':''}${c.kind==='posture'?' instruction-card':''}${withStars&&n?' has-stars':''}" id="kartica-${c.week}-${c.num}">
      <div class="card-tag">MISIJA ${c.week}.${c.num}</div>
      <h3>${escape(c.title)}</h3>
      <div class="card-zvonko"><img src="assets/dragon-guitar-pixar.jpg" alt="" width="64" height="64"><p><strong>${escape(tip[0])}</strong> ${escape(tip[1])}</p></div>
      ${cardMedia(c)}
      <ol>${c.steps.map(s=>`<li>${escape(s)}</li>`).join('')}</ol>
      ${c.kind==='review'?reviewPickList(c.week):''}
      ${stuck?`<p class="stuck-tip" role="note"><strong>Ako zapne:</strong> ${escape(stuck)}</p>`:''}
      ${withStars?`<div class="mission-footer">${starButtons(key,n)}${n?`<p class="mission-cheer">${escape(mascotName)}: ${n===3?'Tri zvjezdice! Ti si sjajna!':n===2?'Sama — super! Sutra možeš treću.':'Bravo! Probala si. Još ★★ kad budeš sama!'}</p>`:''}</div>`:''}
    </article>`;
  };
  const weekMeter=week=>{
    const got=weekStarTotal(week);const max=weekStarMax(week);const pct=Math.round(got/max*100);
    return `<section class="sheet week-meter" aria-label="Zvjezdice ovog tjedna"><div class="sheet-label">TVOJE ZVJEZDICE</div><div class="week-meter-top"><strong>${got}</strong><span> / ${max} ★ ovaj tjedan</span></div><div class="week-meter-track"><div class="week-meter-fill" style="width:${pct}%"></div></div><p class="storage-note">Zvjezdice nisu ocjene — samo bilješka što si vježbala.</p></section>`;
  };
  const badgesPanel=()=>{
    const next=nextBadge();
    return `<section class="sheet badges-panel" id="bedzevi"><div class="sheet-label">MOJI BEDŽEVI</div><h2>Velike nagrade</h2><div class="badge-grid">${badges.map(b=>{const on=badgeOn(b);return `<div class="badge-tile${on?' is-unlocked':''}">${badgeIcon(b.icon)}<strong>${escape(b.title)}</strong><span class="badge-state">${on?'Otključano! <span class="app-ico app-ico-spark app-ico-inline" aria-hidden="true"></span>':escape(badgeNeedText(b))}</span></div>`;}).join('')}</div>${next?`<p class="badge-next">${escape(mascotName)}: Sljedeći bedž je „${escape(next.title)}”. ${escape(badgeNeedText(next))}</p>`:`<p class="badge-next">${escape(mascotName)}: Imaš sve bedževe! Ti si prava gitaristica!</p>`}</section>`;
  };
  const starGallery=()=>`<section class="sheet star-gallery"><div class="sheet-label">SVE MISIJE</div><h2>Gdje su tvoje ★</h2><div class="gallery-weeks">${[1,2,3,4].map(w=>`<div class="gallery-week"><h3>Tjedan ${w}</h3><div class="gallery-missions">${Array.from({length:weekMissionCount(w)},(_,i)=>i+1).map(n=>{const k=`${w}-${n}`;const stars=getStars(k);const c=data.cards.find(x=>x.week===w&&x.num===n);const withStars=!c||c.kind!=='review';return `<a class="gallery-mission${withStars&&stars?' has-stars':''}" href="#tjedan-${w}/kartica-${w}-${n}">${withStars?`<span class="gallery-stars">${[1,2,3].map(i=>`<span class="${i<=stars?'is-on':''}">★</span>`).join('')}</span>`:''}<span class="gallery-title">${escape(c?c.title:k)}</span></a>`;}).join('')}</div><p class="gallery-sum">${weekStarTotal(w)} / ${weekStarMax(w)} ★</p></div>`).join('')}</div></section>`;
  const concertInvite=(id='pozivnica')=>{const g=guitarNameTrim()||'moja gitara';return `<section class="sheet concert-invite" id="${id}"><div class="sheet-label">POZIVNICA</div><h2>Moj mali koncert!</h2><p class="concert-lede">Pozivam te da dođeš slušati kako sviram na gitari <strong>${escape(g)}</strong>!</p><p class="concert-sub">Sviram početak pjesmice <em>Bratec Martin</em>.</p><div class="concert-dates"><p class="concert-date-row"><span>Datum:</span><span class="concert-blank" aria-hidden="true"></span></p><p class="concert-date-row"><span>Vrijeme:</span><span class="concert-blank" aria-hidden="true"></span></p></div><p class="concert-field">Tko dolazi (mama, tata, baka…)?</p><div class="concert-lines" aria-hidden="true"></div><button class="print secondary print-invite" type="button">Ispiši pozivnicu</button></section>`;};
  const adultStarLevel=status=>(status==='drugi-dan'?3:status==='samostalno'?2:status==='pomoc'?1:0);
  const adultStarRow=status=>{const n=adultStarLevel(status);return `<span class="star-row" aria-label="${n} od 3">${[1,2,3].map(i=>`<span class="star-icon${i<=n?' is-on':''}">★</span>`).join('')}</span>`;};
  const audioNames=['01_cetiri_otkucaja.wav','02_prva_zica_0_1_3_1.wav','03_bratec_martin_dio_A.wav','04_bratec_martin_dio_B.wav','05_bratec_martin_motiv.wav','06_zvuk_tisina.wav','07_most_druga3_prva0.wav','08_druga_zica_1_3_1.wav','09_prva_zica_0_1_0_1.wav','10_prva_zica_0_1_3.wav'];
  const audioTitles=['Četiri zvuka u pulsu','Prva žica: 0, 1, 3, 1','Bratec Martin · dio A','Bratec Martin · dio B','Bratec Martin · A-A-B-B','Zvuk · tišina · zvuk · tišina','Most: druga 3 → prva 0','Druga žica: 1, 3, 1','Prva žica: 0, 1, 0, 1','Prva žica: 0, 1, 3'];
  const audioHints=['Prvo čuješ četiri otkucaja — onda sviraj uz njih!','Prvo čuješ četiri otkucaja — onda sviraj uz njih!','Prvo čuješ četiri otkucaja — onda sviraj uz njih!','Prvo čuješ četiri otkucaja — onda sviraj uz njih!','Prvo čuješ četiri otkucaja — onda sviraj uz njih!','Nakon uvodnih otkucaja: ton, tišina, ton, tišina. Na tišini zaustavi žicu!','Nakon otkucaja: druga žica na 3, pa prazna prva žica.','Nakon otkucaja: na drugoj žici 1, pa 3, pa opet 1.','Nakon otkucaja: na prvoj žici 0, pa 1, pa opet 0, pa 1.','Nakon otkucaja: na prvoj žici 0, pa 1, pa 3.'];
  const audio=i=>`<article class="sound"><h3>${audioTitles[i]}</h3><p>${audioHints[i]}</p><audio controls preload="none" aria-label="${escape(audioTitles[i])}" src="assets/audio/${audioNames[i]}"></audio></article>`;
  let positionShift=0;
  let songTempo=60;
  let synth=null;
  let playing=false;
  let playGeneration=0;
  const stopSong=()=>{
    playGeneration++;playing=false;
    if(synth){synth.close().catch(()=>{});synth=null;}
    document.querySelectorAll('.tab-note.active').forEach(n=>n.classList.remove('active'));
    document.querySelectorAll('[data-play-song]').forEach(b=>b.textContent='▶ Slušaj me');
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
    document.getElementById('stop-song').disabled=false;
    const beat=60/Number(document.getElementById('song-tempo').value);let time=context.currentTime+.1;
    function sound(frequency,start,duration,volume){
      const oscillator=context.createOscillator();const gain=context.createGain();oscillator.type='triangle';oscillator.frequency.value=frequency;
      gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.015);gain.gain.exponentialRampToValueAtTime(.001,start+duration*.9);
      oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+duration);
    }
    for(let i=0;i<4;i++){sound(880,time,.08,.09);time+=beat;}
    const events=[];
    song.rows.forEach((row,r)=>row.forEach((n,i)=>{const frequency=(n[0]===1?329.6275569:246.9416506)*2**((n[1]+positionShift)/12);sound(frequency,time,n[2]*beat,.14);events.push({start:time,end:time+n[2]*beat,id:`${id}-${r}-${i}`});time+=n[2]*beat;}));
    const finish=time;
    function animate(){
      if(generation!==playGeneration)return;
      const current=events.find(e=>context.currentTime>=e.start&&context.currentTime<e.end);
      document.querySelectorAll('.tab-note.active').forEach(n=>n.classList.remove('active'));
      if(current)document.querySelector(`[data-song-note="${current.id}"]`)?.classList.add('active');
      if(context.currentTime>=finish){stopSong();return;}requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
  const mascotBubble=(title,text)=>`<section class="mascot-panel" aria-label="${escape(mascotName)} daje upute"><div class="mascot-frame"><img src="assets/dragon-guitar-pixar.jpg" width="160" height="160" alt="${escape(mascotName)}, slatki zmaj s malom gitarom"></div><p class="speech-bubble"><strong>${escape(title)}</strong> ${escape(text)}</p></section>`;
  const mascotFor=key=>{const line=mascotLines[key]||mascotLines.pocetak;return mascotBubble(line[0],line[1]);};
  const cardTitle=(week,num)=>{const c=data.cards.find(x=>x.week===week&&x.num===num);return c?c.title:`Misija ${week}.${num}`};
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
    if(missing.length===1)return `U tjednu ${b.week} još treba barem jedna ★ na misiji ${names[0]}.`;
    return `U tjednu ${b.week} stavi barem jednu ★ na misije ${joinNames(names)}.`;
  };
  const missionLink=(week,num)=>`<a class="mission-link" href="#tjedan-${week}/kartica-${week}-${num}">${escape(cardTitle(week,num))}</a>`;
  const missionLinks=(week,nums)=>nums.map(num=>missionLink(week,num)).join(' · ');
  const dailyKid=[[
    /* Dan = ista misija: 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7 */
    {text:'Udobno sjedni s gitarom i dotakni prvu (najtanju) žicu.',missions:[1],parent:'Prvo joj pomozi namjestiti stolac i gitaru. Kad sjedi udobno, pusti ju da sama potraži najtanju žicu.',game:'Igra: detektiv žice (gdje je najtanja?).'},
    {text:'Pljesni četiri puta ravno, pa isto odsviraj na prvoj žici.',missions:[2],parent:'Tiho tapkaj uz nju. Ako žuri, usporite oboje — sporije je bolje.',game:'Igra: pljesak pa žica.'},
    {text:'Odsviraj zvuk, pa tišinu. Kao igra stani–kreni.',missions:[3],parent:'Slušajte zajedno. Na riječ „tišina” ona lagano dodirne žicu da prestane zvoniti.',game:'Igra: semafor zvuka (zeleno = sviraj, crveno = stani).'},
    {text:'Pronađi prvu i drugu žicu i odsviraj svaku zasebno.',missions:[4],parent:'Pitaj: „Koja je najtanja?” Ne pokazuj odmah — neka ona potraži.',game:'Igra: lov na dvije žice.'},
    {text:'Pjevuši „Bratec Martin” i plješći u ritmu.',missions:[5],parent:'Najprije samo pjevanje i pljesak. Gitara danas može pričekati.',game:'Igra: pjevaj pa plješći.'},
    {text:'Pokaži četiri zvuka na prvoj žici — sama, pa se nakloni.',missions:[6],parent:'Dok svira, samo slušaj. Plješći nakon naklona. Ne ispravljaj usred nastupa.',game:'Igra: mini nastup (četiri zvuka na prvoj žici).'},
    {text:'Ponovi omiljenu misiju ili igru iz ovog tjedna.',missions:[7],parent:'Neka Marija izabere što voli ponoviti. To jača samopouzdanje.',game:'Igra: njezin izbor!'}
  ],[
    {text:'Kažiprst blizu metalne prečke — jedan čist zvuk.',missions:[1],parent:'Ako žica zuji: prst malo bliže prečci i blaži stisak. Neka odmara šaku između pokušaja.',game:'Igra: prst traži kućicu.'},
    {text:'Pljesni četiri puta ravno — na svaki korak odsviraj praznu prvu žicu.',missions:[2],parent:'Tiho tapkaj uz nju. Jedan zvuk po koraku, bez žurbe.',game:'Igra: korak pa žica.'},
    {text:'Spoji cijeli niz: 0, 1, 3, 1 — bez žurbe.',missions:[3],parent:'Bolje jedan sporiji prolaz nego tri brza i mutna. Opusti šaku između.',game:'Igra: četiri kućice u nizu.'},
    {text:'Objasni što znače 0, 1 i 3, pa ih odsviraj redom.',missions:[4],parent:'Neka ona tebi objasni brojeve. To je učenje, ne ispit.',game:'Igra: detektiv brojeva.'},
    {text:'Ista igra na drugoj žici: 1, pa 3, pa opet 1.',missions:[5],parent:'Ako zapne, vratite se na prvu žicu pola minute, pa opet na drugu.',game:'Igra: nova staza (druga žica).'},
    {text:'Pokaži niz 0, 1, 3, 1 — sama, pa se nakloni.',missions:[6],parent:'Dok svira, samo slušaj. Plješći nakon naklona. Ne ispravljaj usred nastupa.',game:'Igra: mini nastup (niz 0, 1, 3, 1).'},
    {text:'Ponovi omiljenu misiju ili igru iz ovog tjedna.',missions:[7],parent:'Neka Marija izabere što voli ponoviti. To jača samopouzdanje.',game:'Igra: njezin izbor!'}
  ],[
    /* Dan = ista misija: 3.1 → 3.3 → 3.4 (pjev) → 3.2 (B) → 3.5 (A) → 3.6 (koncert) → 3.7 */
    {text:'Namjesti gitaru i opusti ramena. Pronađi prvi prag na drugoj žici.',missions:[1],parent:'Kratko provjeri sjedenje kao na početku tjedna. Bez žurbe.',game:'Igra: ramena miruju.'},
    {text:'Mali most: druga žica na 3, pa prva žica prazna (0).',missions:[3],parent:'Most je teži. Dopusti joj da svaku žicu svira zasebno, pa ih spoji.',game:'Igra: skok preko potoka.'},
    {text:'Pjevuši dio A, pa dio B — echo. Na listu ili u Pjesmicama (♪) pokaži gdje se ponavljaju.',missions:[4],parent:'Danas samo glas i prst na papiru — gitara može pričekati. Otvorite Pjesmice → Bratec Martin ili tiskani list.',game:'Igra: echo A / echo B, pa detektiv na listu.'},
    {text:'Danas samo dio B na gitari: na prvoj žici 0, 1, 3 — zadnji ton drži dva koraka.',missions:[2],parent:'To je cijeli dio B pjesmice. Na zadnjem tonu brojite 1-2-3-4; na 4. samo drži.',game:'Igra: drži ton (dio B).'},
    {text:'Poslušaj dio A, zapjevaj ga, pa potraži mjesta na gitari.',missions:[5],parent:'Redoslijed: najprije pjevanje, tek onda prsti na žicama. Dio B si već probala jučer (3.2).',game:'Igra: pjevaj pa sviraj (dio A).'},
    {text:'Mali koncert — sama odsviraj dio A, zatim sama dio B (kao jučer i danas). Na kraju se nakloni!',missions:[6],parent:'A pa B — svaki zasebno, bez spajanja u jedan komad. Ako B još zapne, koncert može biti samo A; sutra ponovite 3.2.',game:'Igra: koncert!'},
    {text:'Ponovi omiljenu misiju ili igru iz ovog tjedna.',missions:[7],parent:'Neka Marija izabere što voli ponoviti — npr. dio A (3.5) ili koncert (3.6).',game:'Igra: njezin izbor!'}
  ],[
    /* Dan = misija: 4.1 → 4.2 → 4.3 (spoj) → 4.3 (motiv) → 4.4 → 4.6 → 4.7 — kartice 4.1–4.7 istim redom */
    {text:'Pripremi gitaru i list pjesmice — kao prije malog koncerta.',missions:[1],parent:'Ugodi gitaru i stolac. List stavi na stol — danas još ne svira cijeli koncert.',game:'Igra: detektiv liste.'},
    {text:'Spoji dva puta dio A, bez stajanja između.',missions:[2],parent:'Tiho tapkaj puls. Ako stane između A i A, usporite tempo.',game:'Igra: A pa A.'},
    {text:'Vježbaj samo prijelaz: kraj A → početak B.',missions:[3],parent:'Nekoliko puta samo taj spoj — ne cijeli motiv.',game:'Igra: most A→B.'},
    {text:'Cijeli motiv: A, A, B, B!',missions:[3],parent:'Ako zapne, prvo A-A, pa B-B, pa tek onda sve skupa.',game:'Igra: A-A-B-B voz.'},
    {text:'Mama ili tata tiho tapka — ti sviraš cijeli motiv A-A-B-B uz taj puls.',missions:[4],parent:'Ti samo tapkaš (ne sviraš gitaru). Marija gleda list i svira motiv. Ako zapne, tapkaj sporije.',game:'Igra: tapkanje + motiv.'},
    {text:'Moj mali koncert — odloži ekran, sviraj A-A-B-B s lista i nakloni se!',missions:[6],parent:'Samo slušaj i plješći na kraju. Bez ispravaka usred nastupa. Zvjezdice ★ birate zajedno na kartici.',game:'Igra: koncert!'},
    {text:'Ponovi omiljenu misiju ili igru iz ovog tjedna.',missions:[7],parent:'Može ponoviti koncert (4.6) ili bilo koju drugu misiju. Ako je koncert uspio i drugi dan, ★★★ na 4.6.',game:'Igra: njezin izbor!'}
  ]];
  const focusDay=(week,dayIndex)=>{const hook=data.daily[week-1][dayIndex][0];const kid=dailyKid[week-1][dayIndex];const firstMission=kid.missions[0];return {hook,kid,firstMission,ctaHref:firstMission?`#tjedan-${week}/kartica-${week}-${firstMission}`:`#tjedan-${week}/kartice`,ctaLabel:firstMission?'Kreni u današnju misiju →':'Pogledaj sve misije →'};};
  const activeWeek=()=>Math.min(4,Math.max(1,Number(state.activeWeek)||1));
  const todayFocus=(week,opts={})=>{
    const day=Math.min(7,Math.max(1,Number(state.days[week])||1));
    const {hook,kid,ctaHref,ctaLabel}=focusDay(week,day-1);
    const missions=kid.missions.length?`<p class="day-missions"><span class="day-missions-label">Misija:</span> ${missionLinks(week,kid.missions)}</p>`:'';
    const weekPick=opts.home?`<div class="week-picker" role="group" aria-label="Odaberi tjedan">${[1,2,3,4].map(w=>`<button type="button" class="week-pick${w===week?' is-active':''}" data-home-week="${w}" aria-pressed="${w===week}">Tjedan ${w}</button>`).join('')}</div>`:'';
    const label=opts.home?`TJEDAN ${week} · DAN ${day}`:`DAN ${day} · DANAS`;
    const id=opts.home?'danas-kod-kuce':'danas';
    const dayCards=kid.missions.map(n=>data.cards.find(c=>c.week===week&&c.num===n)).filter(Boolean);
    const reviewDay=dayCards.length>0&&dayCards.every(c=>c.kind==='review');
    const dayKeys=kid.missions.map(n=>`${week}-${n}`);
    const dayStars=dayKeys.reduce((a,k)=>a+getStars(k),0);
    const dayGoal=reviewDay
      ? `<p class="day-goal"><span class="app-ico app-ico-again" aria-hidden="true"></span> Dan za ponavljanje — izaberi omiljenu misiju i odsviraj je još jednom.</p>`
      : kid.missions.length
      ? (dayStars>0
        ? `<p class="day-goal is-done"><span class="app-ico app-ico-check" aria-hidden="true"></span> Današnji cilj: imaš ★ na današnjoj misiji. Bravo!</p>`
        : `<p class="day-goal"><span class="app-ico app-ico-star" aria-hidden="true"></span> Današnji cilj: zaradi barem <strong>1 ★</strong> na današnjoj misiji!</p>`)
      : `<p class="day-goal"><span class="app-ico app-ico-again" aria-hidden="true"></span> Dan za ponavljanje — dodaj ★★★ na omiljenu misiju!</p>`;
    const game=kid.game?`<p class="day-game">${escape(kid.game)}</p>`:'';
    const parent=kid.parent?`<p class="day-parent" role="note"><strong>Za mamu ili tatu:</strong> ${escape(kid.parent)}</p>`:'';
    return `<section class="sheet today-focus${opts.home?' today-focus-home':''}" id="${id}"><div class="sheet-label">${label}</div>${weekPick}<h2>Danas: ${escape(hook)}</h2><p class="lede">${escape(kid.text)}</p>${dayGoal}${missions}${game}${parent}<div class="day-picker" role="group" aria-label="Odaberi dan u tjednu">${[1,2,3,4,5,6,7].map(d=>`<button type="button" class="day-pick${d===day?' is-active':''}" data-week-day="${week}" data-day="${d}" aria-pressed="${d===day}">Dan ${d}</button>`).join('')}</div><div class="today-focus-actions"><a class="button" href="${ctaHref}">${ctaLabel}</a>${opts.home?`<a class="button secondary" href="#tjedan-${week}/danas">Otvori tjedan →</a>`:''}</div></section>`;
  };
  const guitarNameField=()=>`<div class="hero-guitar-field"><label class="form-label" for="guitar-name">Kako se zove tvoja gitara?</label><input type="text" id="guitar-name" data-guitar-name maxlength="24" placeholder="npr. Luna, Zvjezdica…" value="${escape(state.guitarName||'')}"></div>`;
  const homeMascot=()=>{
    const name=guitarNameTrim();const stars=totalStars();
    if(stars>0)return mascotBubble(`Bok, Marija!`,`Ja sam ${mascotName}. Skupa učimo — i ti već imaš ${stars} ★! Danas idemo dalje, ja navijam za tebe.`);
    if(name)return mascotBubble(`Bok, Marija!`,`Ja sam ${mascotName}. Ti i ${name} ste sjajan tim — kreni u misiju, pa klikni ★ kad završiš!`);
    return mascotBubble(`Bok, Marija! Ja sam ${mascotName}!`,'Skupa ćemo učiti tvoje prve lekcije na gitari — polako i veselo.');
  };
  const dailyRow=(week,dayIndex)=>{
    const hook=data.daily[week-1][dayIndex][0];
    const kid=dailyKid[week-1][dayIndex];
    const missions=kid.missions.length?`<p class="day-missions">${missionLinks(week,kid.missions)}</p>`:`<p>${escape(data.daily[week-1][dayIndex][1])}</p>`;
    const game=kid.game?`<p class="day-game">${escape(kid.game)}</p>`:'';
    const parent=kid.parent?`<p class="day-parent"><strong>Za mamu ili tatu:</strong> ${escape(kid.parent)}</p>`:'';
    return `<div class="day"><strong>Dan ${dayIndex+1}</strong><div><b>${escape(hook)}</b><p>${escape(kid.text)}</p>${missions}${game}${parent}</div></div>`;
  };
  function home(){
    const name=guitarNameTrim();
    const heroTitle=name?`Danas svira<br><span class="hero-guitar-name">${escape(name)}</span>.`:`Danas upoznajemo<br>tvoju gitaru.`;
    const heroLead=name?'Jedan mali zadatak, puno lijepih zvukova — tvoja gitara čeka!':'Jedan mali zadatak, puno lijepih zvukova i malo igre. Odrasla osoba ti pokaže, a ti istražuješ.';
    const w=activeWeek();
    return heading('TVOJA GLAZBENA PUSTOLOVINA','Mali koraci, velika radost!','Od prvog zvuka do „Bratec Martin” — sve je ovdje, korak po korak, samo za tebe.')+
      homeMascot()+
      todayFocus(w,{home:true})+
      `<section class="sheet hero hero-home" id="moja-gitara"><div class="hero-home-text"><div class="sheet-label">KRENI!</div><h2>${heroTitle}</h2><p>${heroLead}</p>${guitarNameField()}<div class="hero-links"><a class="button" href="#tjedan-${w}/danas">Nastavi tjedan ${w} →</a><a class="button secondary" href="#zvuk">Prvo poslušaj</a></div></div><figure class="hero-home-figure">${diagram('guitar',null)}</figure></section>`+
      `<div class="section-heading"><h2>Četiri tjedna avanture</h2><span class="eyebrow">BEZ ŽURBE</span></div><div class="grid">${titles.map((t,i)=>`<a class="week-tile" href="#tjedan-${i+1}"><div class="sheet-label">TJEDAN ${i+1}</div><h3>${escape(t)}</h3><p>${kidGoals[i]}</p><small>Misije · kućna igra · slušanje →</small></a>`).join('')}</div>`+
      section('Kako sviramo ovdje','<p>Jednom tjedno imate susret od oko sat vremena. Kod kuće ti je dovoljno 15–20 minuta — kao kratka priča prije spavanja, samo s gitarom!</p><div class="goal goal-star"><strong>Naučila si kad:</strong> možeš sama i možeš ponoviti sutra.</div><p>Od tjedna 2 naučiš čitati kartu: <a href="#tjedan-2/kako-citam">Kako čitam kartu?</a></p>');
  }
  const howToReadMap=()=>`<section class="sheet how-to-read" id="kako-citam"><div class="sheet-label">PRIJE MISIJA</div><h2>Kako čitam kartu?</h2><p class="lede">Tri znaka — i možeš svirati!</p><div class="read-map-grid">
    <article class="read-map-card"><div class="rm-visual rm-line" aria-hidden="true"><span class="rm-string rm-s1"></span><span class="rm-string rm-s2"></span><span class="rm-string"></span></div><h3>1. Crta = žica</h3><p>Gornja crta je <strong class="c-s1">1. žica</strong> (ružičasta). Ispod nje <strong class="c-s2">2. žica</strong> (žuta).</p></article>
    <article class="read-map-card"><div class="rm-visual rm-num" aria-hidden="true"><span class="rm-fret">1</span><span class="rm-fret">3</span></div><h3>2. Broj = prag</h3><p>Broj kaže <strong>gdje</strong> staviš prst. 1 = prvi prag, 3 = treći.</p></article>
    <article class="read-map-card"><div class="rm-visual rm-zero" aria-hidden="true"><span class="rm-fret rm-open">0</span></div><h3>3. Nula = prazno</h3><p><strong>0</strong> znači: ne stišći — sviraj praznu žicu.</p></article>
  </div><p class="note">Čitaj slijeva nadesno, kao priču. Ako zapneš, vrati se ovdje!</p></section>`;
  function week(n){
    const cards=data.cards.filter(c=>c.week===n);
    const aud=n===1?[0,5]:n===2?[8,9,1,7]:n===3?[6,2,3]:[4];
    const susret=`<details class="sheet adult-fold" id="susret"><summary><span class="sheet-label">ZA ODRASLU OSOBU</span> Plan susreta (~60 min)</summary><div class="adult-fold-body">${pageBody(n+3)}</div></details>`;
    const got=weekStarTotal(n);
    const weekMascotLine=got>=12
      ? [`Tjedan ${n} sjaji!`,`Imaš ${got} ★ — Zvonko je oduševljen! Još malo do ${weekStarMax(n)}.`]
      : mascotLines['tjedan'+n];
    const mapLesson=n>=2?howToReadMap():'';
    const lede='Sedam malih misija. Na sviranju klikni ★ kad završiš!';
    return heading('TJEDAN '+n+' ★',titles[n-1],lede)+
      mascotBubble(weekMascotLine[0],weekMascotLine[1])+
      weekMeter(n)+
      `<div class="quicklinks"><a href="#tjedan-${n}/danas">Danas</a>${n>=2?`<a href="#tjedan-${n}/kako-citam">Kako čitam?</a>`:''}<a href="#tjedan-${n}/kartice">Misije</a><a href="#tjedan-${n}/kod-kuce">Tjedni plan</a><a href="#tjedan-${n}/poslusaj">Poslušaj</a><a href="#napredak">Moje zvjezdice</a><a href="#tjedan-${n}/susret">Plan susreta</a></div>`+
      `<div class="goal goal-star"><strong>Cilj tjedna:</strong> ${kidGoals[n-1]}</div>`+
      todayFocus(n)+
      mapLesson+
      section('Moje misije',`${starHowTo}<p class="lede">Pročitaj korake, sviraj, pa odaberi zvjezdice na dnu kartice.</p><div class="card-grid">${cards.map(card).join('')}</div>`,'kartice','SEDAM MISIJA')+
      section('Plan za svaki dan',`<p>Kratko namjesti se → ponovi što znaš → današnja misija → malo pjesmice → kraj!</p><div class="days">${[0,1,2,3,4,5,6].map(i=>dailyRow(n,i)).join('')}</div><div class="note">Još teško? Ponovi istu misiju — to je pametno! Dan nakon susreta kreni od dana 1.</div>`,'kod-kuce','7 MALIH DANA')+
      section('Poslušaj i ponovi',`<div class="sounds">${aud.map(audio).join('')}</div><p class="storage-note">Prvo slušaj, pa probaj uz zvuk. Ruke ti pokaže odrasla osoba.</p>`,'poslusaj')+
      susret+
      (n===4?concertInvite():'')+
      `<div class="week-footer"><a class="button secondary" href="#${n===1?'pocetak':'tjedan-'+(n-1)}">← ${n===1?'Početak':'Prethodni tjedan'}</a><a class="button" href="#${n===4?'napredak':'tjedan-'+(n+1)}">${n===4?'Moje zvjezdice!':'Sljedeći tjedan'} →</a></div>`;
  }
  const skillsTable=data.pages.find(p=>p.title==='Moj list napretka')?.blocks.find(b=>b[0]==='table');
  const skills=(skillsTable?.[2]||[]).map(row=>({week:row[0],title:row[1]}));
  function progress(){
    const total=totalStars();const maxAll=[1,2,3,4].reduce((a,w)=>a+weekStarMax(w),0);const unlocked=unlockedBadges().length;
    const options=[['','Jo probavamo'],['pomoc','Uz pomoć'],['samostalno','Sama mogu!'],['drugi-dan','Ponovila sam sutra!']];
    const rows=skills.map((s,i)=>{const v=state.skills[i]||{};return `<tr><td><span class="sheet-label">TJEDAN ${s.week}</span><br>${escape(s.title)}<div class="progress-stars">${adultStarRow(v.status||'')}</div></td><td class="progress-status"><label class="visually-hidden" for="skill-${i}">Status: ${escape(s.title)}</label><select id="skill-${i}" data-skill="${i}">${options.map(([val,label])=>`<option value="${val}"${v.status===val?' selected':''}>${label}</option>`).join('')}</select><small>Datum</small><input type="date" aria-label="Datum: ${escape(s.title)}" data-date="${i}" value="${escape(v.date||'')}"><small>${v.firstDate?'Prvi put sama: '+escape(v.firstDate):''}</small></td></tr>`}).join('');
    const next=nextBadge();
    const mascotProg=next
      ? [total?`Skupila si ${total} ${starAcc(total)}!`:'Još nemaš zvjezdica.',`Sljedeći bedž je „${next.title}”. ${badgeNeedText(next)}`]
      : [`Sjajna si!`,`${total} ★ i sva ${unlocked} bedža. Zvonko je ponosan!`];
    return heading('MOJE ZVJEZDICE','Tvoja galerija sjaja','Klikni ★ na misijama — ovdje vidiš sve što si zaradila!')+
      mascotBubble(mascotProg[0],mascotProg[1])+
      `<section class="sheet star-hero"><div class="star-hero-count" aria-label="Ukupno zvjezdica"><span class="star-hero-num">${total}</span><span class="star-hero-label">zvjezdica</span></div><div class="star-hero-bar"><div class="week-meter-fill" style="width:${Math.round(total/maxAll*100)}%"></div></div><p>${unlocked} / 4 bedža · max ${maxAll} ★</p><div id="save-status" class="saved" role="status"></div></section>`+
      badgesPanel()+
      starGallery()+
      concertInvite('pozivnica-napredak')+
      section('Moja poruka sebi',`<p>Napiši nešto lijepo sebi — za kasnije!</p>${[['samostalno','Ovo znam sama'],['pomoc','Ovo mi još treba pomoć'],['sljedece','Sljedeći mali korak']].map(([k,label])=>`<label class="form-label" for="note-${k}">${label}</label><textarea id="note-${k}" data-note="${k}" placeholder="Napiši nešto lijepo sebi…">${escape(state.notes[k]||'')}</textarea>`).join('')}`)+
      `<details class="sheet adult-fold" id="za-odrasle-napredak"><summary><span class="sheet-label">ZA ODRASLU OSOBU</span> Tablica vještina</summary><div class="adult-fold-body"><p class="storage-note">Ovo je za mamu/tatu/učitelja. Marija koristi ★ na misijama.</p><div class="tablewrap"><table class="progress-table"><thead><tr><th>Vještina</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div></details>`;
  }
  function help(){return mascotFor('pomoc')+heading('ZA ODRASLU OSOBU','Pomoć i poveznice','Priprema instrumenta, jednostavna objašnjenja i pomoć kada nešto zapne.')+
    section('Prije sviranja',pageBody(2))+
    section('Žica, prag ili prst?',pageBody(3))+
    section('Kad nešto zapne',pageBody(9))+
    section('Android kao pomoćnik',pageBody(10))+
    section('Pouzdani izvori',pageBody(11))+
    section('Ispis','<p><a href="output/pdf/gitarska_pustolovina_prvi_mjesec.pdf">PDF cijelog mjeseca</a> · <a href="output/gitarska_pustolovina.html">Dugi HTML list svih materijala</a></p>');}
  function render(keepPosition=false){
    stopSong();
    const openDialog=document.getElementById('explain-dialog');if(openDialog.open)openDialog.close();
    const previousScroll=window.scrollY;
    const [requested='pocetak',anchor='']=location.hash.slice(1).split('/');const route=nav.some(n=>n[0]===requested)?requested:'pocetak';
    content.dataset.view=route==='pjesmica'?'songs':'';
    document.getElementById('navigation').innerHTML=nav.map(([id,title,num])=>`<a href="#${id}"${route===id?' aria-current="page"':''}><span class="nav-number" aria-hidden="true">${num}</span>${title}</a>`).join('');
    if(route==='pocetak')content.innerHTML=home();
    else if(route.startsWith('tjedan-')){const w=Number(route.slice(-1));state.activeWeek=w;save();content.innerHTML=week(w);}
    else if(route==='pjesmica')content.innerHTML=mascotFor(anchor?'pjesmicaPjevanje':'pjesmica')+window.GuitarSongUI.render(anchor,positionShift,songTempo);
    else if(route==='zvuk')content.innerHTML=heading('POSLUŠAJ I SVIRAJ','Moji zvučni prijatelji','Deset kratkih primjera. Najprije uši, pa prsti!')+mascotFor('zvuk')+section('Od otkucaja do pjesmice',`<div class="sounds">${audioNames.map((_,i)=>audio(i)).join('')}</div><div class="note">Svaki zvuk počinje s četiri otkucaja — kao mali metronom. Zatim pokušaj na gitari uz pomoć odrasle osobe.</div>`);
    else if(route==='napredak')content.innerHTML=progress();else content.innerHTML=help();
    document.title=(route==='pjesmica'?window.GUITAR_SONGS.find(s=>s.id===anchor)?.title||'Pjesmice':nav.find(n=>n[0]===route)[1])+' · Gitarska pustolovina';
    const dock=document.getElementById('mobile-dock');
    if(dock){
      const weekId='tjedan-'+activeWeek();
      const dockNav=[['pocetak','·','Početak'],[weekId,'★','Tjedan'],['pjesmica','♪','Pjesmice'],['zvuk','♪','Zvuk'],['napredak','★','Zvjezdice']];
      dock.innerHTML=dockNav.map(([id,icon,label])=>{
        const on=route===id||(id.startsWith('tjedan-')&&route.startsWith('tjedan-'));
        return `<a href="#${id}" class="dock-item${on?' is-on':''}"${on?' aria-current="page"':''}><span class="dock-icon" aria-hidden="true">${icon}</span><span class="dock-label">${label}</span></a>`;
      }).join('');
    }
    setNavOpen(false);
    const chip=document.getElementById('danas-chip');
    if(chip){
      const w=route.startsWith('tjedan-')?Number(route.slice(-1)):activeWeek();
      chip.href=`#tjedan-${w}/danas`;
      chip.hidden=route==='pomoc'||anchor==='danas';
      chip.innerHTML=`<span class="danas-chip-label">Danas</span><span class="danas-chip-go">Tjedan ${w} →</span>`;
    }
    const target=route!=='pjesmica'&&anchor&&document.getElementById(anchor);if(keepPosition===true)window.scrollTo(0,previousScroll);else if(target){if(target.tagName==='DETAILS')target.open=true;target.scrollIntoView({behavior:'smooth',block:'start'})}else window.scrollTo(0,0);
    document.querySelectorAll('audio').forEach(a=>a.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{if(other!==a)other.pause()})));
    updateChrome();
  }
  const setNavOpen=open=>{
    document.body.classList.toggle('nav-open',!!open);
    const toggle=document.getElementById('nav-toggle');
    const backdrop=document.getElementById('nav-backdrop');
    if(toggle)toggle.setAttribute('aria-expanded',open?'true':'false');
    if(backdrop)backdrop.hidden=!open;
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
  document.addEventListener('click',e=>{
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
      },720);
      return;
    }
    if(e.target.closest('#nav-toggle')){setNavOpen(!document.body.classList.contains('nav-open'));return;}
    if(e.target.closest('#nav-close')||e.target.closest('#nav-backdrop')){setNavOpen(false);return;}
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
    const starBtn=e.target.closest('[data-mission-star]');
    if(starBtn){
      const key=starBtn.dataset.missionStar;const next=Number(starBtn.dataset.stars);const prev=getStars(key);
      const beforeBadges=new Set(unlockedBadges().map(b=>b.id));
      if(next===0)delete state.missionStars[key];else state.missionStars[key]=next;
      save();
      const after=unlockedBadges().find(b=>!beforeBadges.has(b.id));
      if(after)showBadgeCheer(after);
      else if(next>prev)celebrate(next===3?'Tri zvjezdice!':next===2?'Dvije zvjezdice!':'Zvjezdica!',next===3?'Sutra opet — ti si sjajna!':next===2?'Sama si — super!':'Probala si — Zvonko je sretan!','star');
      else if(next===0)celebrate('U redu!','Možeš opet zaraditi ★ kad budeš spremna.','soft');
      render(true);return;
    }
    const weekBtn=e.target.closest('.week-pick');if(weekBtn){state.activeWeek=Number(weekBtn.dataset.homeWeek);save();render(true);return;}
    const dayBtn=e.target.closest('.day-pick');if(dayBtn){const w=dayBtn.dataset.weekDay,d=dayBtn.dataset.day;state.days[w]=Number(d);save();render(true);return;}
    const melPick=e.target.closest('[data-melody-pick]');
    if(melPick){
      const mk=melPick.dataset.melodyMission;const id=melPick.dataset.melodyPick;
      let slots=melodySlots(mk);
      if(slots.length>=4)slots=[];
      if(slots.length<4){slots.push(id);state.melodyPicks[mk]=slots;save();render(true);}
      return;
    }
    const melReset=e.target.closest('[data-melody-reset]');
    if(melReset){delete state.melodyPicks[melReset.dataset.melodyReset];save();render(true);return;}
    const explain=e.target.closest('[data-explain]');if(explain){stopSong();window.GuitarSongUI.explain(explain);return;}
    const b=e.target.closest('[data-play-song]');if(b)playSong(b.dataset.playSong);if(e.target.closest('#stop-song'))stopSong();
  });
  content.addEventListener('input',e=>{if(e.target.dataset.guitarName!==undefined){state.guitarName=e.target.value;save();updateChrome();return;}const k=e.target.dataset.note;if(k){state.notes[k]=e.target.value;save()}});
  content.addEventListener('change',e=>{
    if(e.target.id==='song-position'){positionShift=Number(e.target.value);render(true);return;}
    if(e.target.id==='song-tempo'){songTempo=Number(e.target.value);stopSong();return;}
    if(e.target.dataset.skill!==undefined){
      const i=e.target.dataset.skill;const v=state.skills[i]||(state.skills[i]={});const chosen=e.target.value;const date=v.date||today();
      if(chosen==='drugi-dan'&&(!v.firstDate||date<=v.firstDate)){
        e.target.value=v.status||'';document.getElementById('save-status').textContent='Prvo odaberi „Sama mogu!”, pa sutra ponovi — onda ide najjača zvjezdica.';return;
      }
      v.status=chosen;v.date=date;if(chosen==='samostalno'&&!v.firstDate)v.firstDate=date;if(chosen==='')delete v.firstDate;save();render(true);
    }
    if(e.target.dataset.date!==undefined){const i=e.target.dataset.date;const v=state.skills[i]||(state.skills[i]={});v.date=e.target.value;if(v.status==='drugi-dan'&&(!v.firstDate||v.date<=v.firstDate))v.status='samostalno';save();render(true);}
  });
  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(!document.getElementById('zvonko-welcome')?.hidden){/* ne zatvaraj Esc — mora kliknuti Hajde */}
      else setNavOpen(false);
    }
  });
  window.addEventListener('afterprint',()=>{
    document.body.classList.remove('print-concert-only');
    document.querySelectorAll('.concert-invite[data-print-focus]').forEach(el=>el.removeAttribute('data-print-focus'));
  });
  window.addEventListener('hashchange',render);
  window.addEventListener('orientationchange',()=>setNavOpen(false),{passive:true});
  window.visualViewport?.addEventListener('resize',()=>{
    if(document.body.classList.contains('nav-open')&&window.visualViewport&&window.visualViewport.width>1280)setNavOpen(false);
  });
  render();
  setTimeout(maybeGreetZvonko,350);
})();
