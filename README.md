# Gitarska pustolovina - lokalna web aplikacija

Otvori `index.html` u Chromeu, Edgeu ili drugom suvremenom pregledniku.
Nisu potrebni instalacija, server ni internetska veza za osnovne materijale.

## Sadržaj

- Četiri tjedna: susret, šest kartica, sedam kućnih zadataka i zvučni primjeri.
- Pjesmica po tabulaturi, list napretka i vodič s vanjskim poveznicama.
- Gumb za ispis trenutačnog lista.
- Napredak, zadnji korak vježbe i bilješke spremaju se u lokalnu pohranu tog preglednika.
  Za trajnu kopiju ispiši list napretka. Spremanje ovisi o dopuštenjima preglednika.

## Datoteke i nadogradnja

Dječji ekran i PDF paket imaju odvojene izvore.

- `kid-copy.js`: Danas, igra, savjet za mamu/tatu, Zvonko na kartici i „Ako zapne”. Uređuje se ručno.
- `marija_app_cards.py`: naslov i koraci kartice. Nakon izmjene: `python build_webapp.py`.
- `content/misije.json`: kratki indeks učitanih kartica (generiran, ne uređuje se).
- `app.js`: navigacija, zvjezdice i teach crteži (`missionHero`).
- `data.js`: generirani tekst vodiča i kartica, bez crteža.
- `figures.js`: generirani SVG crteži paketa.
- `index.html`, `styles.css`, `ux.css`: okvir, izgled i prilagodbe za mobitel/tablet.
- `songs.js`, `song-ui.js`: melodije i listovi.
- `assets/audio`, `assets/illustrations`: zvuk i ilustracije.
- `output`: PDF paket. `output/sadrzaj.json` je izvor tog paketa, ne dječjeg ekrana.

Za prijenos kopiraj sve navedene datoteke i mape zajedno.
Ne premještaj samo `index.html`, jer koristi CSS, JavaScript i zvukove iz susjednih datoteka.

Izvor lekcija je `output/sadrzaj.json`. Skripta `build_webapp.py` iz njega
i prethodnog HTML-a izrađuje `data.js` i kopira zvučne primjere.
Crteže gitare i sjedenja preuzima iz `assets/illustrations`, tako da se nove ilustracije zadržavaju pri ponovnoj izradi.
`build_package.py` ostaje izvor za generiranje prethodnog paketa.

`verify_webapp.cjs` provjerava rad preko `file://`, sve tjedne i kartice,
brze poveznice, zvuk, spremanje napretka i prikaz na malom zaslonu.
Koristi Playwright iz ovog Codex okruženja; sama aplikacija nema tu ovisnost.

Izbornik „Pjesmice” otvara samo jednu pjesmicu na ekranu.
Bratec Martin ostaje cijeli u dva reda s tekstom ispod tonova.
Oda radosti ima proširenu glavnu temu od 30 tonova, uz Blistaj, blistaj,
zvjezdice te početne dijelove Radujte se, narodi, Tihe noći i Zvončića.
Klik na prag, žicu, trajanje, slog, taktnu crtu ili druge oznake otvara
modal s hrvatskim objašnjenjem i slikom za dijete. Radi i tipkovnicom;
Escape zatvara modal.
Izbor „Dva praga više” pomiče sve tonove za dva polutona, uključujući
prazne žice. Slušanje preko Web Audio API-ja prati označavanje tonova;
to su sintetizirani primjeri bez prepoznavanja zvuka mikrofonom.
Gumb za ispis ispisuje odabranu pjesmicu bez zaglavlja preglednika.
`verify_songs.cjs` provjerava melodiju, ritam, tekst, transpoziciju,
slušanje, zasebne stranice, uklonjene pjesme i jedanaest vrsta objašnjenja.

## Navigacija na mobitelu i tabletu

