export type PricingService = {
  id: string;
  name: string;
  description?: string;
  price: string;
  duration: string;
  originalPrice?: string;
  promoLabel?: string;
};

export type PricingCategory = {
  id: string;
  name: string;
  services: readonly PricingService[];
};

export const pricingCategories = [
  {
    id: "popularne",
    name: "Popularne",
    services: [
      {
        id: "p1",
        name: "Strzyżenie Męskie",
        description: "Nożyczki, czysta linia — dopasowanie do głowy i stylu.",
        price: "50,00 zł+",
        duration: "20 min",
      },
      {
        id: "p2",
        name: "Strzyżenie Męskie Kasia",
        description: "U stylistki: więcej czasu na konsultację i precyzyjne wykończenie.",
        price: "50,00 zł+",
        duration: "30 min",
      },
      {
        id: "p3",
        name: "Strzyżenie Damskie",
        description: "Od sportu po klasykę — cięcie i modelowanie pod Twój typ włosów.",
        price: "60,00 zł+",
        duration: "40 min",
      },
      {
        id: "p4",
        name: "Strzyżenie Dziecięce",
        description: "Do 5 lat 30 zł; starsze dzieci — standardowa stawka.",
        price: "40,00 zł+",
        duration: "30 min",
      },
    ],
  },
  {
    id: "strzyzenie",
    name: "Strzyżenie",
    services: [
      {
        id: "s4",
        name: "Strzyżenie maszynką",
        description: "Strzyżenie za pomocą maszynki przy użyciu nasadek — precyzyjne boki i kontury.",
        price: "45,00 zł+",
        duration: "20 min",
      },
      {
        id: "s5",
        name: "Strzyżenie brody",
        description: "Podcięcie i wyprofilowanie brody za pomocą maszynki, nożyczek oraz golarki.",
        price: "30,00 zł",
        duration: "30 min",
      },
      {
        id: "s6",
        name: "Strzyżenie męskie i zarostu",
        description: "Strzyżenie obejmujące włosy na głowie oraz brodę w jednej wizycie.",
        price: "75,00 zł+",
        duration: "45 min",
      },
      {
        id: "s8",
        name: "Strzyżenie buzz cut",
        description: "Strzyżenie w nowoczesnym stylu buzz cut — równa długość i czyste linie.",
        price: "45,00 zł",
        duration: "20 min",
      },
      {
        id: "s9",
        name: "Strzyżenie boków",
        description: "Strzyżenie boków maszynką oraz cieniowanie w połączeniu z resztą fryzury.",
        price: "40,00 zł+",
        duration: "20 min",
      },
      {
        id: "s10",
        name: "Strzyżenie grzywki",
        description: "Podcięcie grzywki lub wykonanie od podstaw — szybka korekta wyglądu.",
        price: "20,00 zł",
        duration: "10 min",
      },
      {
        id: "s11",
        name: "Końce",
        description: "Strzyżenie na prosto, półokrągło lub trójkąt — odświeżenie długości bez dużej zmiany.",
        price: "50,00 zł+",
        duration: "30 min",
      },
    ],
  },
  {
    id: "fryzura",
    name: "Fryzura",
    services: [
      {
        id: "f1",
        name: "Modelowanie włosów",
        description: "Mycie włosów oraz stylizacja według życzenia — objętość, fale lub gładki finish.",
        price: "55,00 zł+",
        duration: "30 min",
      },
      {
        id: "f2",
        name: "Upięcia włosów",
        description: "Fryzura wieczorowa, fale lub loki z upięciem — pod wielkie wyjście.",
        price: "120,00 zł+",
        duration: "1 h 10 min",
      },
      {
        id: "f3",
        name: "Prostowanie włosów",
        description: "Mycie wraz z wyprostowaniem włosów przy użyciu narzędzi fryzjerskich.",
        price: "70,00 zł+",
        duration: "50 min",
      },
      {
        id: "f4",
        name: "Mycie włosów oraz suszenie",
        description: "Umycie głowy oraz suszenie do sucha — baza pod dalszą stylizację.",
        price: "50,00 zł+",
        duration: "30 min",
      },
    ],
  },
  {
    id: "koloryzacja",
    name: "Koloryzacja",
    services: [
      {
        id: "k1",
        name: "Sombre / Ombre",
        description: "Sombre to technika koloryzacji włosów, która polega na stopniowym i łagodnym przejściu tonów.",
        price: "200,00 zł+",
        duration: "2 h 30 min",
      },
      {
        id: "k2",
        name: "Farbowanie odrostów lub całości włosów",
        description: "W usługę wchodzi farbowanie włosów, strzyżenie oraz fryzura typu blow-dry według ustalenia.",
        price: "150,00 zł+",
        duration: "1 h 50 min",
      },
      {
        id: "k3",
        name: "Pasemka",
        description: "Pasemka — technika farbowania polegająca na rozjaśnieniu pojedynczych kosmyków dla naturalnego efektu.",
        price: "200,00 zł+",
        duration: "2 h 30 min",
      },
      {
        id: "k4",
        name: "Balejaż",
        description: "Ręczne rozświetlanie pasem z miękkim grow-outem — efekt słonecznych refleksów.",
        price: "220,00 zł+",
        duration: "3 h",
      },
      {
        id: "k5",
        name: "Pasemka na grubych włosach",
        description: "Pasemka na gęstych włosach — więcej czasu i materiału dla równomiernego pokrycia.",
        price: "270,00 zł+",
        duration: "3 h 30 min",
      },
      {
        id: "k6",
        name: "Rozjaśnianie + toner / farba",
        description: "Rozjaśnianie globalne, a następnie toner lub farba dla wymarzonego chłodnego lub ciepłego tonu.",
        price: "200,00 zł+",
        duration: "3 h 30 min",
      },
      {
        id: "k7",
        name: "Farbowanie włosów fast",
        description: "Innowacyjny system progresywnej koloryzacji — krótszy czas z zachowaniem jakości.",
        price: "170,00 zł+",
        duration: "1 h 10 min",
      },
      {
        id: "k8",
        name: "Farbowanie / odsiwianie włosów męskich",
        description: "Koloryzacja zapewniająca naturalny efekt maskujący siwe włosy i świeży wygląd.",
        price: "120,00 zł",
        duration: "45 min",
      },
      {
        id: "k9",
        name: "Pasemka + toner",
        description: "Pasemka z domykającym tonerem — równy, zdrowy połysk i trwały odcień.",
        price: "220,00 zł+",
        duration: "3 h",
      },
    ],
  },
  {
    id: "regeneracja",
    name: "Regeneracja",
    services: [
      {
        id: "r1",
        name: "Regeneracja włosów REP 22",
        description: "NOWE ŻYCIE DLA TWOICH WŁOSÓW — intensywna odbudowa struktury włosa.",
        price: "175,50 zł",
        duration: "1 h",
        originalPrice: "270,00 zł",
        promoLabel: "Zaoszczędź do 35%",
      },
      {
        id: "r2",
        name: "Regeneracja włosów 5-krokowa",
        description: "Keratynowa regeneracja włosów — 5 kroków do odbudowy, nawilżenia i ochrony.",
        price: "162,50 zł+",
        duration: "1 h 20 min",
        originalPrice: "250,00 zł+",
        promoLabel: "Zaoszczędź do 35%",
      },
      {
        id: "r3",
        name: "Nawilżanie włosów Kaaral",
        description: "Szampon, odżywka oraz ampułki intensywnie odżywiające — szybki zastrzyk nawilżenia.",
        price: "110,50 zł+",
        duration: "50 min",
        originalPrice: "170,00 zł+",
        promoLabel: "Zaoszczędź do 35%",
      },
      {
        id: "r4",
        name: "Nawilżanie włosów Kaaral — kuracja wypełniająca",
        description: "Intensywna kuracja wypełniająca, która zapewnia wzmocnienie i ochronę włosa.",
        price: "240,50 zł+",
        duration: "1 h 30 min",
        originalPrice: "370,00 zł+",
        promoLabel: "Zaoszczędź do 35%",
      },
      {
        id: "r5",
        name: "Nawilżanie Nutro",
        description: "Głębokie nawilżenie i regeneracja dla suchych i zmęczonych stylizacją włosów.",
        price: "182,00 zł+",
        duration: "1 h",
        originalPrice: "280,00 zł+",
        promoLabel: "Zaoszczędź do 35%",
      },
    ],
  },
  {
    id: "trwala",
    name: "Trwała",
    services: [
      {
        id: "t1",
        name: "Trwała dyscyplinująca",
        description: "Organiczny system prostujący z keratyną roślinną, pantenolem i ceramidami.",
        price: "260,00 zł+",
        duration: "3 h",
      },
      {
        id: "t2",
        name: "Trwała męska",
        description: "Trwała dla włosów męskich — naturalna fala i utrzymanie bez codziennego układania.",
        price: "180,00 zł",
        duration: "2 h",
      },
    ],
  },
  {
    id: "przedluzanie",
    name: "Przedłużanie / zagęszczanie włosów",
    services: [
      {
        id: "pr1",
        name: "Konsultacja",
        description:
          "Konsultacja obejmuje dobór koloru włosów oraz długość. Poznanie zasad pielęgnacji i planu zabiegów.",
        price: "120,00 zł",
        duration: "30 min",
      },
      {
        id: "pr2",
        name: "Założenie włosów",
        description: "Wizyta obejmuje: mycie włosów przed zabiegiem, aplikację oraz instruktaż domowej pielęgnacji.",
        price: "530,00 zł+",
        duration: "1 h 15 min",
      },
      {
        id: "pr3",
        name: "Konsultacja przedłużanie włosów + koloryzacja",
        description: "Konsultacja z doborem koloru i długości w połączeniu z planowaną koloryzacją.",
        price: "280,00 zł+",
        duration: "2 h",
      },
      {
        id: "pr4",
        name: "Ściąganie włosów",
        description: "Bezpieczne usuwanie aplikacji — delikatnie dla naturalnych włosów i skóry głowy.",
        price: "120,00 zł",
        duration: "30 min",
      },
    ],
  },
  {
    id: "regulacja",
    name: "Regulacja / henna",
    services: [
      {
        id: "reg1",
        name: "Regulacja brwi",
        description: "Precyzyjna regulacja brwi woskiem lub pęsetą — według ustalenia.",
        price: "35,00 zł",
        duration: "20 min",
      },
      {
        id: "reg2",
        name: "Regulacja wąsika",
        description: "Wyrywanie woskiem wąsika — szybko i czysto.",
        price: "30,00 zł",
        duration: "20 min",
      },
      {
        id: "reg3",
        name: "Henna + regulacja brwi",
        description: "Regulacja woskiem oraz henna dla wyrazistego kształtu i koloru.",
        price: "40,00 zł",
        duration: "30 min",
      },
      {
        id: "reg4",
        name: "Henna brwi",
        description: "Koloryzacja brwi henną — trwały efekt i symetria łuku.",
        price: "35,00 zł",
        duration: "30 min",
      },
    ],
  },
  {
    id: "inne",
    name: "Inne",
    services: [
      {
        id: "i1",
        name: "Keratynowe prostowanie włosów",
        description: "Trwałe prostowanie włosów za pomocą keratyny — gładkie, lśniące włosy na wiele tygodni.",
        price: "380,00 zł+",
        duration: "3 h 30 min",
      },
      {
        id: "i2",
        name: "Strzyżenie Damskie + Modelowanie",
        description: "Strzyżenie damskie wraz z modelowaniem — mycie, cięcie i stylizacja pod okazję lub na co dzień.",
        price: "70,00 zł+",
        duration: "50 min",
      },
    ],
  },
] as const satisfies readonly PricingCategory[];

export type PricingCategoryId = (typeof pricingCategories)[number]["id"];
