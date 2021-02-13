const passport = require('passport');
const mongoose = require('mongoose');
const LokalnaStrategija = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
  clientID: "897848448322-vsfu67qmcb17irqkejmj3v2t68119lq0.apps.googleusercontent.com",
  clientSecret: "yHDjNarPnU4CY9lMgta4M6v8",
  callbackURL: "http://localhost:3000/api/google/callback",
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