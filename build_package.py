from pathlib import Path
import html, json, math, wave, struct, io
from marija_app_cards import apply_marija_app_data
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'output'
PDFDIR = OUT / 'pdf'
AUD = OUT / 'audio'
for d in (OUT, PDFDIR, AUD): d.mkdir(parents=True, exist_ok=True)
FONT = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Arial', str(FONT / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('Arial-Bold', str(FONT / 'arialbd.ttf')))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold', italic='Arial', boldItalic='Arial-Bold')
INK='#173941'; TEAL='#147d83'; GOLD='#edbd59'; MUTED='#557077'; PALE='#eaf5f3'
W,H=A4
PAGES=[]
def p(s): return ('p',s)
def h(s): return ('h',s)
def note(s): return ('note',s)
def table(headers,rows,widths=None): return ('table',headers,rows,widths)
def fig(kind,data=None): return ('fig',kind,data)
def page(title,kicker,blocks):
    PAGES.append(dict(title=title,kicker=kicker,blocks=blocks))

page('Moja prva gitarska pustolovina','PRVI MJESEC • VODIČ ZA ODRASLU OSOBU',[
    p('Za dijete od 8 godina • klasična gitara 3/4 • četiri susreta po 60 minuta • 15-20 minuta dnevnog istraživanja.'),
    fig('guitar'),
    h('Mali cilj, stvarna glazba'),
    p('Na kraju mjeseca dijete svira početni motiv pjesmice „Bratec Martin” po tabulaturi, održava jednostavan puls i može objasniti što znače žica, prag i oznaka 0.'),
    note('Najprije čujemo, zatim ponovimo, pa upoznamo znak. Čist i opušten zvuk važniji je od brzine.'),
    h('Kako koristiti paket'),
    p('Odrasla osoba najprije pročita vodič. Dijete koristi kartice svojeg tjedna, tabulaturu i zvučne primjere. Kartice se mogu izrezati po iscrtanoj sredini stranice.'),
    p('U HTML izdanju zvučni primjeri rade bez interneta. PDF je namijenjen ispisu; poveznice na vanjske izvore ostaju klikabilne. Datumi napretka upisuju se ručno.'),
    p('Izdanje 1.0 • 7. listopada 2026. • Program nadograđujemo prema onome što dijete može ponoviti drugi dan.')])

page('Priprema prije prvog susreta','VODIČ • POLOŽAJ I ZVUK',[
    h('Dogovor odrasle osobe i djeteta'),
    p('„Danas tražimo nekoliko lijepih zvukova. Pogrešan zvuk govori nam što možemo pokušati drukčije.” Pitajte što dijete pamti s violine, ali ništa ne ispitujte unaprijed.'),
    h('Udobna gitara'),
    p('Stabilna stolica bez naslona za ruke; stopala oslonjena. Za uobičajeni desnoruki položaj tijelo klasične gitare podupire lijeva noga, uz prikladan oslonac ili podnožak. Vrat je blago podignut. Gitara mora ostati stabilna bez stiskanja lijevom rukom. Odrasla osoba prilagodi položaj djetetu; ne podižemo rame da dohvatimo vrat.'),
    p('Ako dijete već koristi lijevoruku gitaru, prilagodite strane tijela i crteže; brojevi žica i pragova ostaju isti. Uobičajeni desnoruki instrument ne preokrećemo bez provjere rasporeda žica.'),
    h('Jednostavan početni pokret'),
    p('Desni kažiprst nježno zahvati jednu žicu i pusti je prema dlanu. Može se nakon pokreta osloniti na susjednu deblju žicu. Bez trzalice i bez snažnog povlačenja. Prvi tjedan lijeva ruka ne pritišće tonove. Poslije možemo polako izmjenjivati kažiprst i srednji prst desne ruke, tek kada jedan pokret postane siguran.'),
    h('Prije kućne vježbe'),
    p('Odrasla osoba ugodi gitaru u standardnoj ugodbi i provjeri početni položaj. Od najtanje prema najdebljoj žici: E4, B3, G3, D3, A2, E2. B je međunarodna oznaka; u hrvatskom nazivlju isti se ton često piše H. Dijete zasad ne mora pamtiti nazive.'),
    note('Ako se pojavi bol ili ruka postane napeta, prekinite sviranje, odmorite i ponovno namjestite položaj. Dulje vrijeme uz glazbu može uključivati pjevanje i slušanje.')])

page('Broj žice, prag i prst','VODIČ • TRI RAZLIČITE STVARI',[
    p('Recite: „Žica je put. Prag nam govori na kojem dijelu puta stavimo prst. Prst je ono čime pritisnemo.”'),
    fig('neck'),
    table(['Oznaka','Što znači','Primjer'],[
        ['Žica','Koju žicu sviramo','1. je najtanja; 2. je odmah uz nju.'],
        ['Broj u tabulaturi','Na kojem pragu pritisnemo','0 = bez pritiska; 1 = prvi; 3 = treći prag.'],
        ['Naziv prsta','Čime pritisnemo','Kažiprst na prvom, prstenjak na trećem pragu.']],[75,160,264]),
    h('Prag kao metalna granica'),
    p('Za prvi prag stavimo jagodicu između početka vrata i prve metalne prečke, blizu te prečke s njezine strane prema glavi gitare. Za treći između druge i treće prečke, blizu treće. Ne pritišćemo samu metalnu prečku.'),
    h('Dogovoreni prstomet ovog mjeseca'),
    p('Lijevi kažiprst pritišće prvi prag, lijevi prstenjak treći. Palac lagano podupire stražnju stranu vrata; ne stišćemo cijelu šaku. Ako je treći prag zahtjevan, vježbamo jedan ton, otpustimo ruku, pa postavimo drugi. Ne tražimo da prsti stalno ostanu razmaknuti.'),
    note('Na dječjim tabulaturama nema brojeva prstiju: svi brojevi na crtama označavaju isključivo pragove. Upute za prste uvijek su napisane riječima.')])

page('Susret 1: upoznajem gitaru','TJEDAN 1 • PRAZNE ŽICE',[
    table(['Vrijeme','Aktivnost i riječi odrasle osobe'],[
        ['0-5 min','Ugodite gitaru. „Kako želiš nazvati svoju gitaru?” Provjerite oslonac i ramena.'],
        ['5-15 min','Početna igra slušanja umjesto ponavljanja. Odsvirajte duboku pa visoku žicu. „Koja zvuči kao medvjed, a koja kao ptičica?”'],
        ['15-25 min','Pokažite jedan nježan trzaj na prvoj žici. „Dodirni, pusti, slušaj.” Dijete svira jedan zvuk, zatim ga zaustavi laganim dodirom.'],
        ['25-30 min','Gitara na sigurno mjesto. Ustanite, protresite šake i prohodajte četiri ravnomjerna koraka.'],
        ['30-45 min','Semafor: zeleno sviraj, crveno zaustavi. Zatim „Gitara odgovara”: dva zvuka, pa četiri. Pređite na drugu žicu.'],
        ['45-55 min','Zajedno: odrasla osoba tiho broji četiri otkucaja, dijete svira praznu prvu žicu jednom po otkucaju. Zamijenite uloge.'],
        ['55-60 min','Provjera kartice 1.6. Pokažite dnevni redoslijed kartica. Pohvala: „Danas si pronašao/la žicu bez moje pomoći.”']],[65,434]),
    h('Teorija u jednoj rečenici'),
    p('„Puls je ravnomjeran glazbeni korak. Zvuk može biti visok ili dubok, a svaki od njih može biti tih ili glasan.” Dokažite tihim visokim i glasnijim visokim tonom.'),
    h('Kućni fokus'),
    p('Prva i druga prazna žica; pojedinačan zvuk, kontrolirano zaustavljanje i četiri ravnomjerna otkucaja. Za pjesmicu ovog tjedna pjevušimo i plješćemo, bez pritisnutih tonova.'),
    note('Uspjeh: četiri pojedinačna zvuka u ravnomjernom pulsu nakon četiri uvodna otkucaja; prepoznavanje prve i druge žice. Ponoviti drugi dan.')])