Početak uvijek otvara kartu sva četiri tjedna. Posljednja vježba ima zaseban,
jasno označen prečac. Na vježbi se prikazuju putanja, izbor tjedna i svih sedam
dana s oznakom „Ovdje si”. Dane koji koriste istu karticu razlikuje završetak
rute `/dan-N`; izravne stare poveznice na kartice i dalje rade.
Korak se pamti zasebno za svaki dan, i kad dva dana koriste istu karticu.
Dodatne kartice koje nisu u dnevnom rasporedu označene su kao dodatne vježbe.
Povijest preglednika čuva položaj skrolanja; povratak iz štimanja vraća na
prethodni ekran. Koraci vježbi ostaju u postojećem localStorage zapisu.
Header ima gumb Izbornik lijevo, samo ime gitare u sredini i gumb Prečaci desno.
Izbornik otvara sve glavne stranice na svim veličinama ekrana. Nema donje
navigacije ni footera. Prečaci otvaraju okomiti panel iznad sadržaja bez
pomicanja vježbe: Početak, Štimanje i pomoćne radnje za trenutačni ekran.
Panel se zatvara istim gumbom, križićem, dodirom izvan njega, tipkom Escape
ili izborom radnje. Promjena koraka čuva postojeći audio player.

## Jasniji dječji prikaz

Na mobitelu je karta dana zatvorena u „Dani i tjedni”, a putanja ostaje vidljiva.
Uputa dolazi prije gumba Dalje. Ponavljanje nudi izbor odmah, a slaganje melodije
traži četiri zvuka prije nastavka. `kid-copy.js` sadrži kratke prikazne korake;
izvorne generirane kartice ostaju u `data.js`. Treći dan četvrtog tjedna ima
zasebne korake, sliku i zvuk prijelaza kraj A → početak B.

`dayPractice` bilježi pokušaj po danu odvojeno od zvjezdica za karticu. Dva dana
koja koriste istu karticu zato ne preuzimaju oznaku pokušaja jedan od drugoga.
Zvjezdice su u jednom redu: ★ Probala sam, ★★ Mogu sama, ★★★ Znam napamet.
Gumb Završi na zadnjem koraku otvara modal za zvjezdice. Odabir se odmah sprema,
zatim se nude Sljedeća vježba i Ostani ovdje. Ponovno otvaranje pamti odabir i
dopušta promjenu. U samoj kartici nema završnog bloka sa zvjezdicama i navigacijom.
Ponavljanje bez zvjezdica istim modalom bilježi pokušaj i nudi nastavak.
Za treću zvjezdicu dijete pokaže cijelu vježbu bez pomoći i gledanja u upute;
oznaku bira dijete uz pomoć odrasle osobe, bez automatske provjere sviranja.
Pomoć za čitanje otvara se u dijalogu. Povratak iz pjesmice/zvukova pamti rutu,
korak i skrolanje izvorne vježbe u sessionStorage (`mare-support-return`).

Pjesmica `bratec-vjezba` prikazuje isti A i B kao lekcije, u četiri kratka reda.
Izvorni puni zapis `bratec` ostaje dostupan kao druga verzija za kasnije.
`bratec-prijelaz` je skriven iz kataloga i služi zvučnom primjeru prijelaza.
Oznake žica ostaju vidljive uz pomicanje dugog zapisa; osnovna legenda je otvorena.

## Vizualni stil

`design.css` je završni sloj izgleda za ekran, nakon `styles.css` i `ux.css`.
Ujednačava tipografiju, kartice, gumbe, navigaciju i dijaloge. Tjedni imaju
četiri blage boje, glavna radnja je ružičasta, a uputa za vježbu svijetložuta.
Pravila su ograničena na `@media screen` kako bi ispis zadržao postojeći raspored.

## Prijelazi između koraka

Uputa i prikaz čine jednu cjelinu: od 700 px su u dva stupca, na užem ekranu
slijede jedan ispod drugoga. Kontrole ostaju pri dnu vidnog polja. Prostor za
uputu i sliku rezerviran je prema najdužem koraku pri trenutačnoj širini ekrana.
Natrag i Dalje mijenjaju sadržaj bez pomicanja stranice dok je uputa vidljiva.
Ako je izvan vidnog polja, vraća se blagim pomicanjem ispod stalne putanje;
Završi otvara modal bez pomicanja vježbe. Zvuk se pri promjeni koraka ne učitava ponovno.
Izbori za ponavljanje i kontrole melodije zadržavaju svoje mjesto kroz korake.
Prva vježba mijenja
prikaz sjedenja u prikaz žica kada zadatak traži dodir najtanje žice, a cijela
legenda položaja dostupna je pod „Pogledaj cijeli položaj”.

