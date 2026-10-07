"""Marijina aplikacija: koraci misija (ti-forma) + kartice 1.7 i 2.7."""

from copy import deepcopy

# Koraci za dijete (max 3). Ključ: "tjedan-broj".
MARIJA_STEPS = {
    "1-1": [
        "Sjedi udobno s mamom ili tatom i namjestite gitaru.",
        "Opusti ramena i šake.",
        "Dotakni najtanju žicu.",
    ],
    "1-2": [
        "Poslušaj četiri ravnomjerna otkucaja.",
        "Ponovi ih pljeskanjem.",
        "Ponovi ih na praznoj prvoj žici.",
    ],
    "1-3": [
        "Nježno odsviraj praznu prvu žicu.",
        "Zaustavi zvuk laganim dodirom žice.",
        "Ponovi: zvuk, tišina, zvuk, tišina.",
    ],
    "1-4": [
        "Pronađi najtanju, prvu žicu.",
        "Pronađi drugu žicu odmah uz nju.",
        "Odsviraj svaku zasebno.",
    ],
    "1-5": [
        "Poslušaj kako mama ili tata pjevaju početak „Bratec Martin”.",
        "Pjevaj ili pjevuši isti dio.",
        "Plješći ravnomjerne glazbene korake.",
    ],
    "1-6": [
        "Sama pronađi prvu pa drugu žicu.",
        "Na prvoj odsviraj četiri ravnomjerna zvuka.",
        "Na kraju zaustavi zvuk.",
    ],
    "1-7": [
        "Izaberi misiju koja ti je najdraža iz ovog tjedna.",
        "Odsviraj je još jednom — polako.",
        "Reci mami ili tati što si ponovila.",
    ],
    "2-1": [
        "Postavi kažiprst blizu prve metalne prečke.",
        "Pritisni samo toliko da zvuk bude čist.",
        "Otpusti i odmori šaku.",
    ],
    "2-2": [
        "Četiri puta pljesni ravnomjerno.",
        "Na svaki novi korak odsviraj praznu prvu žicu.",
        "Poslušaj ostaju li koraci ravnomjerni.",
    ],
    "2-3": [
        "Na prvoj žici odsviraj 0, 1, 3, 1.",
        "Za prvi prag koristi kažiprst, za treći prstenjak.",
        "Kreni polako; između pokušaja opusti ruku.",
    ],
    "2-4": [
        "Pogledaj crtu prve žice.",
        "Reci: 0 bez pritiska, 1 prvi prag, 3 treći prag.",
        "Odaberi jednu oznaku i odsviraj je.",
    ],
    "2-5": [
        "Na drugoj žici pronađi prvi prag.",
        "Polako prijeđi na treći pa se vrati na prvi.",
        "Otpusti šaku između ponavljanja.",
    ],
    "2-6": [
        "Pogledaj crtu i brojeve.",
        "Sama odsviraj niz na prvoj žici.",
        "Objasni mami ili tati što znači 0.",
    ],
    "2-7": [
        "Izaberi misiju koja ti je najdraža iz ovog tjedna.",
        "Odsviraj je još jednom — polako.",
        "Reci mami ili tati što si ponovila.",
    ],
    "3-1": [
        "Namjesti gitaru kao na prvom susretu.",
        "Pronađi prvi prag druge žice.",
        "Prije zvuka provjeri jesu li ramena opuštena.",
    ],
    "3-2": [
        "Na prvoj žici odsviraj 0, 1, 3.",
        "Broji četiri ravnomjerna koraka.",
        "Na četvrtom ne trzaj: zadnji zvuk još traje.",
    ],
    "3-3": [
        "Odsviraj treći prag druge žice.",
        "Zatim odsviraj praznu prvu žicu.",
        "Ponovi taj mali most polako.",
    ],
    "3-4": [
        "Otpjevaj dio A i ponovi ga.",
        "Otpjevaj dio B i ponovi ga.",
        "Otvori Pjesmice (♪ u izborniku) ili tiskani list. Pokaži gdje se A ponavlja, pa gdje se B.",
    ],
    "3-5": [
        "Otpjevaj prvi dio pjesmice.",
        "Sviraj: druga 1, druga 3, prva 0, druga 1.",
        "Ponovi isti dio.",
    ],
    "3-6": [
        "Sama odsviraj dio A — kao u misiji 3.5.",
        "Zatim sama odsviraj dio B — kao u misiji 3.2.",
        "Na kraju se nakloni. Ako B još ne ide, danas je dovoljan samo A.",
    ],
    "4-1": [
        "Mama ili tata ugode gitaru.",
        "Namjesti gitaru i opusti ramena.",
        "Pripremi tiskani list pjesmice.",
    ],
    "4-2": [
        "Odsviraj dio A.",
        "Bez žurbe prijeđi u drugi A.",
        "Na prijelazu nastavi isti puls.",
    ],
    "4-3": [
        "Pogledaj cijeli list tabulature.",
        "Odsviraj A, A, B, B.",
        "U svakom B zadnji zvuk traje dva koraka.",
    ],
    "4-4": [
        "Mama ili tata tiho tapkaju — kao četiri ravna koraka.",
        "Ti sviraš cijeli motiv A-A-B-B s lista, uz njihovo tapkanje.",
        "Ako zapne, tapkajte sporije. Ne mora biti savršeno.",
    ],
    "4-5": [
        "Na kartici dodirni četiri zvuka redom — to je tvoja melodija.",
        "Pogledaj mjesta na malom crtežu vrata.",
        "Odsviraj svoj red polako.",
    ],
    "4-6": [
        "Odloži ekran. Sviraj cijeli motiv A-A-B-B s tiskanog lista.",
        "Objasni mami ili tati jednu oznaku na listu.",
        "Nakloni se. Zajedno odaberite ★ na kartici — koliko si sigurna.",
    ],
    "3-7": [
        "Izaberi misiju koja ti je najdraža iz ovog tjedna.",
        "Odsviraj je još jednom — polako.",
        "Reci mami ili tati što si ponovila.",
    ],
    "4-7": [
        "Izaberi misiju koja ti je najdraža iz ovog tjedna.",
        "Odsviraj je još jednom — polako.",
        "Reci mami ili tati što si ponovila.",
    ],
}