page('Susret 2: prvi pritisnuti tonovi','TJEDAN 2 • PRAGOVI 0, 1 I 3',[
    table(['Vrijeme','Aktivnost i riječi odrasle osobe'],[
        ['0-5 min','Ugađanje i položaj. Pitajte: „Što ti je ovaj tjedan najbolje zvučalo?”'],
        ['5-15 min','Ponovite prazne žice i četiri otkucaja. Dijete vodi semafor. Ako je jedna žica nesigurna, ponovite je prije novog gradiva.'],
        ['15-25 min','Prva žica: 0 pa 1. Lijevi kažiprst postavite blizu prve prečke. „Pritisni samo toliko da zvuk postane čist.” Nakon uspjeha probajte zaseban ton na trećem pragu.'],
        ['25-30 min','Odmor, protresanje ruku, pljeskanje ravnomjernog pulsa.'],
        ['30-45 min','„Prst traži kućicu”: pokažite 0, 1 ili 3. Dijete pronalazi položaj. Zatim druga žica: 1 pa 3, uz potpuno otpuštanje između pokušaja.'],
        ['45-55 min','Svirajte zajedno niz na prvoj žici 0-1-3-1. Najprije bez tempa, zatim jedan ton po sporom otkucaju.'],
        ['55-60 min','Dijete objašnjava 0 i pokazuje prvi prag. Zadajte samo položaje koji su danas bili izvedivi.']],[65,434]),
    h('Teorija u jednoj rečenici'),
    p('„Tabulatura je karta: crta govori koju žicu sviramo, a broj gdje pritisnemo. Nula kaže da žica svira slobodno.” Pokažite pojednostavljenu kartu dviju žica, pa šest crta na listu pjesmice.'),
    h('Kućni fokus'),
    p('Prva žica 0-1-3-1; druga žica 1-3-1. Svaki niz najviše tri mirna ponavljanja, zatim druga aktivnost. Ista polja koristimo i u pjesmici sljedećeg tjedna.'),
    note('Uspjeh: kratak niz pročitan uz najviše jedan podsjetnik. Za status „samostalno” cijeli niz treba proći bez verbalne ili fizičke pomoći.')])

page('Susret 3: prepoznajem svoju pjesmicu','TJEDAN 3 • BRATEC MARTIN',[
    table(['Vrijeme','Aktivnost i riječi odrasle osobe'],[
        ['0-5 min','Ugađanje, položaj, kratko pitanje što dijete želi ponoviti.'],
        ['5-15 min','Ponovite 0, 1 i 3. Pokažite jednu oznaku, dijete odsvira. Vježbajte prijelaz druga žica → prva prazna žica.'],
        ['15-25 min','Otpjevajte početak „Bratec Martin”. Ako ga dijete ne poznaje, najprije ga naučite po sluhu. Pokažite dio A: druga žica 1, druga 3, prva 0, druga 1.'],
        ['25-30 min','Odmor uz pjevanje i hodanje u pulsu.'],
        ['30-45 min','Dio A razlomite na dva para tonova. Povežite i ponovite. Zatim dio B: prva žica 0, 1, 3; završni ton traje dva otkucaja.'],
        ['45-55 min','Odrasla osoba svira dio A, dijete odgovara. Za dio B brojite „1, 2, 3, 4”, uz zvukove na 1, 2 i 3, a na 4 zadržite treći zvuk.'],
        ['55-60 min','Dijete odsvira jedan dio bez pomoći. Zabilježite dio koji treba ponavljanje; ne uvodite ostatak pjesme.']],[65,434]),
    h('Teorija u jednoj rečenici'),
    p('„Melodija je redoslijed zvukova koji možemo otpjevati. Kad se isti mali dio vrati, čujemo ponavljanje.” Dijete pronađe dva jednaka dijela na listu.'),
    h('Kućni fokus'),
    p('Najprije dio A, zatim dio B. Redoslijed je A-A-B-B. Sviramo samo početni motiv, a ne cijelu pjesmicu. Početna brzina zvučnog primjera je 60 otkucaja u minuti; dijete smije raditi sporije, bez metronoma.'),
    note('Uspjeh: dio A i dio B izvedeni odvojeno uz ravnomjeran puls. Ako spajanje prekida puls, odrasla osoba uspori i zadrži rad u manjim dijelovima.')])

page('Susret 4: moj mali koncert','TJEDAN 4 • POVEZIVANJE I PROVJERA',[
    table(['Vrijeme','Aktivnost i riječi odrasle osobe'],[
        ['0-5 min','Ugodite gitaru. „Danas pokazujemo što već možeš.” Koncert može biti samo za jednu odraslu osobu.'],
        ['5-15 min','Ponovite najslabiji dio iz bilješke trećeg tjedna. Počnite od uspješne, poznate vježbe.'],
        ['15-25 min','Nova vještina je povezivanje A-A-B-B. Najprije samo spoj zadnjeg tona A i prvog tona B, pa cijeli motiv.'],
        ['25-30 min','Pauza, pokret i tiho pjevanje motiva.'],
        ['30-45 min','„Moja četiri zvuka”: dijete izabere četiri poznata položaja i odsvira vlastitu melodiju. Može izabrati i jedan duži zvuk.'],
        ['45-55 min','Zajedničko sviranje. Odrasla osoba tiho tapka puls ili dodaje jednostavnu pratnju koja prati melodiju; ne prekriva dječji zvuk.'],
        ['55-60 min','Jedna izvedba bez ekrana i bez pomaganja. Zapišite status svake vještine i dogovorite ponovnu provjeru drugi dan.']],[65,434]),
    h('Teorija u jednoj rečenici'),
    p('„Ritam govori kada i koliko dugo nešto svira. Melodija govori koji zvukovi idu jedan za drugim.” Otplješćite ritam pjesmice, pa je otpjevajte.'),
    h('Brzina kao izbor, ne natjecanje'),
    p('Ako je motiv čist i opušten u dva uzastopna pokušaja, probajte malo brže, npr. sa 60 na 65 otkucaja u minuti. Ako se zvuk ili puls raspadne, vratite se. Brža izvedba nije uvjet završetka mjeseca.'),
    note('Uspjeh: samostalan početni motiv, prepoznatljiv redoslijed A-A-B-B, održan puls i duži G u dijelu B. Ponovno samostalno izvođenje drugi dan potvrđuje naučeno.')])

