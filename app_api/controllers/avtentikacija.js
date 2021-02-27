const passport = require('passport');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('express-jwt');

const registracija = (req, res) => {
    if (!req.body.ime || !req.body.elektronskiNaslov || !req.body.geslo) {
      return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    } else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.elektronskiNaslov))) {
      return res.status(400).json({"sporočilo": "Elektronski naslov ni ustrezen!"});
    }
    const uporabnik = new Uporabnik();
    uporabnik.ime = req.body.ime;
    uporabnik.elektronskiNaslov = req.body.elektronskiNaslov;
    uporabnik.email_verified = false;
    uporabnik.nastaviGeslo(req.body.geslo);
    uporabnik.save(napaka => {
      if (napaka) {
        if (napaka.name == "MongoError" && napaka.code == 11000) {
          res.status(409).json({
            "sporočilo": "User with this email address is already registered"
          });
        } else {
          res.status(500).json(napaka);
        }
      } else {
        res.status(200).json({"žeton": uporabnik.generirajJwt()});
      }
    });
};

const prijava = (req, res) => {
  if (!req.body.elektronskiNaslov || !req.body.geslo) {
    return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
  } else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.elektronskiNaslov))) {
    return res.status(400).json({"sporočilo": "Elektronski naslov ni ustrezen!"});
  }
  passport.authenticate('local', (napaka, uporabnik, informacije) => {
    if (napaka)
      return res.status(500).json(napaka);
    if (uporabnik) {
      res.status(200).json({"žeton": uporabnik.generirajJwt()});
    } else {
      res.status(401).json(informacije);
    }
  })(req, res);
}

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'stefi__stefan@hotmail.com',
    pass: process.env.HOTMAILPW
  }
});

const sendRecoveryEmail = (req, res) => {
  if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.elektronskiNaslov)))
     return res.status(400).json({"sporočilo": "This is not a valid email address"});
  const resettoken = crypto.randomBytes(32).toString('hex');
  Uporabnik.findOne({elektronskiNaslov: req.body.elektronskiNaslov})
    .then(user => {
      if(!user){
        return res.status(404).json({"sporočilo": "User with this email address does not exist"});
      }
      user.reset_token = resettoken;
      user.reset_token_exp = Date.now() + 1200000;
      user.save().then((result) => {
        transporter.sendMail({
          to:user.elektronskiNaslov,
          from:'"MySeat" <stefi__stefan@hotmail.com>',
          subject:"Password Reset", // CHANGE URL ON DEPLOY
          html:`<h3>You requested a password reset on MySeat</h3> 
          <h3>Click on this <a href="https://myseat-sp-2020-2021.herokuapp.com/reset/${resettoken}">link</a> to proceed, If this
          was not requested by you please take action and change your password</h3>
          <h3>It will expire in 20 minutes`
        }) 
        res.json({"sporočilo": "Check your email for password reset"});
      })
    })
}
const resetPassword = (req, res) => {
  if (!req.body.elektronskiNaslov || !req.body.geslo)
    return res.status(400).json({"sporočilo": "All fields are required"});
  if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.elektronskiNaslov)))
    return res.status(400).json({"sporočilo": "This is not a valid email address"});
  Uporabnik.findOne({elektronskiNaslov: req.body.elektronskiNaslov})
    .then(user => {
      if(!user) 
        return res.status(404).json({"sporočilo": "User with this email address does not exist"});
      if(user.reset_token_exp <= new Date()){
        return res.status(404).json({"sporočilo": "Token has expired"});
      }
      user.nastaviGeslo(req.body.geslo);
      user.save(error => {
        if (error) {
          if (error.name == "MongoError" && error.code == 11000)
            res.status(409).json({"sporočilo": "User with this email address is already registered"});
          else
            res.status(500).json(error);
        } else
          res.status(200).json({"sporočilo": "Password changed successfully"});
      });
    });
}
const resetPasswordGetuserid = (req, res) => {
  Uporabnik.findOne({reset_token: req.params.token}).then( user => {
    if(!user) return res.status(404).json({message: 'User not found'}); //check if correct return
    if(user.reset_token_exp <= new Date()){
      return res.status(401).json({"sporočilo": "Token has expired"});
    } else {
      return res.status(200).json({user: user});
    }
  })
}

module.exports = {
  registracija,
  prijava,
  sendRecoveryEmail,
  resetPassword,
  resetPasswordGetuserid
};