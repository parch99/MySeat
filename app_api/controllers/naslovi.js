const mongoose = require('mongoose');
const Naslov = mongoose.model('Naslov');

const naslovKreiraj = (req, res) => {
    if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.elektronskiNaslov))) {
        return res.status(400).json({"sporočilo": "Elektronski naslov ni ustrezen!"});
    }
    Naslov.findOne({elektronskiNaslov: req.body.elektronskiNaslov})
        .then(naslov => {
            if(naslov) 
              return res.status(404).json({"sporočilo": "User with this email address has already subscribed"});
            else {
                Naslov.create({
                    elektronskiNaslov: req.body.elektronskiNaslov
                }, (napaka, naslov) => {
                    if (napaka) {
                        console.log(napaka);
                        res.status(400).json(napaka);
                    } else {
                        res.status(201).json(naslov);
                    }
                });
            }
        });
};


module.exports = {
    naslovKreiraj
};