daily=[
 [('Udobno','1.1: sjedi udobno i dotakni prvu žicu.'),('Koraci','1.2: pljesak pa četiri zvuka na prvoj žici.'),('Tišina','1.3: zvuk pa tišina.'),('Žice','1.4: prva i druga žica.'),('Zapjevaj','1.5: pjevaj i plješći.'),('Pokaži','1.6: četiri zvuka — sama, pa naklon.'),('Ponovi','1.7: ponovi omiljenu misiju.')],
 [('Prst','2.1: kažiprst blizu prve prečke.'),('Korak','2.2: na svaki pljesak — prazna prva žica.'),('Niz','2.3: 0-1-3-1 polako.'),('Karta','2.4: značenje 0, 1 i 3.'),('Druga','2.5: druga žica 1-3-1.'),('Pokaži','2.6: pročitaj i odsviraj niz.'),('Ponovi','2.7: ponovi omiljenu misiju.')],
 [('Pripremi','3.1: ramena miruju, prvi prag druge žice.'),('Mali most','3.3: druga žica 3, pa prva prazna.'),('Pjevaj','3.4: echo A i B; Pjesmice ili list.'),('Dio B','3.2: B na gitari — 0-1-3; zadnji ton traje.'),('Dio A','3.5: pjevaj Bratec Martin — dio A.'),('Pokaži','3.6: mali koncert — sama A, zatim sama B.'),('Ponovi','3.7: ponovi omiljenu misiju.')],
 [('Pripremi','4.1: ugodi gitaru i list pjesmice.'),('Spoji','4.2: poveži A pa A.'),('Most','4.3: vježbaj spoj A pa B.'),('Motiv','4.3: sviraj A-A-B-B.'),('Zajedno','4.4: mama/tata tapka, Marija A-A-B-B.'),('Koncert','4.6: mali koncert bez ekrana.'),('Ponovi','4.7: ponovi omiljenu misiju.')]
]
page('Dnevni put kroz mjesec','VODIČ • 28 KRATKIH VJEŽBI',[
    p('Dan 1 svakog tjedna počinje nakon vođenog susreta. Na dan susreta kućna vježba nije obvezna. Plan nije utrka: nesiguran zadatak ponavljamo, a kasnije zadatke pomičemo.'),
    table(['Dan','Tjedan 1','Tjedan 2','Tjedan 3','Tjedan 4'],[[str(i+1)]+[daily[t][i][0]+': '+daily[t][i][1] for t in range(4)] for i in range(7)],[29,117,117,118,118]),
    h('Isti mali raspored svaki dan'),
    p('2 min položaj i provjera odrasle osobe → 4 min poznata vježba → 5 min današnji zadatak → 4 min pjesmica ili igra → do 5 min slobodnog istraživanja. Broj ponavljanja smanjite čim se javi umor.'),
    note('Ako dijete želi još: slušajte primjer, pjevajte, nacrtajte gitaru ili osmislite ritam. Nakon kratkog sviranja odmorite ruke. Ni jedan dan nije „izgubljen” ako je trebalo odmoriti.')])

page('Kad nešto zapne','VODIČ • POMOĆ I PROVJERA',[
    table(['Što čujemo ili vidimo','Što napraviti'],[
        ['Zvuk zuji','Najprije pomaknite jagodicu bliže odgovarajućoj prečki; zatim dodajte samo malo pritiska. Jedan ton, ne cijeli niz.'],
        ['Zvuk je prigušen','Provjerite dodiruje li drugi prst istu žicu i je li jagodica postavljena jasno. Otpustite pa namjestite ponovno.'],
        ['Sviraju dvije žice','Smanjite desni pokret. Dijete prije trzaja dotakne ciljanu žicu i tek je zatim pusti.'],
        ['Rame se podiže, šaka steže','Zaustavite vježbu. Ponovno namjestite oslonac, kut vrata i palac. Ne tražite jači stisak.'],
        ['Puls staje na prijelazu','Vježbajte samo dva tona oko prijelaza, bez pulsa. Zatim sporije spojite; odrasla osoba tiho broji.'],
        ['Treći prag teško ide','Svirajte tonove odvojeno uz potpuno otpuštanje između njih. Nema prisilnog istezanja ni brzih ponavljanja.'],
        ['Aplikacija kaže pogrešno','Isključite zvučni primjer, provjerite ugodbu i svirajte samo jednu žicu u mirnoj prostoriji. Ako je zvuk dobar, nastavite bez aplikacije.']],[155,344]),
    h('Tri statusa napretka'),
    p('<b>Uz pomoć:</b> treba pokazivanje, podsjetnik ili fizičko namještanje. <b>Samostalno:</b> nakon opće upute izvodi bez pomoći. <b>Ponovljeno drugi dan:</b> ponovno samostalno izvodi na drugom datumu. Samo posljednji status potvrđuje stabilno naučeno.'),
    h('Što pohvaliti'),
    p('„Danas si sam/a pronašao/la drugu žicu.” „Čuo/la si da zvuk nije čist i ponovno si namjestio/la prst.” „Zadržao/la si zadnji zvuk dva koraka.”'),
    note('U završnoj provjeri odrasla osoba ugodi instrument i zada opću uputu, ali tijekom izvedbe ne pokazuje polja niti broji svaki ton. Dijete može koristiti tiskanu tabulaturu.')])

SOURCES=[
 ('Tuner - Pitched! / Android','https://play.google.com/store/apps/details?id=com.stonekick.tuner','Kromatski ugađač; osnovno izdanje s oglasima i kupnjama u aplikaciji.'),
 ('Pitched / službene upute','https://stonekick.com/tuner_guide.html','Upute za kromatski način i očitanje tona.'),
 ('Simply Guitar / besplatan sadržaj','https://guitar-help.hellosimply.com/en/articles/5849114-what-can-i-access-for-free-in-simply-guitar','Besplatan je prvi dio Guitar Basics I; nastavak i pjesme traže pretplatu.'),
 ('Simply Guitar / Android','https://play.google.com/store/apps/details?id=com.joytunes.simplyguitar','Opcionalno isprobavanje s odraslom osobom.'),
 ('Poduka Gitare / hrvatski izvor','https://podukagitare.com/','Izvor hrvatskih poduka za kasniji odabir; nije dječji redoslijed ovog paketa.'),
 ('JustinGuitar / čitanje TAB-a','https://www.justinguitar.com/guitar-lessons/how-to-read-guitar-tab-b1-405','Engleska pomoć odrasloj osobi; nije samostalna hrvatska lekcija za dijete.')]
page('Android kao mali pomoćnik','VODIČ • APLIKACIJE I ZVUČNI PRIMJERI',[
    h('Prvi izbor: kratka provjera tona'),
    p('Tuner - Pitched! je kromatski ugađač za Android s osnovnim izdanjem, oglasima i kupnjama unutar aplikacije. U ovom programu koristimo ga samo za očitanje tona. Nije igra koja ocjenjuje cijelu pjesmu ni položaj prstiju.'),
    p('Odrasla osoba pripremi kromatski način (Chromatic), standardni referentni ton A = 440 Hz ako postoji ta postavka, te provjeri prvu praznu žicu E. Dijete svira jednu žicu i promatra oznaku. Odrasla osoba upravlja ugađanjem; dijete ne okreće mehanike zbog jednog nestabilnog očitanja.'),
    table(['Tjedan','Igra do 5 minuta','Bez aplikacije'],[
        ['1','Prva prazna žica pokaže E, druga B (H).','Odrasla osoba svira uzor, dijete pronađe istu žicu.'],
        ['2','Prva žica: 0 → E, 1 → F, 3 → G.','Kartica polja: odrasla osoba pokaže, dijete odsvira.'],
        ['3','Druga žica 1 → C, 3 → D; prva 0 → E.','Usporedba sa zvučnim primjerom, ton po ton.'],
        ['4','Provjeri samo jedan nesiguran ton, zatim ugasi ekran.','Zajednička izvedba i završna provjera.']],[45,225,229]),
    p('Pri prvom korištenju odrasla osoba testira tri poznata tona. Ako oznake odgovaraju i nema potrebe za kupnjom, koristimo zadatak. Ako ne rade ili su zaključani, nastavljamo s karticama. Očitanje blizu sredine služi kao pomoć, a ne kao dječja ocjena.'),
    h('Simply Guitar samo kao opcionalna proba'),
    p('Službena pomoć navodi da je besplatan prvi dio Guitar Basics I, usmjeren na prve akorde. Ne uvodimo akorde samo radi aplikacije. Ako nema odgovarajućeg otključanog zadatka, preskačemo je; plan ne traži aktivaciju probne pretplate.'),
    note('Zvučne datoteke u paketu su sintetizirani tonski primjeri, nisu snimka gitare. Služe za melodiju i puls; položaj i kvalitetu gitarskog zvuka pokazuje odrasla osoba.')])

