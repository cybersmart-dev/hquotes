type Quotes = {
    id: number;
    author: String;
    quote: String;
};

type Categories = {
    id: number;
    title: String;
    image: any;
    quotes: Quotes[];
};

export const Categories: Categories[] = [
    {
        id: 1,
        title: "Nasara",
        image: require("../assets/quotes/q_nasara.png"),
        quotes: [
            {
                id: 1,
                author: "Mustapha Aminu",
                quote: "Nasara tana zuwa ne ga wanda bai daina ƙoƙari ba, ko da ya fadi sau dari."
            },
            {
                id: 2,
                author: "Umar ibn AbdulAziz",
                quote: "Ka yi aiki kamar ba za ka taba fuskantar ƙasa ba, kuma ka yi addu’a kamar babu abin da za ka iya da kanka."
            },
            {
                id: 3,
                author: "Abubakar Imam",
                quote: "Babu wata hanya mai sauƙi zuwa ga nasara, dukkan hanyoyin sai da jini, hawaye da ƙoƙari."
            },
            {
                id: 4,
                author: "Malama Sa’adatu Hassan",
                quote: "Wanda baya jin tsoron gazawa, shine yafi kusa da samun nasara."
            },
            {
                id: 5,
                author: "Shehu Usman Dan Fodio",
                quote: "Nasara ba ta zuwa daga alfarma, sai daga hakuri da jajircewa."
            },
            {
                id: 6,
                author: "Aliyu Musa",
                quote: "Ka ɗauki kowace gazawa a matsayin darasi, ba ƙarshe ba."
            },
            {
                id: 7,
                author: "Ahmad Bello",
                quote: "Ka fara da ƙaramin abu, amma da zuciyar manya."
            },
            {
                id: 8,
                author: "Hajara Lawan",
                quote: "Nasara tana buƙatar aiki tukuru, ba fatan banza ba."
            },
            {
                id: 9,
                author: "Aisha Usman",
                quote: "Kowane dare yana da safiyarsa; kowane wahala tana da sauƙi."
            },
            {
                id: 10,
                author: "Malama Sa’adatu Hassan",
                quote: "Wanda baya jin tsoron gazawa, shine yafi kusa da nasara."
            },
            {
                id: 11,
                author: "Malam Musa Ja’afar",
                quote: "Duk wanda ya yarda da kansa, zai iya cimma komai."
            },
            {
                id: 12,
                author: "Nasir Kabir",
                quote: "Kar ka saurari masu cewa ba za ka iya ba, su kansu ba su taɓa ƙoƙari ba."
            },
            {
                id: 13,
                author: "Shehu Usman Dan Fodio",
                quote: "Aiki da gaskiya su ne mabuɗin nasara."
            },
            {
                id: 14,
                author: "Aminu Kano",
                quote: "Rayuwa tseren nisa ce, ba gudun zuciya ba"
            },
        ]
    },
    {
        id: 2,
        title: "Mafarki",
        image: require("../assets/quotes/q_mafarki.png"),
        quotes: [
            {
                id: 1,
                author: "Anatole France",
                quote: "Domin a cimma babban buri, ba aiki kaɗai ake bukata ba, sai da mafarki da gaskiyar zuciya."
            },
            {
                id: 2,
                author: "Anatole France",
                quote: "Ba ka gane ba? A wannan daƙiƙar, za ka iya yin abin da kake so kuma kake mafarki da shi. To ka yi shi! YANZU nan take!"
            },
            {
                id: 3,
                author: " D. Elder",
                quote: "Wanda ke mafarki yana duba gaba yana ganin fata da dama, amma wanda baya mafarki, gaba kawai yake gani ba tare da wani bege ba."
            },
            {
                id: 4,
                author: "D. Elder",
                quote: "Ƙimar ka ta gaskiya ita ce mafarkinka bayan ka kawar da duk wata shakka."
            },
            {
                id: 5,
                author: "D. Elder",
                quote: "Idan ka mafarki abin da ka fi muradi da ƙwarin gwiwa, rayuwarka za ta kasance cike da abubuwan mamaki."
            },
            {
                id: 6,
                author: "D. Elder",
                quote: "Kada ka bar tsoro ya hana ka mafarkin abin da ka cancanta ka zama."
            },
            {
                id: 7,
                author: "",
                quote: ""
            },
            {
                id: 8,
                author: "",
                quote: ""
            },
            {
                id: 9,
                author: "",
                quote: ""
            },
            {
                id: 10,
                author: "",
                quote: ""
            },
            {
                id: 11,
                author: "",
                quote: ""
            },
            {
                id: 12,
                author: "",
                quote: ""
            },
            {
                id: 13,
                author: "",
                quote: ""
            },
        ]
    },
    {
        id: 3,
        title: "Ilimi",
        image: require("../assets/quotes/q_ilimi.png"),
        quotes: [
            {
                id: 1,
                author: "smart",
                quote: "To accomplish great things, we must not only act, but also dream, not only plan, but also believe. Anatole France: Ilimi"
            }
        ]
    },
    {
        id: 4,
        title: "Marmari",
        image: require("../assets/quotes/q_marmari.png"),
        quotes: [
            {
                id: 1,
                author: "smart",
                quote: "To accomplish great things, we must not only act, but also dream, not only plan, but also believe. Anatole France: Marmari"
            }
        ]
    },
    {
        id: 5,
        title: "So",
        image: require("../assets/quotes/q_so.png"),
        quotes: [
            {
                id: 1,
                author: "smart",
                quote: "To accomplish great things, we must not only act, but also dream, not only plan, but also believe. Anatole France: So"
            }
        ]
    },
    {
        id: 6,
        title: "Tsoro",
        image: require("../assets/quotes/q_tsoro.png"),
        quotes: [
            {
                id: 1,
                author: "smart",
                quote: "To accomplish great things, we must not only act, but also dream, not only plan, but also believe. Anatole France: Tsoro"
            }
        ]
    },
    {
        id: 7,
        title: "Bukata",
        image: require("../assets/quotes/q_bukata.png"),
        quotes: [
            {
                id: 1,
                author: "smart",
                quote: "To accomplish great things, we must not only act, but also dream, not only plan, but also believe. Anatole France: Bukata"
            }
        ]
    },
    {
        id: 8,
        title: "Tsammani",
        image: require("../assets/quotes/q_tsammani.png"),
        quotes: [{ id: 1, quote: "", author: "" }]
    }
];
