const mongoose = require('mongoose');
var assert = require('assert');

const lokacijeJSON = require('../../app_server/models/restaurants-mongodb.json');
const uporabnikiJSON = require('../../app_server/models/users-mongodb.json');
const nasloviJSON = require('../../app_server/models/emails-mongodb.json');
//TEST
const Lokacija = mongoose.model('Lokacija');
const Uporabnik = mongoose.model('Uporabnik');
const Naslov = mongoose.model('Naslov');

const izbrisiPodatke = (req, res) => {
    mongoose.connection.db.dropDatabase(function (napaka, rezultat) {
        if (napaka) {
            res.status(400).json(napaka);
        }
        else {
            res.redirect("/db");
        }
    });
};
const uvoziPodatke = (req, res) => {
    Lokacija.insertMany(lokacijeJSON, function (napaka, rezultat) {
        if (napaka) {
            console.log(napaka);
        }
        else {
            console.log("Uspešen uvoz lokacij.");
        }
    })

    Uporabnik.insertMany(uporabnikiJSON, function (napaka, rezultat) {
        if (napaka) {
            console.log(napaka);
        }
        else {
            console.log("Uspešen uvoz uporabnikov.");
        }
    })

    Naslov.insertMany(nasloviJSON, function (napaka, rezultat) {
        if (napaka) {
            console.log(napaka);
        }
        else {
            console.log("Uspešen uvoz naslovov.");
        }
    })
};

module.exports = {
    izbrisiPodatke,
    uvoziPodatke
};