page('Prisjećanje bez dugog gledanja','VODIČ • TJEDNI IZVORI',[
    p('Za svaku temu dijete dobiva hrvatsku karticu i demonstraciju odrasle osobe. Nije potvrđen kratak hrvatski video koji točno prati svaku vježbu ovog programa; zato ne zadajemo duge ili složenije YouTube lekcije kao dječju obvezu.'),
    table(['Tjedan','Potpuna pomoć za dijete'],[
        ['1','Kartice 1.1-1.7 + zvučni primjer četiri otkucaja. Odrasla osoba pokaže dodir, trzaj i zaustavljanje.'],
        ['2','Kartice 2.1-2.7 + crtež pragova i tonski niz 0-1-3-1. Odrasla osoba pokaže prst blizu prečke.'],
        ['3','Kartice 3.1-3.6 + tabulatura i odvojeni zvučni primjeri A i B.'],
        ['4','Kartice 4.1-4.7 + cijeli motiv i list provjere.']],[55,444]),
    h('Provjereni izvori za odraslu osobu'),
    *[p(f'<a href="{url}" color="{TEAL}"><b>{html.escape(title)}</b></a><br/>{html.escape(desc)}') for title,url,desc in SOURCES],
    p('Poveznice i navedena ograničenja pregledani 7. listopada 2026. Aplikacije nisu isprobane na vašem uređaju; provjeru mikrofona odrasla osoba provodi pri prvom korištenju.')])

# A card has one task, at most three numbered instructions, and one large diagram.
CARDS=[]
def card(week,num,title,kind,data,steps):
    assert len(steps)<=3
    CARDS.append(dict(week=week,num=num,title=title,kind=kind,data=data,steps=steps))
card(1,1,'Moje udobno mjesto','posture',None,['Osloni stopala i namjesti gitaru s odraslom osobom.','Opusti ramena i šake.','Dotakni najtanju žicu.'])
card(1,2,'Četiri glazbena koraka','rhythm',[1,1,1,1],['Poslušaj četiri ravnomjerna otkucaja.','Ponovi ih pljeskanjem.','Ponovi ih na praznoj prvoj žici.'])
card(1,3,'Zvuk pa tišina','rhythm',[1,0,1,0],['Nježno odsviraj praznu prvu žicu.','Zaustavi zvuk laganim dodirom žice.','Ponovi: zvuk, tišina, zvuk, tišina.'])
card(1,4,'Pronađi dvije žice','strings',None,['Pronađi najtanju, prvu žicu.','Pronađi drugu žicu odmah uz nju.','Odsviraj svaku zasebno.'])
card(1,5,'Pjesmica u mojim rukama','rhythm',[1,1,1,1],['Poslušaj odraslu osobu kako pjeva početak „Bratec Martin”.','Pjevaj ili pjevuši isti dio.','Plješći ravnomjerne glazbene korake.'])
card(1,6,'Pokaži svoja četiri zvuka','rhythm',[1,1,1,1],['Sam/a pronađi prvu pa drugu žicu.','Na prvoj odsviraj četiri ravnomjerna zvuka.','Na kraju zaustavi zvuk.'])
card(2,1,'Prst blizu granice','neck',{'dots':[(1,1)]},['Postavi kažiprst blizu prve metalne prečke.','Pritisni samo toliko da zvuk bude čist.','Otpusti i odmori šaku.'])
card(2,2,'Zvuk prati korak','rhythm',[1,1,1,1],['Četiri puta pljesni ravnomjerno.','Na svaki novi korak odsviraj praznu prvu žicu.','Poslušaj ostaju li koraci ravnomjerni.'])
card(2,3,'Tri mjesta na prvoj žici','tab',[(1,0,1),(1,1,1),(1,3,1),(1,1,1)],['Na prvoj žici odsviraj 0, 1, 3, 1.','Za prvi prag koristi kažiprst, za treći prstenjak.','Kreni polako; između pokušaja opusti ruku.'])
card(2,4,'Pročitaj kartu','tab',[(1,0,1),(1,1,1),(1,3,1)],['Pokaži crtu prve žice.','Reci: 0 bez pritiska, 1 prvi prag, 3 treći prag.','Odaberi jednu oznaku i odsviraj je.'])
card(2,5,'Priprema druge žice','tab',[(2,1,1),(2,3,1),(2,1,1)],['Na drugoj žici pronađi prvi prag.','Polako prijeđi na treći pa se vrati na prvi.','Otpusti šaku između ponavljanja.'])
card(2,6,'Sam/a čitam i sviram','tab',[(1,0,1),(1,1,1),(1,3,1),(1,1,1)],['Pogledaj crtu i brojeve.','Sam/a odsviraj niz na prvoj žici.','Objasni odrasloj osobi što znači 0.'])
A=[(2,1,1),(2,3,1),(1,0,1),(2,1,1)]
B=[(1,0,1),(1,1,1),(1,3,2)]
FULL=A+A+B+B
card(3,1,'Ramena miruju','posture',None,['Namjesti gitaru kao na prvom susretu.','Pronađi prvi prag druge žice.','Prije zvuka provjeri jesu li ramena opuštena.'])
card(3,2,'Bratec Martin: dio B','tab',B,['Na prvoj žici odsviraj 0, 1, 3.','Broji četiri ravnomjerna koraka.','Na četvrtom ne trzaj: zadnji zvuk još traje.'])
card(3,3,'Most između žica','tab',[(2,3,1),(1,0,1)],['Odsviraj treći prag druge žice.','Zatim odsviraj praznu prvu žicu.','Ponovi taj mali most polako.'])
card(3,4,'Pronađi ponavljanje','repeat',None,['Otpjevaj dio A i ponovi ga.','Otpjevaj dio B i ponovi ga.','Na listu tabulature pokaži gdje se A ponavlja, pa gdje se B.'])
card(3,5,'Bratec Martin: dio A','tab',A,['Otpjevaj prvi dio pjesmice.','Sviraj: druga 1, druga 3, prva 0, druga 1.','Ponovi isti dio.'])
card(3,6,'Moj mali koncert','repeat',None,['Sam/a odsviraj dio A prema listu.','Sam/a odsviraj dio B prema listu.','Zadrži zadnji zvuk B dva koraka.'])
card(4,1,'Pripremam svoj koncert','posture',None,['Odrasla osoba ugodi gitaru.','Namjesti gitaru i opusti ramena.','Pripremi tiskani list pjesmice.'])
card(4,2,'Spoji dva dijela A','tab',A+A,['Odsviraj dio A.','Bez žurbe prijeđi u drugi A.','Na prijelazu nastavi isti puls.'])
card(4,3,'Moj mali motiv','repeat',None,['Pogledaj cijeli list tabulature.','Odsviraj A, A, B, B.','U svakom B zadnji zvuk traje dva koraka.'])
card(4,4,'Sviramo u istom koraku','rhythm',[1,1,1,1],['Odrasla osoba tiho tapka ravnomjerno.','Odsviraj motiv A-A-B-B uz taj puls.','Ako zapne, probajte sporije.'])
card(4,5,'Moja četiri zvuka','blank',None,['Izaberi četiri poznata mjesta na žicama.','Zapiši ili nacrtaj njihov redoslijed.','Odsviraj svoju melodiju.'])
card(4,6,'Pokaži što si naučio/la','repeat',None,['Bez ekrana odsviraj motiv prema tiskanom listu.','Objasni jednu oznaku na listu.','Ponovi drugi dan i upiši uspjeh s odraslom osobom.'])
_marija = apply_marija_app_data({'cards': [dict(c) for c in CARDS], 'daily': daily})
CARDS = _marija['cards']
daily = _marija['daily']
assert len(CARDS) == 28
PDF_CARD_STEPS={(4,5):[
    'U četiri okvira upiši ili nacrtaj četiri poznata mjesta (žica i prag).',
    'Redom ih odsviraj — to je tvoja melodija.',
    'Možeš dodati jedan duži zvuk na kraju.',
]}
for i in range(0, len(CARDS), 2):
    a,b=CARDS[i:i+2]
    page(f'Kartice {a["week"]}.{a["num"]} i {b["week"]}.{b["num"]}',f'TJEDAN {a["week"]} • ZA DIJETE',[('cards',[a,b])])

