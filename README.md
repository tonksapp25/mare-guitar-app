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
Kružni prečaci stoje uz sadržaj na širokom ekranu i iznad njega na mobitelu;
gitara uvijek otvara štimanje. Promjena koraka čuva postojeći audio player.

Donja navigacija na mobitelu i tabletu: Početak, Pjesmice i Zvjezdice.
Na ekranu širem od 1280 px zamjenjuje je postojeći lijevi izbornik.
Štimanje je uvijek u kružnim prečacima; ostali krugovi prate trenutačnu vježbu.

## Jasniji dječji prikaz

Na mobitelu je karta dana zatvorena u „Dani i tjedni”, a putanja ostaje vidljiva.
Uputa dolazi prije gumba Dalje. Ponavljanje nudi izbor odmah, a slaganje melodije
traži četiri zvuka prije nastavka. `kid-copy.js` sadrži kratke prikazne korake;
izvorne generirane kartice ostaju u `data.js`. Treći dan četvrtog tjedna ima
zasebne korake, sliku i zvuk prijelaza kraj A → početak B.

`dayPractice` bilježi pokušaj po danu odvojeno od zvjezdica za karticu. Dva dana
koja koriste istu karticu zato ne preuzimaju oznaku pokušaja jedan od drugoga.
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
slijede jedan ispod drugoga. Kontrole ostaju iznad donje navigacije. Prostor za
uputu i sliku rezerviran je prema najdužem koraku pri trenutačnoj širini ekrana.
Natrag i Dalje mijenjaju sadržaj bez pomicanja stranice dok je uputa vidljiva.
Ako je izvan vidnog polja, vraća se blagim pomicanjem ispod stalne putanje;
Završi vodi na oznaku pokušaja i zvjezdice. Zvuk se pritom ne učitava ponovno.
Izbori za ponavljanje i kontrole melodije zadržavaju svoje mjesto kroz korake.
Prva vježba mijenja
prikaz sjedenja u prikaz žica kada zadatak traži dodir najtanje žice, a cijela
legenda položaja dostupna je pod „Pogledaj cijeli položaj”.
