const mongoose = require('mongoose');
const Lokacija = mongoose.model('Lokacija');
const Uporabnik = mongoose.model('Uporabnik');

const vrniAvtorja = (req, res, pkOdgovor) => {
  if (req.payload && req.payload.elektronskiNaslov) {
    Uporabnik
      .findOne({elektronskiNaslov: req.payload.elektronskiNaslov})
      .exec((napaka, uporabnik) => {
        if (!uporabnik)
          return res.status(404).json({"sporočilo": "Ne najdem uporabnika"});
        else if (napaka)
          return res.status(500).json(napaka);
        pkOdgovor(req, res, uporabnik.ime);
      });
  } else {
    return res.status(400).json({"sporočilo": "Ni podatka o uporabniku"});
  }
};

const komentarjiKreiraj = (req, res) => {
  vrniAvtorja(req, res, (req, res, imeUporabnika) => {
    const idLokacije = req.params.idLokacije;
    if (idLokacije) {
      Lokacija
        .findById(idLokacije)
        .select('komentarji')
        .exec((napaka, lokacija) => {
          if (napaka) {
            res.status(400).json(napaka);
          } else {
            dodajKomentar(req, res, lokacija, imeUporabnika);
          }
        });
    } else {
      res.status(400).json({
        "sporočilo": 
          "Ne najdem lokacije, idLokacije je obvezen parameter."
      });
    }
  });
};
const komentarjiPreberiIzbranega = (req, res) => {
    Lokacija
        .findById(req.params.idLokacije)
        .select('naziv komentarji')
        .exec((napaka, lokacija) => {
            if (!lokacija) {
                return res.status(404).json({
                    "sporočilo":"Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (lokacija.komentarji && lokacija.komentarji.length > 0) {
                const komentar = lokacija.komentarji.id(req.params.idKomentarja);
                if (!komentar) {
                    return res.status(404).json({
                        "sporočilo":"Ne najdem komentarja s podanim enoličnim identifikatorjem idKomentarja."
                    });
                } else {
                    res.status(200).json({
                        "lokacija": {
                            "naziv": lokacija.naziv,
                            id: req.params.idLokacije
                        },
                        "komentar": komentar
                    });
                }
            } else {
                return res.status(404).json({
                    "sporočilo":"Ne najdem nobenega komentarja"
                });
            }
        });
};
const komentarjiPosodobiIzbranega = (req, res) => {
    if (!req.params.idLokacije || !req.params.idKomentarja) {
        return res.status(404).json({
            "sporočilo":"Ne najdem lokacije oz. komentarja, " + "idLokacije in idKomentarja sta obvezna parametra."
        });
    }
    Lokacija
        .findById(req.params.idLokacije)
        .select('komentarji')
        .exec((napaka, lokacija) => {
            if (!lokacija) {
                console.log("---------------------------");
                return res.status(404).json({ "sporočilo": "Ne najdem lokacije." });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (lokacija.komentarji && lokacija.komentarji.length > 0) {
                const trenutniKomentar = lokacija.komentarji.id(req.params.idKomentarja);
                if (!trenutniKomentar) {
                    console.log("--------------tren-------------");
                    res.status(404).json({ "sporočilo": "Ne najdem komentarja." });
                } else {
                    if(req.body.ocena)
                      trenutniKomentar.ocena = req.body.ocena;
                    if(req.body.komentar)
                      trenutniKomentar.besediloKomentarja = req.body.komentar;
                    lokacija.save((napaka, lokacija) => {
                        if (napaka) {
                            console.log("--------------najd-------------");
                            res.status(404).json(napaka);
                        } else {
                            posodobiPovprecnoOceno(lokacija._id);
                            res.status(200).json(trenutniKomentar);
                        }
                    });
                }
            }
        });
};
const komentarjiIzbrisiIzbranega = (req, res) => {
    const { idLokacije, idKomentarja } = req.params;
    if (!idLokacije || !idKomentarja) {
        return res.status(404).json({
            "sporočilo":"Ne najdem lokacije oz. komentarja, " + "idLokacije in idKomentarja sta obvezna parametra."
        });
    }
    Lokacija
        .findById(idLokacije)
        .select('komentarji')
        .exec((napaka, lokacija) => {
            if (!lokacija) {
                return res.status(404).json({ "sporočilo": "Ne najdem lokacije." });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (lokacija.komentarji && lokacija.komentarji.length > 0) {
                lokacija.komentarji.id(idKomentarja).remove();
                lokacija.save((napaka) => {
                    if (napaka) {
                        return res.status(500).json(napaka);
                    } else {
                        posodobiPovprecenCost(lokacija._id);
                        posodobiPovprecnoOceno(lokacija._id);
                        res.status(204).json(null);
                    }
                });
            } else {
                res.status(404).json({ "sporočilo": "Ni komentarja za brisanje." });
            }
        });
};
const dodajKomentar = (req, res, lokacija, avtor) => {
    if (!lokacija) {
        res.status(404).json({ "sporočilo": "Ne najdem lokacije." });
    } else {
        lokacija.komentarji.push({
            avtor: avtor,
            ocena: req.body.ocena,
            besediloKomentarja: req.body.komentar,
            cost: req.body.cost
        });
        lokacija.save((napaka, lokacija) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                posodobiPovprecnoOceno(lokacija._id);
                posodobiPovprecenCost(lokacija._id);
                const dodaniKomentar = lokacija.komentarji.slice(-1).pop();
                res.status(201).json(dodaniKomentar);
            }
        });
    }
};


const posodobiPovprecnoOceno = (idLokacije) => {
    Lokacija
      .findById(idLokacije)
      .select('ocena komentarji')
      .exec((napaka, lokacija) => {
        if (!napaka)
          izracunajPovprecnoOceno(lokacija);
      });
};
const izracunajPovprecnoOceno = (lokacija) => {
    if (lokacija.komentarji && lokacija.komentarji.length > 0) {
      const steviloKomentarjev = lokacija.komentarji.length;
      const skupnaOcena = lokacija.komentarji.reduce((vsota, {ocena}) => {
        return vsota + ocena;
      }, 0);
      lokacija.ocena = parseInt(skupnaOcena / steviloKomentarjev, 10);
      lokacija.save((napaka) => {
        if (napaka) {
          console.log(napaka);
        } else {
          console.log(`Povprečna ocena je posodobljena na ${lokacija.ocena}.`);
        }
      });
    }
};
const posodobiPovprecenCost = (idLokacije) => {
    Lokacija
      .findById(idLokacije)
      .select('cost komentarji')
      .exec((napaka, lokacija) => {
        if (!napaka)
          izracunajPovprecenCost(lokacija);
      });
};
const izracunajPovprecenCost = (lokacija) => {
    if (lokacija.komentarji && lokacija.komentarji.length > 0) {
      const steviloKomentarjev = lokacija.komentarji.length;
      const skupenCost = lokacija.komentarji.reduce((vsota, {cost}) => {
        return vsota + cost;
      }, 0);
      lokacija.cost = parseInt(skupenCost / steviloKomentarjev, 10);
      lokacija.save((napaka) => {
        if (napaka) {
          console.log(napaka);
        } else {
          console.log(`Povprečen cost je posodobljena na ${lokacija.cost}.`);
        }
      });
    }
};

module.exports = {
    komentarjiKreiraj,
    komentarjiPreberiIzbranega,
    komentarjiPosodobiIzbranega,
    komentarjiIzbrisiIzbranega
};