page('Bratec Martin: moja karta','PJESMICA • POČETNI MOTIV',[
    p('Sviramo početni motiv A-A-B-B, ne cijelu pjesmicu. Najprije ga poslušaj i otpjevaj. Zatim prati crte slijeva nadesno.'),
    note('Gornja crta tabulature = 1. žica, najtanja. Sljedeća = 2. žica. U stvarnom položaju najtanja je bliže podu. Ostale žice u ovoj pjesmici ne sviramo.'),
    h('Dio A • četiri zvuka, četiri koraka'),fig('tab',A),
    p('Druga žica: prvi prag → treći prag → prva prazna žica → druga žica, prvi prag. Odsviraj dio A dvaput.'),
    h('Dio B • tri zvuka, četiri koraka'),fig('tab',B),
    p('Prva žica: 0 → 1 → 3. Na koracima 1, 2 i 3 nastaje novi zvuk. Na koraku 4 zadnji zvuk još traje; ne trzaj ponovno. Odsviraj dio B dvaput.'),
    h('Kako stavljam prste'),
    p('Brojevi na crtama su pragovi. 0: bez lijevog prsta. Prvi prag: lijevi kažiprst. Treći prag: lijevi prstenjak. Nema brojeva prstiju na crtama.')])

page('Cijeli početni motiv','PJESMICA • A + A + B + B',[
    h('Dva puta A'), fig('tab',A+A),
    h('Dva puta B'), fig('tab',B+B),
    p('Svaki dio traje četiri ravnomjerna koraka. Motiv ima 14 odsviranih tonova i ukupno 16 otkucaja. Dva završna tona G traju po dva otkucaja.'),
    h('Sviraj uz zvučni primjer'),
    p('U HTML izdanju poslušaj dio A, dio B ili cijeli motiv. Primjeri imaju četiri uvodna otkucaja i brzinu 60 otkucaja u minuti. Najprije slušaj; ne moraš odmah stići svirati zajedno.'),
    note('Za odraslu osobu: standardna ugodba. A = C4-D4-E4-C4; B = E4-F4-G4, trajanja 1-1-2. Prstomet i visine provjereni prema prvoj E4 i drugoj B3 žici.'),
    h('Moja glazbena ideja'),
    fig('blank'),
    p('U svaki okvir nacrtaj ili napiši žicu i prag za jedan svoj zvuk. Odrasla osoba može zapisati ono što pokažeš.')])

SKILLS=[
 ('1','Namješta gitaru i svira s opuštenim ramenima.'),
 ('1','Pronalazi prvu i drugu žicu bez pokazivanja.'),
 ('1','Svira četiri odvojena zvuka u ravnomjernom pulsu i staje.'),
 ('2','Razlikuje broj žice od broja praga; objašnjava 0.'),
 ('2','Dobiva čist pojedinačan zvuk na prvom i trećem pragu.'),
 ('2','Čita i svira niz 0-1-3-1 na prvoj žici.'),
 ('3','Izvodi dio A bez pomoći.'),
 ('3','Izvodi dio B i zadržava zadnji zvuk dva otkucaja.'),
 ('4','Povezuje A-A-B-B uz ravnomjeran puls.'),
 ('4','Pokazuje ritam pljeskanjem i melodiju pjevanjem.'),
 ('4','Stvara vlastiti niz od četiri poznata zvuka.')]
page('Moj list napretka','ISPIS • DATUMI I MALI DOKAZI',[
    p('Ime: ____________________________   Početak: __________________'),
    p('U stupce upišite datum kada je vještina pokazana. U posljednjem stupcu obvezno drugi datum. Prazno polje znači „još nismo provjerili”, a ne neuspjeh.'),
    table(['Tj.','Što pokazujem','Uz pomoć\ndatum','Samostalno\ndatum','Drugi dan\ndatum'],[[t,s,'________','________','________'] for t,s in SKILLS],[25,240,77,79,78]),
    h('Bilješke nakon susreta'),
    p('1. susret: _____________________________________________________<br/>____________________________________________________________'),
    p('2. susret: _____________________________________________________<br/>____________________________________________________________'),
    p('3. susret: _____________________________________________________<br/>____________________________________________________________'),
    p('4. susret: _____________________________________________________<br/>____________________________________________________________')])

page('Što smo naučili i što slijedi','ISPIS • ZAVRŠNA PROVJERA',[
    p('Ime: ____________________________   Datum: __________________'),
    h('Mali koncert bez ekrana'),
    p('Odrasla osoba ugodi gitaru. Dijete koristi tiskanu tabulaturu. Uputa: „Namjesti gitaru, odsviraj četiri ravnomjerna zvuka, objasni jednu oznaku i odsviraj naš motiv.” Tijekom izvedbe odrasla osoba ne pokazuje polja.'),
    table(['Provjera','Dokaz / kratka bilješka'],[
        ['Položaj i čist zvuk','________________________________________________'],
        ['Puls i trajanje zadnjeg tona','________________________________________________'],
        ['Čitanje oznaka žice i praga','________________________________________________'],
        ['Motiv A-A-B-B','________________________________________________'],
        ['Ponovljeno drugi dan, datum','________________________________________________']],[170,329]),
    h('Mogu samostalno'),p('____________________________________________________________<br/>____________________________________________________________'),
    h('Još mi treba pomoć'),p('____________________________________________________________<br/>____________________________________________________________'),
    h('Moj sljedeći mali korak'),p('____________________________________________________________<br/>____________________________________________________________'),
    note('Za drugi mjesec prvo ponavljamo nestabilnu vještinu. Ako je motiv stabilan, biramo novu kratku melodiju u poznatim poljima, zatim postupno dodajemo jednu novu žicu ili položaj. Novi sadržaj ne određujemo samo prema proteklom vremenu.')])