## Praćenje ritma uz zvuk

U vježbama s četiri zvuka i sa zvukom/tišinom strelica iznad kruga i obrub
pokazuju trenutačni korak. Prate vrijeme WAV snimke, uključujući dva uvodna
otkucaja i pauze između tri ponavljanja. Pauziranje zadržava oznaku, premotavanje
je odmah usklađuje, a kraj snimke je uklanja. Oznake su unutar crteža i ne mijenjaju
visinu ekrana. Završavanje vježbe zaustavlja zvuk kao i prije.

Savjeti za roditelje na karticama vježbi otvaraju se u modalu s nazivom vježbe.
Gumbi „Za mamu ili tatu” i „Ako zapne” dijele jedan red, uključujući ekran od
320 px. Zatvaranje modala vraća fokus na izvorni gumb bez pomicanja stranice;
pomoć „Ako zapne” ostaje kratki savjet ispod tog reda.

Na ekranima od 1000 px sidebar je stalno vidljiv uz sadržaj. Na užim ekranima
ostaje zatvoreni izbornik koji otvara gumb u headeru. Promjena širine automatski
usklađuje vidljivost i dostupnost tipkovnicom, bez prekrivanja desktop sadržaja.

Na desktopu gumb izbornika u headeru može potpuno sakriti ili ponovno prikazati
sidebar. Skrivanje uklanja i rezervirani prostor; izbor se pamti na uređaju.
Na užim ekranima isti gumb otvara puni izbornik preko sadržaja.

## Shared hosting

Pokreni `python build_hosting.py` za izradu `dist/mare-guitar-app-public.zip`.
ZIP sadrži samo aplikaciju, ilustracije, zvukove i materijale za ispis.
Raspakiraj sadržaj izravno u javnu mapu hostinga (`public_html`, `public` ili
odabranu podmapu): `index.html` treba biti na toj razini, uz `assets` i `output`.
Nije potreban build na serveru, Node, PHP ni pravilo za preusmjeravanje ruta.
Skripta provjerava integritet arhive i jednakost svih datoteka s izvornicima.

Javna domena: https://mare.aplikacija.com.hr/
ZIP uključuje `.htaccess` za Apache/LiteSpeed: HTTP i drugi nazivi domene
preusmjeravaju se statusom 301 na ovu HTTPS domenu, uz očuvanje putanje i upita.
Na hostingu najprije aktiviraj valjani SSL certifikat za `mare.aplikacija.com.hr`.
Pravilo ne izdaje certifikat; hosting mora podržavati `.htaccess` i `mod_rewrite`.
Ako se HTTPS završava na zasebnom proxyju, provjeri hostingovu konfiguraciju
HTTPS-a prije primjene pravila kako bi se izbjeglo ponavljano preusmjeravanje.

## PWA i puni ekran

U sidebaru su jedan kraj drugog „Dodaj aplikaciju” i „Puni ekran”. Manifest i
ikone omogućuju instalaciju s HTTPS domene; kad preglednik ne ponudi svoj
instalacijski prozor, gumb prikazuje upute za dodavanje na početni zaslon.
Fullscreen se pokreće korisničkim klikom, a isti gumb služi za izlazak.

Service worker preuzima osnovnu aplikaciju, sve slike i zvukove. Poruka ispod
gumba potvrđuje da je preuzimanje dovršeno. PDF i dugi HTML spremaju se nakon
prvog otvaranja. Vanjske poveznice i vanjski fontovi nisu dio offline paketa.
Napredak ostaje u lokalnoj pohrani, bez sinkronizacije između uređaja.
`python build_hosting.py` osvježava `cache-list.js` s novom verzijom sadržaja
te uključuje manifest, ikone, `pwa.js`, `sw.js` i popis u hosting ZIP.
