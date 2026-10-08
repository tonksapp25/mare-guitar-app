/* Dječji tekst koji se uređuje ručno. Kartice (naslov i koraci) su u marija_app_cards.py. */
window.KID_COPY=(()=>{
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
  return {dailyKid,missionTips,stuckTips};
})();
