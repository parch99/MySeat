const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://myseat-sp-2020-2021.herokuapp.com';
}

var izbrisiPodatke = (req, res) => {
    var izbrisaniPodatki = {
        title: 'Izbrisi podatke iz baze',
        glavaStrani: {
            naslov: 'Podatki iz baze bodo izbrisani'
        }
    };
    res.render("db", izbrisaniPodatki);
};
var uvoziPodatke = (req, res) => {
    var uvozeniPodatki = {
        title: 'Uvozi podatke na bazo',
        glavaStrani: {
            naslov: 'Podatki bodo uvozeni na bazo'
        }
    };
    res.render("db", uvozeniPodatki);
};

module.exports = {
    izbrisiPodatke,
    uvoziPodatke
};