def draw_fig(c,kind,data,x,y,w,height):
    # coordinates local, y is bottom; all drawings fit their bounding boxes
    c.saveState(); c.translate(x,y)
    c.setStrokeColor(HexColor(INK)); c.setFillColor(HexColor(INK)); c.setLineWidth(1.3)
    def text(t,x,y,size=11,color=INK):
        c.setFillColor(HexColor(color));c.setFont('Arial',size);c.drawString(x,y,t)
    if kind in ('neck','strings'):
        left=70;right=w-20;top=height-35;bottom=32
        gap=(top-bottom)/5
        c.setFillColor(HexColor(PALE));c.rect(left,bottom-8,right-left,top-bottom+16,fill=1,stroke=0)
        step=(right-left)/3
        for j in range(4):
            xx=left+j*step;c.setLineWidth(3 if j==0 else 1.1);c.line(xx,bottom-8,xx,top+8)
            if j: text(f'{j}. prag',left+(j-1)*step+10,top+19,11)
        for s in range(1,7):
            yy=top-(s-1)*gap;c.setLineWidth(.7+(s-1)*.18);c.line(left,yy,right,yy);text(f'{s}. žica',3,yy-4,10)
        text('glava',left-15,5,9);text('prema tijelu gitare →',right-128,5,9)
        dots=(data or {}).get('dots',[]) if kind=='neck' else []
        for s,f in dots:
            xx=left+f*step-12;yy=top-(s-1)*gap;c.setFillColor(HexColor(TEAL));c.circle(xx,yy,8,fill=1,stroke=0)
    elif kind=='tab':
        seq=data or A; total=sum(n[2] for n in seq);left=70;right=w-18
        top=height-33;gap=min(19,(height-65)/5);cursor=0
        for s in range(1,7):
            yy=top-(s-1)*gap;c.setStrokeColor(HexColor(MUTED));c.line(left,yy,right,yy);text(f'{s}. žica',3,yy-4,10)
        for s,f,d in seq:
            xx=left+(cursor+.5)*(right-left)/total;yy=top-(s-1)*gap
            c.setFillColor(white);c.rect(xx-8,yy-9,16,18,fill=1,stroke=0)
            text(str(f),xx-4,yy-5,14,TEAL)
            text(str((cursor%4)+1),xx-3,top+18,10,MUTED)
            if d==2:
                xx2=left+(cursor+1.5)*(right-left)/total;text('drž',xx2-8,yy-5,10,TEAL);text(str(((cursor+1)%4)+1),xx2-3,top+18,10,MUTED)
            cursor+=d
        for beat in range(4,total,4):
            xx=left+beat*(right-left)/total;c.setLineWidth(1.6);c.line(xx,top+8,xx,top-5*gap-8)
        text('brojanje iznad crta • brojevi na crtama = pragovi',left,4,10)
    elif kind=='rhythm':
        vals=data or [1,1,1,1];cx=w/5; cy=height*.52
        for i,v in enumerate(vals):
            xx=cx*(i+1);c.setFillColor(HexColor(TEAL if v else PALE));c.circle(xx,cy,24,fill=1,stroke=1)
            text('zvuk' if v else 'tišina',xx-15,cy-4,10,'#ffffff' if v else INK)
            text(str(i+1),xx-4,cy-47,14)
        text('Jednaki razmaci = ravnomjerni glazbeni koraci.',15,8,11)
    elif kind=='repeat':
        for i,label in enumerate(['A','A','B','B']):
            xx=20+i*(w-40)/4;c.setFillColor(HexColor(PALE if i<2 else '#fff2d4'));c.roundRect(xx,35,(w-60)/4,65,10,fill=1,stroke=0);text(label,xx+35,57,30)
        text('Isti mali dio možemo ponoviti.',20,10,12)
    elif kind=='review':
        c.setFillColor(HexColor(PALE));c.roundRect(w*.12,28,w*.76,height-50,14,fill=1,stroke=0)
        text('Ponovi omiljeno',w*.22,height*.58,22,TEAL)
        text('Izaberi misiju iz ovog tjedna i sviraj je još jednom.',w*.14,18,11)
    elif kind=='blank':
        for i in range(4):
            xx=10+i*(w-20)/4;c.setStrokeColor(HexColor(TEAL));c.roundRect(xx,24,(w-45)/4,height-45,9,fill=0,stroke=1);text(f'zvuk {i+1}',xx+9,height-38,11)
    elif kind=='posture':
        # stylized seated person, feet supported, rising neck
        cx=w*.40; c.setFillColor(HexColor(PALE));c.roundRect(10,10,w-20,height-20,12,fill=1,stroke=0)
        c.setStrokeColor(HexColor(INK));c.setLineWidth(3)
        c.circle(cx,height-35,13,fill=0,stroke=1);c.line(cx,height-48,cx,70);c.line(cx,70,cx+47,70);c.line(cx+47,70,cx+47,25);c.line(cx,70,cx-24,25);c.line(cx-24,25,cx-4,25);c.line(cx+47,25,cx+67,25)
        c.line(cx-20,63,cx+43,63);c.line(cx-20,63,cx-20,20)
        c.setFillColor(HexColor(GOLD));c.ellipse(cx+3,69,cx+65,112,fill=1,stroke=1);c.line(cx+53,99,cx+106,127)
        text('ramena opuštena',w*.64,height-30,11);text('stopala oslonjena',w*.64,28,11)
    else:
        # guitar illustration
        cx=w*.43;c.setFillColor(HexColor('#fff2d4'));c.ellipse(cx-58,15,cx+58,118,fill=1,stroke=1);c.ellipse(cx-43,77,cx+43,151,fill=1,stroke=1)
        c.setFillColor(HexColor(PALE));c.rect(cx-12,130,24,height-153,fill=1,stroke=1);c.roundRect(cx-18,height-30,36,28,4,fill=1,stroke=1)
        c.setFillColor(HexColor(INK));c.circle(cx,108,18,fill=1,stroke=0)
        c.setStrokeColor(HexColor(MUTED))
        for i in range(6):c.line(cx-8+i*3,45,cx-8+i*3,height-8)
        for yy in range(140,int(height)-30,12):c.line(cx-12,yy,cx+12,yy)
        text('tijelo',cx+78,65,14);text('žice',cx+78,110,14);text('vrat i pragovi',cx+55,175,14)
    c.restoreState()

