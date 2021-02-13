const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  schemas:
 *   RecentlyVisitedShema:
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *     ocena:
 *      type: Number
 *     cost:
 *      type: Number
 *     
 * 
 *   UporabnikiShema:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     spol:
 *      type: string
 *     elektronskiNaslov:
 *      type: string
 *     zgoscenaVrednost:
 *      type: string
 *     nakljucnaVrednost:
 *      type: string
 *     lastnik: 
 *      type: string
 *     recentlyVisited:
 *      type: recentlyVisited
*/

/**
 * @swagger
 * components:
 *  schemas:
 *   UporabnikPrijava:
 *    type: object
 *    description: Podatki uporabnika za prijavo
 *    properties:
 *     elektronskiNaslov:
 *      type: string
 *      description: elektronski naslov
 *      example: dejan@lavbic.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - elektronskiNaslov
 *     - geslo
 *   UporabnikRegistracija:
 *    type: object
 *    description: Podatki uporabnika za registracijo
 *    properties:
 *     ime:
 *      type: string
 *      description: ime
 *      writeOnly: true
 *      example: Dejan Lavbič
 *     elektronskiNaslov:
 *      type: string
 *      description: elektronski naslov
 *      example: dejan@lavbic.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - ime
 *     - elektronskiNaslov
 *     - geslo
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Parametri so obvezni.
 *   UporabnikBranjePodrobnosti:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 5ded18eb51386c3799833191
 *     ime:
 *      type: string
 *      example: Donald Trump
 *     RecentlyVisited:
 *      type: array
 *      items:
 *       type: RecentlyVisited
 *      example:
 *       - _id: 5de111349b2fa34e130eb6be
 *         naziv: Taj Mahal
 *         ocena: 4
 *         cost: 3
 *       - _id: 5de111349b2fa34e120eg9fk
 *         naziv: Foculus
 *         ocena: 1
 *         cost: 3
 *    required:
 *     - _id
 *     - ime
 */

 /**
 * @swagger
 * components:
 *  schemas:
 *   UporabnikNewsletter:
 *    type: object
 *    description: elektronski naslov uporabnika
 *    properties:
 *     elektronskiNaslov:
 *      type: string
 *      description: elektronski naslov
 *      example: dejan@lavbic.net
 *    required:
 *     - elektronskiNaslov
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Parametri so obvezni.
 */

const recentlyVisitedShema = new mongoose.Schema({
  naziv: { type: String },
  ocena: { type: Number, "default": 0, min: 0, max: 5 },
  cost: { type: Number, "default": 0, min: 0, max: 3 }
});
const uporabnikiShema = new mongoose.Schema({
  ime: { type: String, required: true },
  spol: { type: String },
  elektronskiNaslov: { type: String, unique: true, required: true },
  email_verified: { type: Boolean, default: false },
  verify_token: { type: String, default: null }, // NodeMailer
  reset_token: {type: String, default: null},
  reset_token_exp: { type: Date },
  zgoscenaVrednost: { type: String }, // change to required
  nakljucnaVrednost: { type: String }, // change to required
  recentlyVisited: [recentlyVisitedShema]
});
uporabnikiShema.methods.nastaviGeslo = function (geslo) {
  this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
  this.zgoscenaVrednost = crypto
    .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
    .toString('hex');
};
uporabnikiShema.methods.preveriGeslo = function (geslo) {
  let zgoscenaVrednost = crypto
    .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
    .toString('hex');
  return this.zgoscenaVrednost == zgoscenaVrednost;
};
uporabnikiShema.methods.generirajJwt = function () {
  const datumPoteka = new Date();
  datumPoteka.setDate(datumPoteka.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    elektronskiNaslov: this.elektronskiNaslov,
    ime: this.ime,
    exp: parseInt(datumPoteka.getTime() / 1000, 10)
  }, process.env.JWT_GESLO);
};


mongoose.model('Uporabnik', uporabnikiShema, 'Uporabniki');

/**
 * @swagger
 *  components:
 *   examples:
 *    NeNajdemLokacije:
 *     summary: ne najdem lokacije
 *     value:
 *      sporočilo: Ne najdem lokacije.
 *    NeNajdemKomentarja:
 *     summary: ne najdem komentarja
 *     value:
 *      sporočilo: Ne najdem komentarja.
 *    NeNajdemUporabnika:
 *     summary: ne najdem Uporabnika
 *     value:
 *      sporočilo: Ne najdem Uporabnika.
 *    NiNobenegaKomentarja:
 *     summary: ni nobenega komentarja
 *     value:
 *      sporočilo: Ni nobenega komentarja.
 *    NiZetona:
 *     summary: ni JWT žetona
 *     value:
 *      sporočilo: "UnauthorizedError: No authorization token was found."
 *    VsiPodatki:
 *     summary: zahtevani so vsi podatki
 *     value:
 *      sporočilo: Zahtevani so vsi podatki.
 *    EMailNiUstrezen:
 *     summary: elektronski naslov ni ustrezen
 *     value:
 *      sporočilo: Elektronski naslov ni ustrezen!
 */