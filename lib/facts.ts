export interface MonumentFact {
  id: string;
  name: string;
  artist?: string;
  year: string;
  place: string;
  photo: string;
  overlayPhoto?: string;
  tagline: string;
  tts: string;
  bullets: { ico: string; lbl: string; val: string }[];
  more: string[];
}

export const MONUMENTS: Record<string, MonumentFact> = {
  david: {
    id: "david",
    name: "David",
    artist: "Michelangelo Buonarroti",
    year: "1501–1504",
    place: "Galleria dell'Accademia, Firenze",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/%27David%27_by_Michelangelo_Fir_JBU005.jpg/480px-%27David%27_by_Michelangelo_Fir_JBU005.jpg",
    tagline: "Riconosciuto · confidenza 99%",
    tts:
      "Il David di Michelangelo. Alto cinque metri e diciassette, pesa oltre cinque tonnellate. Fu scolpito tra il 1501 e il 1504 da un unico blocco di marmo di Carrara. L'originale si trova alla Galleria dell'Accademia dal 1873; in Piazza della Signoria vedi una copia.",
    bullets: [
      { ico: "📏", lbl: "Altezza", val: "5,17 m · 5 572 kg" },
      { ico: "🪨", lbl: "Materiale", val: "Marmo di Carrara" },
      { ico: "🏛", lbl: "Committente", val: "Opera del Duomo, 1501" },
      { ico: "📍", lbl: "Originale", val: "Accademia dal 1873" }
    ],
    more: [
      "Il blocco era stato abbandonato per 35 anni — Michelangelo aveva 26 anni quando iniziò.",
      "La fionda e il tronco d'albero richiamano Davide prima dello scontro con Golia.",
      "Nel 1991 un vandalo danneggiò il piede sinistro con un martello."
    ]
  },
  duomo: {
    id: "duomo",
    name: "Cupola del Brunelleschi",
    artist: "Filippo Brunelleschi",
    year: "1420–1436",
    place: "Santa Maria del Fiore, Firenze",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cattedrale_di_Santa_Maria_del_Fiore_-_Florence.jpg/480px-Cattedrale_di_Santa_Maria_del_Fiore_-_Florence.jpg",
    tagline: "Riconosciuto · confidenza 98%",
    tts:
      "La cupola di Santa Maria del Fiore, progettata da Filippo Brunelleschi e completata nel 1436. Con i suoi 45 metri di diametro è ancora oggi la più grande cupola in muratura del mondo, costruita senza centine grazie a una doppia calotta autoportante.",
    bullets: [
      { ico: "📐", lbl: "Diametro", val: "45,5 m · 114 m di altezza" },
      { ico: "🧱", lbl: "Mattoni", val: "4 milioni · spina di pesce" },
      { ico: "📅", lbl: "Cantiere", val: "16 anni (1420→1436)" },
      { ico: "🪜", lbl: "Gradini", val: "463, nessun ascensore" }
    ],
    more: [
      "Brunelleschi vinse un concorso nel 1418 contro Ghiberti.",
      "La lanterna in cima fu completata solo nel 1461, dopo la sua morte.",
      "Ispirò Michelangelo per San Pietro: «Farò la sorella, più grande ma non più bella»."
    ]
  },
  uffizi: {
    id: "uffizi",
    name: "Nascita di Venere",
    artist: "Sandro Botticelli",
    year: "c. 1485",
    place: "Galleria degli Uffizi, Firenze",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/640px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    tagline: "Riconosciuto · confidenza 97%",
    tts:
      "La Nascita di Venere di Sandro Botticelli, dipinta intorno al 1485 per i Medici. Tempera su tela, è uno dei simboli del Rinascimento fiorentino. Venere emerge dalle acque su una conchiglia, spinta dai venti Zefiro e Aura.",
    bullets: [
      { ico: "🖼", lbl: "Tecnica", val: "Tempera su tela" },
      { ico: "📐", lbl: "Misure", val: "172,5 × 278,5 cm" },
      { ico: "👨‍🎨", lbl: "Modella", val: "Simonetta Vespucci (forse)" },
      { ico: "💰", lbl: "Committente", val: "Medici, villa Castello" }
    ],
    more: [
      "La posa di Venere riprende la classica «Venus Pudica».",
      "Le Ore di primavera l'accolgono con un manto fiorato.",
      "Considerata pagana, fu nascosta durante il falò delle vanità del Savonarola."
    ]
  }
};

export interface MenuItem {
  it: string;
  en: string;
  desc: string;
  allergen: string;
  price: string;
  tts: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    it: "Pappa al pomodoro",
    en: "Tuscan tomato & bread soup",
    desc: "Pane toscano raffermo, pomodoro San Marzano, basilico, olio EVO.",
    allergen: "Glutine",
    price: "€9",
    tts: "Pappa al pomodoro: zuppa toscana di pane raffermo e pomodoro."
  },
  {
    it: "Pappardelle al cinghiale",
    en: "Wide pasta · wild boar ragù",
    desc: "Pasta fresca all'uovo, ragù di cinghiale delle colline del Chianti, 3 ore di cottura.",
    allergen: "Glutine · Uova",
    price: "€16",
    tts: "Pappardelle al cinghiale: pasta fresca con ragù di cinghiale."
  },
  {
    it: "Lampredotto in zimino",
    en: "Florentine tripe sandwich",
    desc: "Quarto stomaco del bovino cotto in brodo con bietola e spezie. Street food di San Lorenzo.",
    allergen: "—",
    price: "€7",
    tts: "Lampredotto: panino tipico fiorentino con trippa di vitello."
  },
  {
    it: "Bistecca alla fiorentina",
    en: "T-bone steak, rare",
    desc: "Chianina IGP, al sangue, sale grosso e rosmarino. Minimo 1 kg per 2 persone.",
    allergen: "—",
    price: "€6/etto",
    tts: "Bistecca alla fiorentina: T-bone di Chianina al sangue."
  }
];

export interface AREra {
  id: string;
  year: string;
  label: string;
  photo: string;
  caption: string;
  tts: string;
}

export const AR_FORUM: AREra[] = [
  {
    id: "today",
    year: "Oggi",
    label: "2026 d.C.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Forum_Romanum_April_2019.jpg/640px-Forum_Romanum_April_2019.jpg",
    caption: "Foro Romano · rovine · 2026",
    tts: "Oggi il Foro Romano è un sito archeologico a cielo aperto, cuore della Roma antica."
  },
  {
    id: "ancient",
    year: "100 d.C.",
    label: "Apice imperiale",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Maquette_Rome_Paul_Bigot_2.jpg/640px-Maquette_Rome_Paul_Bigot_2.jpg",
    caption: "Ricostruzione · età di Traiano",
    tts:
      "Nell'anno 100 dopo Cristo, al tempo dell'imperatore Traiano, il Foro era il centro politico, religioso e commerciale dell'impero. Basiliche, templi e colonne ricoperte d'oro."
  },
  {
    id: "republic",
    year: "27 a.C.",
    label: "Fondazione augustea",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Forum_Romanum_6k_%285760x3240%29.jpg/640px-Forum_Romanum_6k_%285760x3240%29.jpg",
    caption: "Il Foro ai tempi di Augusto",
    tts:
      "Nel 27 avanti Cristo Augusto inaugura il principato. Qui si svolgevano processi, discorsi pubblici e cerimonie religiose."
  }
];
