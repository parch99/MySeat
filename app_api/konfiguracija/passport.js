const passport = require('passport');
const mongoose = require('mongoose');
const LokalnaStrategija = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Uporabnik = mongoose.model('Uporabnik');

passport.use(
  new LokalnaStrategija(
    {
      usernameField: 'elektronskiNaslov',
      passwordField: 'geslo'
    },
    (uporabniskoIme, geslo, pkKoncano) => {
      Uporabnik.findOne(
        { elektronskiNaslov: uporabniskoIme },
        (napaka, uporabnik) => {
          if (napaka)
            return pkKoncano(napaka);
          if (!uporabnik) {
            return pkKoncano(null, false, {
              "sporočilo": "Napačno uporabniško ime"
            });
          }
          if (!uporabnik.preveriGeslo(geslo)) {
            return pkKoncano(null, false, {
              "sporočilo": "Napačno geslo"
            });
          }
          return pkKoncano(null, uporabnik);
        }
      );
    }
  )
);

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://myseat.fly.dev/api/google/callback",
  profileFields: ["id", "displayName", "email"],
},
function(accessToken, refreshToken, profile, done) {
  Uporabnik.findOne({elektronskiNaslov: profile._json.email}).then((currentUser)=>{
    if(currentUser){
      //if we already have a record with the given email
      done(null, currentUser);
    } else{
        //if not, create a new user 
        new Uporabnik({
          elektronskiNaslov: profile._json.email,
          ime: profile._json.name,
          email_verified: true,
        }).save().then((novUporabnik) =>{
          done(null, novUporabnik);
        });
    } 
  })
}
));

passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID_FB,
  clientSecret: process.env.CLIENT_SECRET_FB,
  callbackURL: "https://myseat.fly.dev/api/facebook/callback",
  profileFields: ["id", "displayName", "email"],
},
function(accessToken, refreshToken, profile, done) {
  Uporabnik.findOne({elektronskiNaslov: profile._json.email}).then((currentUser)=>{
    if(currentUser){
      //if we already have a record with the given email
      done(null, currentUser);
    } else{
        //if not, create a new user 
        new Uporabnik({
          elektronskiNaslov: profile._json.email,
          ime: profile._json.name,
          email_verified: true,
        }).save().then((novUporabnik) =>{
          done(null, novUporabnik);
        });
    } 
  })
}
));