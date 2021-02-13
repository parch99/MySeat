const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://myseat-sp-2020-2021.herokuapp.com';
}

var seznamUporabnikov = (req, res) => {
    axios
        .get(apiParametri.streznik + "/api/uporabniki")
        .then((odgovor) => {
            res.render('uporabniki-seznam', {
                title: 'MySeat',
                glavaStrani: {
                    naslov: 'MySeat',
                    podnaslov: 'Seznam uporabnikov aplikacije MySeat.'
                },
                uporabniki: odgovor.data
            });

        })
};

const user = (req, res, povratniKlic) => {
    axios
        .get(apiParametri.streznik + '/api/uporabniki/' + req.params.idUporabnika)
        .then((odgovor) => {
            povratniKlic(req, res, odgovor.data);
        })
        .catch((napaka) => {
            prikaziNapakoU(req, res, napaka);
        });
};
const userpod = (req, res) => {
    user(req, res, (req, res, vsebina) => {
        prikaziHomeUser(req, res, vsebina);
    });
};
const prikaziHomeUser = (req, res, podatki) => {
    res.render('homeUser', {
        uporabnik: podatki
    });
};

const owner = (req, res, povratniKlic) => {
    axios
        .get(apiParametri.streznik + '/api/uporabniki/' + req.params.idUporabnika)
        .then((odgovor) => {
            povratniKlic(req, res, odgovor.data);
        })
        .catch((napaka) => {
            prikaziHomeOwner(req, res, napaka);
        });
};
const ownerpod = (req, res) => {
    owner(req, res, (req, res, vsebina) => {
        prikaziHomeOwner(req, res, vsebina);
    });
};
const prikaziHomeOwner = (req, res, podatki) => {
    console.log(podatki);
    res.render('homeOwner', {
        uporabnik: podatki
    });
};

var uporabnikPodrobnosti = (req, res) => {
    var id = req.params.idUporabnika;

    axios
        .get(apiParametri.streznik + "/api/uporabniki/" + id)
        .then((odgovor) => {
            odgovor.data.
            res.render('homeOwner', odgovor.data);
        });
};

var dodajUporabnika = (req, res) => {
    var novUporabnik = {
        title: 'Dodaj novega uporabnika',
        glavaStrani: {
            naslov: 'Nov uporabnik aplikacije MySeat'
        }
    };
    res.render("signup", novUporabnik);
};
var overiUporabnika = (req, res) => {
    var overjenUporabnik = {
        title: 'Overi uporabnika',
        glavaStrani: {
            naslov: 'Overjen uporabnik aplikacije MySeat'
        }
    };
    res.render("login", overjenUporabnik);
};

const prikaziNapakoU = (req, res, napaka) => {
    let vsebina = napaka.isAxiosError ? "Napaka pri dostopu do oddaljenega vira preko REST API dostopa" : undefined;
    res.render('error', {
        vsebina: vsebina
    });
};

module.exports = {
    userpod,
    ownerpod,
    overiUporabnika,
    dodajUporabnika
};