REVIEW_CARDS = [
    {
        "week": 1,
        "num": 7,
        "title": "Ponovi omiljeno",
        "kind": "review",
        "data": None,
        "steps": MARIJA_STEPS["1-7"],
    },
    {
        "week": 2,
        "num": 7,
        "title": "Ponovi omiljeno",
        "kind": "review",
        "data": None,
        "steps": MARIJA_STEPS["2-7"],
    },
    {
        "week": 3,
        "num": 7,
        "title": "Ponovi omiljeno",
        "kind": "review",
        "data": None,
        "steps": MARIJA_STEPS["3-7"],
    },
    {
        "week": 4,
        "num": 7,
        "title": "Ponovi omiljeno",
        "kind": "review",
        "data": None,
        "steps": MARIJA_STEPS["4-7"],
    },
]

# Dnevni hookovi u skladu s dailyKid[2] u app.js (jedna misija po danu).
DAILY_WEEK3 = [
    ["Pripremi", "3.1: ramena miruju, prvi prag druge žice."],
    ["Mali most", "3.3: druga žica 3, pa prva prazna (0)."],
    ["Pjevaj", "3.4: echo A i B; pogledaj Pjesmice ili list."],
    ["Dio B", "3.2: B na gitari — 0-1-3 na prvoj; zadnji ton traje."],
    ["Dio A", "3.5: pjevaj Bratec Martin — dio A na gitari."],
    ["Pokaži", "3.6: mali koncert — sama A, zatim sama B."],
    ["Ponovi", "3.7: ponovi omiljenu misiju."],
]

# Dnevni hookovi u skladu s dailyKid[3] u app.js (jedna misija po danu).
DAILY_WEEK4 = [
    ["Pripremi", "4.1: ugodi gitaru i list pjesmice."],
    ["Spoji", "4.2: poveži A pa A."],
    ["Most", "4.3: vježbaj spoj A pa B."],
    ["Motiv", "4.3: sviraj A-A-B-B."],
    ["Zajedno", "4.4: mama/tata tapka, Marija A-A-B-B."],
    ["Koncert", "4.6: mali koncert bez ekrana."],
    ["Ponovi", "4.7: ponovi omiljenu misiju."],
]


def apply_marija_app_data(data):
    """Vrati kopiju podataka s 28 kartica i Marijinim koracima."""
    out = deepcopy(data)
    cards = []
    for card in out["cards"]:
        k = f"{card['week']}-{card['num']}"
        patched = dict(card)
        if k in MARIJA_STEPS:
            patched["steps"] = MARIJA_STEPS[k]
        if k == "3-2":
            patched["title"] = "Bratec Martin: dio B"
        if k == "3-6":
            patched["title"] = "Moj mali koncert"
        if k == "4-6":
            patched["title"] = "Moj mali koncert"
        cards.append(patched)
    have = {(c["week"], c["num"]) for c in cards}
    for rc in REVIEW_CARDS:
        if (rc["week"], rc["num"]) not in have:
            cards.append(deepcopy(rc))
    cards.sort(key=lambda c: (c["week"], c["num"]))
    out["cards"] = cards
    if len(out.get("daily", [])) >= 3:
        out["daily"][2] = deepcopy(DAILY_WEEK3)
    if len(out.get("daily", [])) >= 4:
        out["daily"][3] = deepcopy(DAILY_WEEK4)
    return out
