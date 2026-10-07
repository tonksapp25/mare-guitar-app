# Gitarska pustolovina - lokalna web aplikacija

Otvori `index.html` u Chromeu, Edgeu ili drugom suvremenom pregledniku.
Nisu potrebni instalacija, server ni internetska veza za osnovne materijale.

## Sadržaj

- Četiri tjedna: susret, šest kartica, sedam kućnih zadataka i zvučni primjeri.
- Pjesmica po tabulaturi, list napretka i vodič s vanjskim poveznicama.
- Gumb za ispis trenutačnog lista.
- Napredak i bilješke spremaju se u lokalnu pohranu tog preglednika.
  Za trajnu kopiju ispiši list napretka. Spremanje ovisi o dopuštenjima preglednika.

## Datoteke i nadogradnja

- `index.html`: okvir aplikacije.
- `styles.css`: izgled, prilagodba malim zaslonima i ispis.
- `app.js`: navigacija i lokalni napredak.
- `data.js`: sadržaj i SVG crteži, učitani bez mrežnih zahtjeva.
- `songs.js`: melodije za pojedinačne listove, uključujući božićne početne motive.
- `song-ui.js`: izbornik pjesmica, interaktivne tabulature i slikovna objašnjenja.
- `assets/audio`: pet lokalnih WAV primjera.
- `assets/illustrations`: jasni SVG prikazi dijelova gitare i desnorukog položaja sjedenja; brojevi na slici odgovaraju objašnjenjima uz sliku.
- `output`: prethodni HTML i PDF paket, povezan iz aplikacije.

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