def svg_fig(kind,data=None):
    # SVG exported through a small recording canvas to share diagrams across formats
    class SvgCanvas:
        def __init__(self):self.parts=[];self.stroke=INK;self.fill=INK;self.lw=1;self.fs=12
        def saveState(self):pass
        def restoreState(self):pass
        def translate(self,x,y):pass
        def setStrokeColor(self,v):self.stroke=v.hexval().replace('0x','#')
        def setFillColor(self,v):self.fill=v.hexval().replace('0x','#')
        def setLineWidth(self,v):self.lw=v
        def setFont(self,n,s):self.fs=s
        def line(self,x1,y1,x2,y2):self.parts.append(f'<line x1="{x1}" y1="{180-y1}" x2="{x2}" y2="{180-y2}" stroke="{self.stroke}" stroke-width="{self.lw}"/>')
        def rect(self,x,y,w,h,fill=0,stroke=1):self.roundRect(x,y,w,h,0,fill,stroke)
        def roundRect(self,x,y,w,h,r,fill=0,stroke=1):self.parts.append(f'<rect x="{x}" y="{180-y-h}" width="{w}" height="{h}" rx="{r}" fill="{self.fill if fill else "none"}" stroke="{self.stroke if stroke else "none"}" stroke-width="{self.lw}"/>')
        def circle(self,x,y,r,fill=0,stroke=1):self.parts.append(f'<circle cx="{x}" cy="{180-y}" r="{r}" fill="{self.fill if fill else "none"}" stroke="{self.stroke if stroke else "none"}" stroke-width="{self.lw}"/>')
        def ellipse(self,x1,y1,x2,y2,fill=0,stroke=1):self.parts.append(f'<ellipse cx="{(x1+x2)/2}" cy="{180-(y1+y2)/2}" rx="{(x2-x1)/2}" ry="{(y2-y1)/2}" fill="{self.fill if fill else "none"}" stroke="{self.stroke if stroke else "none"}" stroke-width="{self.lw}"/>')
        def drawString(self,x,y,t):self.parts.append(f'<text x="{x}" y="{180-y}" fill="{self.fill}" font-size="{self.fs}" font-family="Arial,sans-serif">{html.escape(t)}</text>')
    rec=SvgCanvas();draw_fig(rec,kind,data,0,0,499,180)
    return '<svg role="img" aria-label="'+html.escape(kind)+'" viewBox="0 0 499 180" xmlns="http://www.w3.org/2000/svg">'+''.join(rec.parts)+'</svg>'

STYLE=ParagraphStyle('body',fontName='Arial',fontSize=10.6,leading=15,textColor=HexColor(INK),spaceAfter=8)
CELL=ParagraphStyle('cell',parent=STYLE,fontSize=9.2,leading=12.4,spaceAfter=0)
HEAD=ParagraphStyle('head',parent=STYLE,fontName='Arial-Bold',fontSize=14,leading=18,spaceAfter=6)
TITLE=ParagraphStyle('title',parent=HEAD,fontSize=24,leading=29)
CARDSTYLE=ParagraphStyle('card',parent=STYLE,fontSize=13,leading=18)
overflow=[]
def para(c,txt,x,y,width,style=STYLE):
    par=Paragraph(txt,style);ww,hh=par.wrap(width,700);par.drawOn(c,x,y-hh);return y-hh-8
def build_pdf():
    path=PDFDIR/'gitarska_pustolovina_prvi_mjesec.pdf';c=canvas.Canvas(str(path),pagesize=A4)
    c.setTitle('Moja prva gitarska pustolovina - prvi mjesec');c.setAuthor('Priprema za Marijinu gitaru')
    for idx,pg in enumerate(PAGES):
        c.bookmarkPage(f'p{idx+1}');c.addOutlineEntry(pg['title'],f'p{idx+1}',level=0)
        c.setFillColor(HexColor(TEAL));c.rect(0,H-15,W,15,fill=1,stroke=0)
        c.setFont('Arial-Bold',9);c.drawString(48,H-45,pg['kicker'])
        y=para(c,pg['title'],48,H-65,499,TITLE)-10
        for block in pg['blocks']:
            tag=block[0]
            if tag in ('p','h'):y=para(c,block[1],48,y,499,HEAD if tag=='h' else STYLE)
            elif tag=='note':
                par=Paragraph(block[1],STYLE);_,hh=par.wrap(475,700)
                c.setFillColor(HexColor(PALE));c.roundRect(48,y-hh-18,499,hh+18,6,fill=1,stroke=0)
                par.drawOn(c,60,y-hh-8);y-=hh+30
            elif tag=='fig':
                ht=220 if block[1]=='guitar' else (125 if idx==26 else 150) if block[1]=='tab' else 170 if block[1] in ('neck','strings') else (90 if idx==26 and block[1]=='blank' else 130)
                draw_fig(c,block[1],block[2],48,y-ht,499,ht);y-=ht+14
            elif tag=='table':
                headers,rows,widths=block[1:];widths=widths or [499/len(headers)]*len(headers)
                cells=[[Paragraph(html.escape(str(v)).replace('\n','<br/>'),CELL) for v in row] for row in [headers]+rows]
                t=Table(cells,colWidths=widths,hAlign='LEFT')
                t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor(PALE)),('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),.4,HexColor('#c8d9d9')),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
                _,hh=t.wrap(499,700);t.drawOn(c,48,y-hh);y-=hh+15
            elif tag=='cards':
                for j,ca in enumerate(block[1]):
                    top=H-137-j*332;bottom=top-314
                    c.setStrokeColor(HexColor('#c8d9d9'));c.setFillColor(white);c.roundRect(42,bottom,511,314,10,fill=1,stroke=1)
                    c.setFillColor(HexColor(TEAL));c.setFont('Arial-Bold',11);c.drawString(59,top-23,f'KARTICA {ca["week"]}.{ca["num"]}')
                    yy=para(c,ca['title'],59,top-36,475,HEAD)
                    draw_fig(c,ca['kind'],ca['data'],59,yy-143,475,143)
                    yy-=151
                    card_steps=PDF_CARD_STEPS.get((ca['week'],ca['num']),ca['steps'])
                    for n,step in enumerate(card_steps):yy=para(c,f'{n+1}. {html.escape(step)}',59,yy,475,CARDSTYLE)+3
                    if yy<bottom+9:overflow.append((idx+1,ca['title'],round(yy-bottom,1)))
                    c.setFont('Arial',8);c.setFillColor(HexColor(MUTED))
                    foot='Jedan zadatak po korak. Možeš ponoviti drugi dan.'
                    if ca['week']==4 and ca['num']==5:
                        foot='Za mama/tata: u aplikaciji Marija bira zvukove na ekranu; na ispisu upisuje u okvire.'
                    c.drawString(59,bottom+10,foot)
                c.setDash(3,3);c.line(42,H-137-323,553,H-137-323);c.setDash()
                y=60
        if y<48:overflow.append((idx+1,pg['title'],round(y,1)))
        c.setFont('Arial',8);c.setFillColor(HexColor(MUTED));c.drawString(48,25,'GITARSKA PUSTOLOVINA • 1. MJESEC • HRVATSKI');c.drawRightString(W-48,25,f'{idx+1} / {len(PAGES)}')
        c.showPage()
    c.save();return path

def tone(freq,duration,sr=22050):
    samples=[]
    for i in range(int(duration*sr)):
        t=i/sr;env=min(1,t/.012)*math.exp(-2.0*t/max(duration,.1));fade=min(1,max(0,(duration-t)/.04))
        val=(math.sin(2*math.pi*freq*t)+.25*math.sin(4*math.pi*freq*t))*.36*env*fade
        samples.append(val)
    return samples
def make_audio(name,seq):
    sr=22050;beat=1.;buf=[]
    def click():return tone(880,.075,sr)+[0.]*(sr-int(.075*sr))
    for i in range(4):buf.extend(click())
    for s,f,d in seq:
        freq=(329.6275569 if s==1 else 246.9416506)*2**(f/12)
        buf.extend(tone(freq,d*beat,sr))
    buf.extend([0.]*int(.3*sr))
    with wave.open(str(AUD/name),'wb') as wav:
        wav.setparams((1,2,sr,0,'NONE','not compressed'));wav.writeframes(b''.join(struct.pack('<h',int(max(-1,min(1,v))*26000)) for v in buf))
    return round(len(buf)/sr,2)
AUDIO=[('01_cetiri_otkucaja.wav',[(1,0,1)]*4,'Četiri zvuka u pulsu'),('02_prva_zica_0_1_3_1.wav',[(1,0,1),(1,1,1),(1,3,1),(1,1,1)],'Prva žica: 0, 1, 3, 1'),('03_bratec_martin_dio_A.wav',A,'Bratec Martin: dio A'),('04_bratec_martin_dio_B.wav',B,'Bratec Martin: dio B'),('05_bratec_martin_motiv.wav',FULL,'Bratec Martin: cijeli motiv')]
durations={name:make_audio(name,seq) for name,seq,_ in AUDIO}

def html_block(b):
    tag=b[0]
    if tag=='p':return '<p>'+b[1]+'</p>'
    if tag=='h':return '<h3>'+html.escape(b[1])+'</h3>'
    if tag=='note':return '<aside>'+b[1]+'</aside>'
    if tag=='fig':return '<figure>'+svg_fig(b[1],b[2])+'</figure>'
    if tag=='table':return '<div class="tablewrap"><table><thead><tr>'+''.join('<th>'+html.escape(str(v)).replace('\n','<br>')+'</th>' for v in b[1])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+html.escape(str(v)).replace('\n','<br>')+'</td>' for v in row)+'</tr>' for row in b[2])+'</tbody></table></div>'
    if tag=='cards':return '<div class="cards">'+''.join('<article class="card"><div class="label">KARTICA '+str(ca['week'])+'.'+str(ca['num'])+'</div><h3>'+html.escape(ca['title'])+'</h3>'+svg_fig(ca['kind'],ca['data'])+'<ol>'+''.join('<li>'+html.escape(t)+'</li>' for t in ca['steps'])+'</ol></article>' for ca in b[1])+'</div>'
    return ''
