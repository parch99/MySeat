const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://myseat.onrender.com';
}

const seznam = (req, res) => {
    axios
    .get(apiParametri.streznik + '/api/list/lokacije', {
        params: {
            lng: 14.469027,
            lat: 46.050129,
            maxRazdalja: 100
        }
    })
    .then((odgovor) => {
        let sporocilo = 
        odgovor.data.length ? null : "V bližini ni najdenih lokacij.";
        odgovor.data.map(lokacija => {
            lokacija.razdalja = formatirajRazdaljo(lokacija.razdalja);
            return lokacija;
        });
        prikaziZacetniSeznam(req, res, odgovor.data, sporocilo);
    })
    .catch(() => {
        prikaziZacetniSeznam(req, res, [], "Napaka API-ja pri iskanju lokacij.");
    });
};
const prikaziZacetniSeznam = (req, res, seznamBliznjihLokacij, sporocilo) => {
    res.render('list', {
        lokacije: seznamBliznjihLokacij,
        sporocilo: sporocilo
    });
};
  
const pridobiPodrobnostiLokacije = (req, res, povratniKlic) => {
    axios
        .get(apiParametri.streznik + '/api/lokacije/' + req.params.idLokacije)
        .then((odgovor) => {
            odgovor.data.koordinate = {
                lng: odgovor.data.koordinate[0],
                lat: odgovor.data.koordinate[1]
            };
            odgovor.data.WorkingHours = {
                Monday: odgovor.data.WorkingHours[0].Monday,
                Tuesday: odgovor.data.WorkingHours[0].Tuesday,
                Wednesday: odgovor.data.WorkingHours[0].Wednesday,
                Thursday: odgovor.data.WorkingHours[0].Thursday,
                Friday: odgovor.data.WorkingHours[0].Friday,
                Saturday: odgovor.data.WorkingHours[0].Saturday,
                Sunday: odgovor.data.WorkingHours[0].Sunday
            };
            povratniKlic(req, res, odgovor.data);
        })
        .catch((napaka) => {
            prikaziNapako(req, res, napaka);
        });
};
const podrobnostiLokacije = (req, res) => {
    pridobiPodrobnostiLokacije(req, res, (req, res, vsebina) => {
        prikaziPodrobnostiLokacije(req, res, vsebina);
    });
};
const prikaziPodrobnostiLokacije = (req, res, podrobnostiLokacije) => {
    res.render('info', {
        lokacija: podrobnostiLokacije
    });
};

const prikaziNapako = (req, res, napaka) => {
    let vsebina = napaka.isAxiosError ?
        "Napaka pri dostopu do oddaljenega vira preko REST API dostopa!" : undefined;
    vsebina = ( vsebina != undefined && napaka.response && napaka.response.data["sporočilo"]
    ) ? napaka.response.data["sporočilo"] : vsebina;
    vsebina = ( vsebina != undefined && napaka.response && napaka.response.data["message"]
    ) ? napaka.response.data["message"] : vsebina;
    vsebina = (vsebina == undefined) ?
        "Nekaj nekje očitno ne deluje." : vsebina;
    if (napaka.response && napaka.response.data["_message"] == "Lokacija validation failed") {
        res.redirect('/lokacija/' + req.params.idLokacije + '/komentar/nov?napaka=vrednost');
    } else {
        res.render('error', {
            vsebina: vsebina
        });
    }
};
const formatirajRazdaljo = (razdalja) => {
    let enota = 'm';
    if (razdalja > 1) {
      razdalja = parseFloat(razdalja).toFixed(1);
      enota = 'km';
    } else {
      razdalja = Math.round(razdalja * 1000);
    }
    return razdalja + ' ' + enota;
};

