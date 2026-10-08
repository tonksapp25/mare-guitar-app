/* Own beginner arrangements of traditional/public-domain melodies.
   Tuple: [string, fret, duration in beats, lyric syllable].
   First two strings in standard tuning: E4, B3. */
window.GUITAR_SONGS = (() => {
  const n=(s,f,d=1,lyric='')=>[s,f,d,lyric];
  const a=[n(1,0,1,'Bra-'),n(1,2,1,'tec'),n(1,4,1,'Mar-'),n(1,0,1,'tin,')];
  const b=[n(1,4,1,'kaj'),n(1,5,1,'još'),n(1,7,2,'spiš?')];
  const c=[n(1,7,.5,'Već'),n(1,9,.5,'ti'),n(1,7,.5,'vu-'),n(1,5,.5,'ra'),n(1,4,1,'tu-'),n(1,0,1,'če,')];
  const d=[n(1,0,1,'bim,'),n(2,0,1,'bam,'),n(1,0,2,'bom.')];
  const lessonA=[n(2,1,1,'Bra-'),n(2,3,1,'tec'),n(1,0,1,'Mar-'),n(2,1,1,'tin,')];
  const lessonB=[n(1,0,1,'kaj'),n(1,1,1,'još'),n(1,3,2,'spiš?')];
  return [
    {id:'bratec-prijelaz',title:'Kraj A i početak B',tag:'DVA ZVUKA IZ LEKCIJA',hidden:true,rows:[[lessonA[3],lessonB[0]]],description:'Samo prijelaz koji vježbamo treći dan četvrtog tjedna.'},
    {id:'bratec-vjezba',title:'Bratec Martin · vježba iz lekcija',lesson:true,tag:'IZ LEKCIJA · PRAGOVI 0, 1 I 3',rowLabels:['Dio A','Ponovi dio A','Dio B','Ponovi dio B'],rows:[lessonA,lessonA,lessonB,lessonB],description:'To su isti dijelovi A i B koje učimo u trećem i četvrtom tjednu. Svaki dio sviramo dvaput. Ovo je početak pjesmice.'},
    {id:'bratec',title:'Bratec Martin',tag:'CIJELA PJESMICA · 2 ŽICE',rows:[[...a,...a,...b,...b],[...c,...c,...d,...d]],description:'Počinje praznom prvom žicom. Za „bam” prijeđi na praznu drugu. Više pragove pronalazi pomicanjem cijele ruke, bez rastezanja prstiju.'},
    {id:'radost',title:'Oda radosti',tag:'2 ŽICE · GLAVNA TEMA, 8 TAKTOVA',rows:[
      [n(1,0),n(1,0),n(1,1),n(1,3),n(1,3),n(1,1),n(1,0),n(2,3),n(2,1),n(2,1),n(2,3),n(1,0),n(1,0,1.5),n(2,3,.5),n(2,3,2)],
      [n(1,0),n(1,0),n(1,1),n(1,3),n(1,3),n(1,1),n(1,0),n(2,3),n(2,1),n(2,1),n(2,3),n(1,0),n(2,3,1.5),n(2,1,.5),n(2,1,2)]
    ],description:'Sviraj prvi red, pa drugi. Početak je isti, ali završetak drugog reda ide niže. Ovo je glavna tema, a ne cijela Beethovenova skladba.',source:'https://www.bethsnotesplus.com/2015/11/ode-to-joy.html'},
    {id:'zvjezdica',title:'Blistaj, blistaj, zvjezdice',original:'Twinkle, Twinkle, Little Star',tag:'2 ŽICE · POČETNE DVIJE FRAZE',rows:[[n(2,1),n(2,1),n(1,3),n(1,3),n(1,5),n(1,5),n(1,3,2),n(1,1),n(1,1),n(1,0),n(1,0),n(2,3),n(2,3),n(2,1,2)]],description:'Sviramo prve dvije fraze. Počni na drugoj žici, a zatim prijeđi na najtanju.',source:'https://www.bethsnotesplus.com/wp-content/uploads/2024/11/Twinkle-Twinkle-Little-Star.pdf'},
    {id:'radujte',title:'Radujte se, narodi',category:'bozic',tag:'1 ŽICA · POČETNE DVIJE PJEVANE LINIJE',rows:[
      [n(1,0,1,'Ra-'),n(1,4,1,'duj-'),n(1,7,1,'te'),n(1,7,1,'se,'),n(1,7,.5,'na-'),n(1,9,.5,''),n(1,7,.5,'ro-'),n(1,5,.5,''),n(1,4,2,'di,')],
      [n(1,5,1,'kad'),n(1,5,.5,'ču-'),n(1,4,.5,'je-'),n(1,2,1,'te'),n(1,7,1,''),n(1,4,4,'glas.')]
    ],description:'Hrvatska tradicijska božićna pjesma. Ovo je početak pjesme. Prazno mjesto ispod tona znači da isti slog još pjevamo.',source:'https://glazba.biskupija-varazdinska.hr/userdocsimages/skladbe/Radujte%20se%2C%20narodi.pdf'},
    {id:'tiha-noc',title:'Tiha noć',original:'Silent Night',category:'bozic',barBeats:3,tag:'1 ŽICA · POČETAK MELODIJE',rows:[
      [n(1,3,1.5),n(1,5,.5),n(1,3),n(1,0,3),n(1,3,1.5),n(1,5,.5),n(1,3),n(1,0,3)],
      [n(1,10,2),n(1,10),n(1,7,3),n(1,8,2),n(1,8),n(1,3,3)]
    ],description:'Samo početak melodije, bez teksta. Brojimo po tri koraka: 1, 2, 3. Za više pragove pomakni ruku; cijela pjesma dolazi kasnije.',source:'https://imslp.org/wiki/Stille_Nacht%2C_heilige_Nacht_(Gruber%2C_Franz_Xaver)'},
    {id:'zvoncici',title:'Zvončići',original:'Jingle Bells',category:'bozic',tag:'1 ŽICA · PRVI DIO REFRENA',rows:[
      [n(1,4),n(1,4),n(1,4,2),n(1,4),n(1,4),n(1,4,2)],
      [n(1,4),n(1,7),n(1,0,1.5),n(1,2,.5),n(1,4,4)]
    ],description:'Popularna božićna melodija. Sviramo prvi dio refrena, bez teksta. Za početak možeš ponavljati samo prvi red.',source:'https://imslp.org/wiki/The_One_Horse_Open_Sleigh_(Pierpont%2C_James)'}
  ];
})();
