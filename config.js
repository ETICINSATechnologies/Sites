var SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZBEJXPFgPPfqjozh4tA7PQnH_yOKaI5qH30_DDyoWEXNZb5HW4mrEkqlIM4-v11yjeMyDDqOoXyKQ/pub?gid=0&single=true&output=csv";

var REDIRECTS = [
    {
        path: "inscription", iframe: "FALSE", title: "Site d'Inscription", image: "images/inscription.svg", to: "https://site-inscription.etic-insa.com/",
    },
    {
        path: "keros", iframe: "FALSE", title: "KEROS", to: "https://keros.etic-insa.com/", 
    },
    {
        path: "annuaire", iframe: "TRUE", title: "Annuaire des Anciens", to: "https://annuaire-anciens.etic-insa.com/",
    },
]