const dodajKomentar = (req, res) => {
    pridobiPodrobnostiLokacije(req, res, (req, res, vsebina) => {
      prikaziObrazecZaKomentar(req, res, vsebina);
    });
};
const prikaziObrazecZaKomentar = (req, res, {naziv}) => {
    res.render('lokacija-nov-komentar', {
      napaka: req.query.napaka
    });
};
const shraniKomentar = (req, res) => {
    const idLokacije = req.params.idLokacije;
    if (!req.body.naziv || !req.body.ocena || !req.body.komentar || !req.body.cost) {
      res.redirect('/lokacija/' + idLokacije + '/komentar/nov?napaka=vrednost');
    } else {
      axios({
        method: 'post',
        url: apiParametri.streznik + '/api/lokacije/' + idLokacije + '/komentarji',
        data: {
          naziv: req.body.naziv,
          ocena: req.body.ocena,
          komentar: req.body.komentar,
          cost: req.body.cost
        }
      }).then(() => {
        res.redirect('/lokacija/' + idLokacije);
      }).catch((napaka) => {
        prikaziNapako(req, res, napaka);
      });
    }
};

const prikaziObrazecZaRestoran = (req, res) => {
    res.render('lokacija-nov-restoran', {
        napaka: req.query.napaka
    });
};
const shraniRestoran = (req, res) => {
    if (!req.body.naziv || !req.body.naslov || !req.body.phone || !req.body.phone
        || !req.body.koordinatelng || !req.body.koordinatelat || !req.body.mondayfriday
        || !req.body.saturday || !req.body.sunday) {
        res.redirect('/list/lokacija-nov-restoran?napaka=vrednost');
    } else {
        axios({
            method: 'post',
            url: apiParametri.streznik + '/api/list/lokacije',
            data: {
            naziv: req.body.naziv,
            naslov: req.body.naslov,
            phone: req.body.phone,
            koordinatelng: req.body.koordinatelng,
            koordinatelat: req.body.koordinatelat,
            mondayfriday: req.body.mondayfriday,
            saturday: req.body.saturday,
            sunday: req.body.sunday
        }
      }).then(() => {
        res.redirect('/list');
      }).catch((napaka) => {
        prikaziNapakoR(req, res, napaka);
      });
    }
};
const prikaziNapakoR = (req, res, napaka) => {
    let vsebina = napaka.isAxiosError ? "Napaka pri dostopu do oddaljenega vira preko REST API dostopa!" : undefined;

    vsebina = (vsebina != undefined && napaka.response && napaka.response.data["sporočilo"]) ? 
    napaka.response.data["sporočilo"] : vsebina;

    vsebina = ( vsebina != undefined && napaka.response && napaka.response.data["message"]) ? 
    napaka.response.data["message"] : vsebina;

    vsebina = (vsebina == undefined) ? "Nekaj nekje očitno ne deluje." : vsebina;
    if (napaka.response && napaka.response.data["_message"] == "Lokacija validation failed") {
        res.redirect('/list/lokacija-nov-restoran?napaka=vrednost');
    } else {
        res.render('error', {
            vsebina: vsebina
        });
    }
};

const prikaziObrazecZaRezervacijo = (req, res, {naziv}) => {
    res.render('lokacija-nov-order', {
      napaka: req.query.napaka
    });
};
const shraniRezervacijo = (req, res) => {
    const idLokacije = req.params.idLokacije;
    if (!req.body.firstname || !req.body.lastname || !req.body.phone || !req.body.reservationtime) {
      res.redirect('/lokacija/' + idLokacije + '/order/nov?napaka=vrednost');
    } else {
      axios({
        method: 'post',
        url: apiParametri.streznik + '/api/lokacije/' + idLokacije + '/rezervacije',
        data: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            reservationtime: req.body.reservationtime
        }
      }).then(() => {
        res.redirect('/lokacija/' + idLokacije);
      }).catch((napaka) => {
        prikaziNapako(req, res, napaka);
      });
    }
};

module.exports = {
    podrobnostiLokacije,
    shraniKomentar,
    dodajKomentar,
    shraniRestoran,
    prikaziObrazecZaRestoran,
    shraniRezervacijo,
    prikaziObrazecZaRezervacijo,
    seznam
};