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

Strelice Natrag/Naprijed prate posjećene ekrane u ovoj kartici preglednika
i vraćaju položaj skrolanja. Povijest ekrana čuva se u sessionStorage,
a koraci vježbi i posljednja otvorena misija u postojećem localStorage zapisu.
Kružni prečaci stoje uz sadržaj na širokom ekranu i iznad njega na mobitelu;
gitara uvijek otvara štimanje. Promjena koraka čuva postojeći audio player.

Donja navigacija na mobitelu i tabletu: Danas, Pjesmice i Zvjezdice.
Na ekranu širem od 1280 px zamjenjuje je postojeći lijevi izbornik.
Štimanje je uvijek u kružnim prečacima; ostali krugovi prate trenutačnu vježbu.
