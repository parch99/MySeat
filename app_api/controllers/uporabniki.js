const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const uporabnikiSeznam = (req, res) => {
    Uporabnik.find().exec(function (err, seznam) {
        if (err) {
            console.err(err);
            res.status(404).json({ "sporočilo": "Napaka pri poizvedbi: " + err });
        } else {
            res.status(200).json(seznam);
        }
    })
};
const uporabnikiPreberi = (req, res) => {
    Uporabnik
        .findById(req.params.idUporabnika)
        .exec((napaka, uporabnik) => {
            if (!uporabnik) {
                return res.status(404).json({
                    "sporočila": "Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(uporabnik);
        });
};
const uporabnikiPosodobi = (req, res) => {
    var id = req.params.idUporabnika
    if (!id) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem uporabnika, " +
                "idUporabnika je obvezen parameter."
        });
    }
    Uporabnik
        .findById(id)
        .select('uporabniki')
        .exec((napaka, Uporabnik) => {
            if (!Uporabnik) {
                return res.status(404).json({ "sporočilo": "Ne najdem uporabnika." });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }

            const trenutniUporabnik = uporabniki.id(id);
            if (!trenutniKomentar) {
                res.status(404).json({ "sporočilo": "Ne najdem uporabnika." });
            } else {
                trenutniUporabnik.ime = req.body.ime;
                trenutniUporabnik.spol = req.body.spol;
                trenutniUporabnik.email = req.body.email;
                trenutniUporabnik.geslo = req.body.geslo;
                Uporabnik.save((napaka, Uporabnik) => {
                    if (napaka) {
                        res.status(404).json(napaka);
                    } else {
                        res.status(200).json(trenutniUporabnik);
                    }
                });
            }

        });
};
const uporabnikiIzbrisi = (req, res) => {
    var id = req.params.idUporabnika
    if (!id) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem uporabnika, " +
                "idUporabnika je obvezen parameter."
        });
    }
    Uporabnik
        .findById(id)
        .select('uporabniki')
        .exec((napaka, Uporabnik) => {
            if (!Uporabnik) {
                return res.status(404).json({ "sporočilo": "Ne najdem uporabnika." });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }

            uporabniki.id(id).remove();
            Uporabnik.save((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                } else {
                    res.status(204).json(null);
                }
            });

        });
};

const uporabnikiKreiraj = (req, res) => {
    bcrypt.hash(req.body.geslo, 10, function (napaka, gesloHash) {
        if (napaka) {
            res.status(400).json(napaka);
        }
        Uporabnik.create({
            ime: req.body.ime,
            spol: req.body.spol,
            email: req.body.email,
            geslo: gesloHash,
            lastnik: req.body.lastnik
        }, (napaka, Uporabnik) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                res.redirect("/login");
            }
        });
    });
};
const uporabnikiOveri = (req, res) => {
    email = req.body.email;
    geslo = req.body.geslo;

    Uporabnik
        .findOne({ email: email })
        .then(Uporabnik => {
            bcrypt.compare(geslo, Uporabnik.geslo, function (napaka, rezultat) {
                if (napaka) {
                    res.status(400).json(napaka);
                }
                if (rezultat) {
                    let token = jwt.sign({ ime: Uporabnik.ime }, 'verySecretValue', { expiresIn: '1h' })
                    if (Uporabnik.lastnik == "on") {
                        res.redirect("/lastnik/" + Uporabnik._id);
                    }
                    else {
                        res.redirect("/uporabnik/" + Uporabnik._id);
                    }
                }
                else {
                    res.status(200).json({ "sporočilo": "Geslo se ne ujema." });
                }
            });
        });
};

module.exports = {
    uporabnikiSeznam,
    uporabnikiKreiraj,
    uporabnikiPreberi,
    uporabnikiPosodobi,
    uporabnikiIzbrisi,
    uporabnikiOveri
};