CSS='''
:root{--ink:#173941;--teal:#147d83;--pale:#eaf5f3}*{box-sizing:border-box}body{margin:0;background:#f2f6f5;color:var(--ink);font-family:Arial,sans-serif;line-height:1.55}header{background:var(--ink);color:white;padding:36px max(24px,calc((100vw - 980px)/2))}header p{max-width:750px}h1{font-size:clamp(28px,4vw,44px);line-height:1.15}nav{display:flex;gap:10px;flex-wrap:wrap}nav a,button{padding:10px 16px;border:0;border-radius:8px;background:var(--pale);color:var(--ink);text-decoration:none;font:inherit;cursor:pointer}main{max-width:980px;margin:auto;padding:22px}.page{padding:32px;background:white;border-radius:14px;margin:20px 0;box-shadow:0 4px 22px #17394108}.label{font-size:12px;font-weight:bold;letter-spacing:1px;color:var(--teal)}h2{font-size:29px;line-height:1.25}h3{font-size:20px;margin-bottom:8px}aside{background:var(--pale);padding:16px;border-left:4px solid var(--teal);border-radius:6px;margin:18px 0}a{color:var(--teal)}figure{margin:18px 0}svg{display:block;width:100%;max-height:250px}.tablewrap{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:14px}td,th{border:1px solid #c8d9d9;padding:10px;text-align:left;vertical-align:top}th{background:var(--pale)}.cards{display:grid;grid-template-columns:1fr;gap:22px}.card{border:2px solid #c8d9d9;border-radius:12px;padding:24px}.card h3{font-size:25px}.card li{font-size:19px;margin:8px 0}.sounds{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}.sound{background:var(--pale);padding:16px;border-radius:10px}.sound audio{width:100%}.contents{columns:2;font-size:14px}.contents a{display:block;padding:5px}footer{text-align:center;padding:24px;color:#557077}@media(max-width:600px){main{padding:10px}.page{padding:20px}td,th{padding:7px}.contents{columns:1}}@media print{body{background:white}header,nav,.audio-section,.contents,footer{display:none}.page{box-shadow:none;border-radius:0;break-after:page;padding:0}.card{break-inside:avoid}main{max-width:none;padding:0}a{color:var(--ink)}@page{size:A4;margin:15mm}}'''
contents=''.join(f'<a href="#p{i+1}">{i+1}. {html.escape(pg["title"])}</a>' for i,pg in enumerate(PAGES))
soundhtml=''.join(f'<div class="sound"><b>{label}</b><p>Četiri uvodna otkucaja • 60 otkucaja/min</p><audio controls preload="none" src="audio/{name}"></audio></div>' for name,seq,label in AUDIO)
sections=''.join(f'<section class="page" id="p{i+1}"><div class="label">{html.escape(pg["kicker"])}</div><h2>{html.escape(pg["title"])}</h2>'+''.join(html_block(b) for b in pg['blocks'])+'</section>' for i,pg in enumerate(PAGES))
doc='<!doctype html><html lang="hr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Moja prva gitarska pustolovina</title><style>'+CSS+'</style></head><body><header><div class="label" style="color:#edbd59">PRVI MJESEC • 8 GODINA • HRVATSKI</div><h1>Moja prva gitarska pustolovina</h1><p>Mali koraci, poznata pjesmica i jasni dokazi da smo nešto naučili.</p><nav><a href="#p4">Susreti</a><a href="#p12">Dječje kartice</a><a href="#p26">Tabulatura</a><a href="#zvuk">Poslušaj</a><a href="pdf/gitarska_pustolovina_prvi_mjesec.pdf">PDF za ispis</a><button onclick="window.print()">Ispiši HTML</button></nav></header><main><section class="page"><h2>Pronađi svoj zadatak</h2><div class="contents">'+contents+'</div></section><section class="page audio-section" id="zvuk"><h2>Poslušaj i ponovi</h2><p>Sintetizirani tonski primjeri za melodiju i puls. Nisu snimka gitare. Prvo slušaj, zatim sviraj u manjim dijelovima. Za pravilni položaj pogledaj karticu i odraslu osobu.</p><div class="sounds">'+soundhtml+'</div></section>'+sections+'</main><footer>Izdanje 1.0 • 7. listopada 2026. • Radi bez interneta, osim vanjskih poveznica.</footer></body></html>'
(OUT/'gitarska_pustolovina.html').write_text(doc,encoding='utf-8')
pdf=build_pdf()
(OUT/'sadrzaj.json').write_text(json.dumps({'pages':PAGES,'cards':CARDS,'daily':daily,'sources':SOURCES,'audio_durations':durations},ensure_ascii=False,indent=2),encoding='utf-8')
reader=PdfReader(pdf)
assert len(reader.pages)==len(PAGES)
text='\n'.join(pg.extract_text() or '' for pg in reader.pages)
for needle in ['Bratec Martin','Uz pomoć','Ponovljeno drugi dan','KARTICA 4.6','KARTICA 4.7','KARTICA 1.1']:
    assert needle in text,needle
assert len(FULL)==14 and sum(d for _,_,d in FULL)==16
actual=[round((329.6275569 if s==1 else 246.9416506)*2**(f/12),1) for s,f,d in FULL]
expected=[261.6,293.7,329.6,261.6]*2+[329.6,349.2,392.0]*2
assert actual==expected,(actual,expected)
report={'pages':len(PAGES),'cards':len(CARDS),'overflow':overflow,'melody_frequencies_hz':actual,'audio_durations_seconds':durations,'pdf_links':sum(len(pg.get('/Annots',[])) for pg in reader.pages)}
(OUT/'provjera.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
if overflow:raise RuntimeError('Layout overflow: '+str(overflow))
