const mongoose = require('mongoose');
const Lokacija = mongoose.model('Lokacija');

const lokacijeSeznamPoRazdalji = (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const razdalja = parseFloat(req.query.maxRazdalja);
    if (!lng || !lat) {
        return res.status(400).json({
            "sporočilo": "Parametra lng in lat sta obvezna."
        });
    }  
    Lokacija
        .aggregate([{
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [lng, lat]
                },
                "distanceField": "razdalja",
                "spherical": true,
                "maxDistance": (isNaN(razdalja) ? 20 : razdalja) * 1000
            }
        }])
        .limit(10)
        .exec((napaka, lokacije) => {
            if (napaka) {
                res.status(500).json(napaka);
            } else {
                res.status(200).json(
                    lokacije.map(lokacija => {
                        return {
                            "_id": lokacija._id,
                            "naslov": lokacija.naslov,
                            "naziv": lokacija.naziv,
                            "ocena": lokacija.ocena,
                            "razdalja": lokacija.razdalja / 1000
                        };
                    })
                );
            }
        });
};
const lokacijeKreiraj = (req, res) => {
    Lokacija.create({
        naziv: req.body.naziv,
        naslov: req.body.naslov,
        number: req.body.phone,
        koordinate: [
            parseFloat(req.body.koordinatelng),
            parseFloat(req.body.koordinatelat)
        ],
        WorkingHours: {
            Monday: req.body.mondayfriday,
            Tuesday: req.body.mondayfriday,
            Wednesday: req.body.mondayfriday,
            Thursday: req.body.mondayfriday,
            Friday: req.body.mondayfriday,
            Saturday: req.body.saturday,
            Sunday: req.body.sunday
        }
    }, (napaka, lokacija) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(lokacija);
        }
    });
};
const lokacijePreberiIzbrano = (req, res) => {
    Lokacija
        .findById(req.params.idLokacije)
        .exec((napaka, lokacija) => {
            if (!lokacija) {
                return res.status(404).json({
                    "sporočila":
                        "Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(lokacija);
        });
};
const lokacijePosodobiIzbrano = (req, res) => {
    if (!req.params.idLokacije) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem lokacije, idLokacije je obvezen parameter."
        });
    }
    Lokacija
        .findById(req.params.idLokacije)
        .select('-komentarji -ocena')
        .exec((napaka, lokacija) => {
            if (!lokacija) {
                return res.status(404).json({ "sporočilo": "Ne najdem lokacije!" });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if(req.body.naziv) lokacija.naziv = req.body.naziv;
            if(req.body.naslov) lokacija.naslov = req.body.naslov;
            if(req.body.phone) lokacija.number = req.body.phone;
            if(req.body.koordinatelng) lokacija.koordinate = [ parseFloat(req.body.koordinatelng) ]; 
            if(req.body.koordinatelat) lokacija.koordinate = [ parseFloat(req.body.koordinatelat) ];
            if(req.body.mondayfriday){
                lokacija.WorkingHours[0].Monday = req.body.mondayfriday;
                lokacija.WorkingHours[0].Tuesday = req.body.mondayfriday;
                lokacija.WorkingHours[0].Wednesday = req.body.mondayfriday;
                lokacija.WorkingHours[0].Thursday = req.body.mondayfriday;
                lokacija.WorkingHours[0].Friday = req.body.mondayfriday;
            }
            if(req.body.saturday) lokacija.WorkingHours[0].Saturday = req.body.saturday;
            if(req.body.sunday) lokacija.WorkingHours[0].Sunday = req.body.sunday;
            lokacija.save((napaka, lokacija) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.status(200).json(lokacija);
                }
            });
        });
};
const lokacijeIzbrisiIzbrano = (req, res) => {
    const { idLokacije } = req.params;
    if (idLokacije) {
        Lokacija
            .findByIdAndRemove(idLokacije)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem lokacije, idLokacije je obvezen parameter."
        });
    }
};

const rezervacijeKreiraj = (req, res) => {
    const idLokacije = req.params.idLokacije;
    if (idLokacije) {
        Lokacija
            .findById(idLokacije)
            .select('komentarji')
            .exec((napaka, lokacija) => {
                if (napaka) {
                    res.status(400).json(napaka);
                } else {
                    dodajRezervacijo(req, res, lokacija);
                }
            });
    } else {
        res.status(400).json({
            "sporočilo":
                "Ne najdem lokacije, idLokacije je obvezen parameter."
        });
    }
};
const dodajRezervacijo = (req, res, lokacija) => {
    if (!lokacija) {
        res.status(404).json({ "sporočilo": "Ne najdem lokacije." });
    } else {
        lokacija.komentarji.push({
            avtor: req.body.naziv,
            ocena: req.body.ocena,
            besediloKomentarja: req.body.komentar,
            cost: req.body.cost
        });
        lokacija.save((napaka, lokacija) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                const dodaniKomentar = lokacija.komentarji.slice(-1).pop();
                res.status(201).json(dodaniKomentar);
            }
        });
    }
}

module.exports = {
    lokacijeSeznamPoRazdalji,
    lokacijeKreiraj,
    rezervacijeKreiraj,
    lokacijePreberiIzbrano,
    lokacijePosodobiIzbrano,
    lokacijeIzbrisiIzbrano
};