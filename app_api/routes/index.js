const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const { expressjwt: jwt } = require('express-jwt');

const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  requestProperty: 'payload',
  algorithms: ['HS256']
});

const ctrlLokacije = require('../controllers/lokacije');
const ctrlKomentarji = require('../controllers/komentarji');
const ctrlUporabniki = require('../controllers/uporabniki');
const ctrlNaslovi = require('../controllers/naslovi');
const ctrlDb = require('../controllers/db');
const ctrlAvtentikacija = require('../controllers/avtentikacija');

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Lokacije
 *    description: Obvladovanje lokacij
 *  - name: Komentarji
 *    description: Obvladovanje komentarjev v okviru lokacij
 *  - name: Avtentikacija
 *    description: Obvladovanje uporabnikov
 *  - name: Uporabniki
 *    description: Obvladovanje uporabnikov
 *  - name: Naslovi
 *    description: Obvladovanje elektronskih naslovov
 */

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

/* Lokacije */
router.route('/list/lokacije')
  /**
   * @swagger
   *  /list/lokacije:
   *   get:
   *    summary: Seznam bližnjih lokacij
   *    description: Pridobitev **seznama bližnjih lokacij**, glede na **trenutno lokacijo**, podano z zemljepisno dolžino in širino ter **radijem iskanja**.
   *    tags: [Lokacije]
   *    parameters:
   *     - in: query
   *       name: lat
   *       description: zemljepisna širina trenutne lokacije
   *       schema:
   *        type: number
   *       required: true
   *       example: 46.050193
   *     - in: query
   *       name: lng
   *       description: zemljepisna dolžina trenutne lokacije
   *       schema:
   *        type: number
   *       required: true
   *       example: 14.468910
   *     - in: query
   *       name: maxRazdalja
   *       description: razdalja iskanja bližnjih lokacij v km
   *       schema:
   *        type: number
   *       example: 100
   *    responses:
   *     "200":
   *      description: Uspešna zahteva s seznamom najdenih lokacij v rezultatu.
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/LokacijaBranjePovzetek"
   *     "400":
   *      description: Napaka zahteve, manjkajo obvezni parametri.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Napaka"
   *        example:
   *         sporočilo: Parametra lng in lat sta obvezna.
   *     "500":
   *      description: Napaka na strežniku pri dostopu do podatkovne baze.
   */
  .get(ctrlLokacije.lokacijeSeznamPoRazdalji)
  /**
 * @swagger
 *  /list/lokacije:
 *   post:
 *    summary: Dodajanje nove lokacije
 *    description: Dodajanje **nove lokacije** s podatki o nazivu, naslovu, lastnostih, GPS koordinatah ter delovnem času.
 *    tags: [Lokacije]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o lokaciji
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/LokacijaAzuriranjePovzetekZahteva"
 *    responses:
 *     "201":
 *      description: Uspešno dodana lokacija, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/LokacijaAzuriranjePovzetekOdgovor"
 *     "400":
 *      description: Napaka pri shranjevanju lokacije.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 */
  .post(avtentikacija, ctrlLokacije.lokacijeKreiraj);
/**
* @swagger
*  /lokacije/{idLokacije}:
*   get:
*    summary: Podrobnost izbrane lokacije
*    description: Pridobitev **podrobnosti izbrane lokacije** s podatki o nazivu, naslovu, koordinatah, oceni, lastnostih, delovnem času in komentarjih.
*    tags: [Lokacije]
*    parameters:
*     - in: path
*       name: idLokacije
*       description: enolični identifikator lokacije
*       schema:
*        type: string
*       required: true
*       example: 5ded18eb51386c3799833191
*    responses:
*     "200":
*      description: Uspešna zahteva s podrobnostmi zahtevane lokacije v rezultatu.
*      content:
*       application/json:
*        schema:
*          $ref: "#/components/schemas/LokacijaBranjePodrobnosti"
*     "404":
*      description: Napaka zahteve, zahtevane lokacije ni mogoče najti.
*      content:
*       application/json:
*        schema:
*         $ref: "#/components/schemas/Napaka"
*        examples:
*         ne najdem lokacije:
*          $ref: "#/components/examples/NeNajdemLokacije"
*     "500":
*      description: Napaka na strežniku pri dostopu do podatkovne baze.
*/
router.route('/lokacije/:idLokacije')
  .get(ctrlLokacije.lokacijePreberiIzbrano)
  /**
 * @swagger
 *  /lokacije/{idLokacije}:
 *   put:
 *    summary: Posodabljanje izbrane lokacije
 *    description: Posodobitev **podrobnosti izbrane lokacije** s podatki o nazivu, naslovu, koordinatah, oceni, lastnostih ter delovnem času.
 *    tags: [Lokacije]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o lokaciji
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/LokacijaAzuriranjePovzetekZahteva"
 *    parameters:
 *     - in: path
 *       name: idLokacije
 *       description: enolični identifikator lokacije
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Uspešno posodobljena lokacija, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/LokacijaAzuriranjePovzetekOdgovor"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve pri ažuriranju lokacije
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemLokacije"
 *     "500":
 *      description: Napaka pri dostopu do podatkovne baze.
 */
  .put(avtentikacija, ctrlLokacije.lokacijePosodobiIzbrano)
  /**
 * @swagger
 *  /lokacije/{idLokacije}:
 *   delete:
 *    summary: Brisanje izbrane lokacije
 *    description: Brisanje **izbrane lokacije**.
 *    tags: [Lokacije]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idLokacije
 *       description: enolični identifikator lokacije
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisana lokacija.
 *     "404":
 *      description: Napaka zahteve, zahtevanega komentarja ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemLokacije"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "500":
 *      description: Napaka pri brisanju lokacije.
 */
  .delete(avtentikacija, ctrlLokacije.lokacijeIzbrisiIzbrano);

/* Rezervacije */
//router.post('/lokacije/:idLokacije/komentarji', ctrlLokacije.rezervacijeKreiraj);

/* Komentarji */
router.route('/lokacije/:idLokacije/komentarji')
  /**
   * @swagger
   *  /lokacije/{idLokacije}/komentarji:
   *   post:
   *    summary: Dodajanje novega komentarja izbrani lokaciji
   *    description: Dodajanje **novega komentarja** s podatki o avtorju, oceni in besedilom komentarja **izbrani lokaciji** s podanim enoličnim identifikatorjem.
   *    tags: [Komentarji]
   *    security:
   *     - jwt: []
   *    parameters:
   *     - in: path
   *       name: idLokacije
   *       description: enolični identifikator lokacije
   *       schema:
   *        type: string
   *       required: true
   *       example: 5ded18eb51386c3799833191
   *    requestBody:
   *     description: Podatki o komentarju
   *     required: true
   *     content:
   *      application/x-www-form-urlencoded:
   *       schema:
   *        $ref: "#/components/schemas/KomentarAzuriranje"
   *    responses:
   *     "201":
   *      description: Uspešno dodan komentar, ki se vrne v rezultatu.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/KomentarBranje"
   *     "400":
   *      description: Napaka pri shranjevanju komentarja.
   *     "401":
   *      description: Napaka pri dostopu.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Napaka"
   *        examples:
   *         ni zetona:
   *          $ref: "#/components/examples/NiZetona"
   *     "404":
   *      description: Napaka zahteve, zahtevane lokacije ni mogoče najti.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Napaka"
   *        examples:
   *         ne najdem lokacije:
   *          $ref: "#/components/examples/NeNajdemLokacije"
   */
  .post(avtentikacija, ctrlKomentarji.komentarjiKreiraj);
router.route('/lokacije/:idLokacije/komentarji/:idKomentarja')
  /**
   * @swagger
   *  /lokacije/{idLokacije}/komentarji/{idKomentarja}:
   *   get:
   *    summary: Podrobnost izbranega komentarja določene lokacije
   *    description: Pridobitev **podrobnosti komentarja določene lokacije** s podatki o enoličnem identifikatorju, datumu, avtorju, oceni, ceni in besedilu komentarja.
   *    tags: [Komentarji]
   *    parameters:
   *     - in: path
   *       name: idLokacije
   *       description: enolični identifikator lokacije
   *       schema:
   *        type: string
   *       required: true
   *       example: 5ded18eb51386c3799833191
   *     - in: path
   *       name: idKomentarja
   *       description: enolični identifikator komentarja
   *       schema:
   *        type: string
   *       required: true
   *    responses:
   *     "200":
   *      description: Uspešna zahteva s podrobnostmi lokacije v rezultatu.
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/KomentarLokacija"
   *     "404":
   *      description: Napaka zahteve, komentar ne obstaja.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Napaka"
   *        examples:
   *         ne najdem lokacije:
   *           $ref: "#/components/examples/NeNajdemLokacije"
   *         ne najdem komentarja:
   *           $ref: "#/components/examples/NeNajdemKomentarja"
   *         ni nobenega komentarja:
  *           $ref: "#/components/examples/NiNobenegaKomentarja"
   *     "500":
   *      description: Napaka na strežniku pri dostopu do podatkovne baze.
   */
  .get(ctrlKomentarji.komentarjiPreberiIzbranega)
  /**
 * @swagger
 *  /lokacije/{idLokacije}/komentarji/{idKomentarja}:
 *   put:
 *    summary: Posodabljanje izbranega komentarja določene lokacije
 *    description: Posodobitev **komentarja izbrane lokacije** s podatki o avtorju, oceni in besedilu komentarja.
 *    tags: [Komentarji]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idLokacije
 *       description: enolični identifikator lokacije
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *     - in: path
 *       name: idKomentarja
 *       description: enolični identifikator komentarja
 *       schema:
 *        type: string
 *       required: true
 *    requestBody:
 *     description: Podatki o komentarju
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/KomentarAzuriranje"
 *    responses:
 *     "200":
 *      description: Uspešno spremenjen komentar, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/KomentarBranje"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevane lokacije oz. komentarja ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemLokacije"
 *         ne najdem komentarja:
 *          $ref: "#/components/examples/NeNajdemKomentarja"
 *     "500":
 *      description: Napaka pri iskanju lokacije.
 */
  .put(avtentikacija, ctrlKomentarji.komentarjiPosodobiIzbranega)
  /**
 * @swagger
 *  /lokacije/{idLokacije}/komentarji/{idKomentarja}:
 *   delete:
 *    summary: Brisanje izbranega komentarja določene lokacije
 *    description: Brisanje **komentarja izbrane lokacije**.
 *    tags: [Komentarji]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idLokacije
 *       description: enolični identifikator lokacije
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idKomentarja
 *       description: enolični identifikator komentarja
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan komentar.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevane lokacije oz. komentarja ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemLokacije"
 *         ne najdem komentarja:
 *          $ref: "#/components/examples/NeNajdemKomentarja"
 *     "500":
 *      description: Napaka pri iskanju lokacije oz. brisanju komentarja.
 */
  .delete(avtentikacija, ctrlKomentarji.komentarjiIzbrisiIzbranega);

/* Avtentikacija */
/**
 * @swagger
 *   /registracija:
 *     post:
 *       summary: Registracija novega uporabnika
 *       description: Registracija **novega uporabnika** s podatki o imenu, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za registracijo
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikRegistracija"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             examples:
 *              vsi podatki:
 *               $ref: "#/components/examples/VsiPodatki"
 *              elektronski naslov ni ustrezen:
 *               $ref: "#/components/examples/EMailNiUstrezen"
 *         "409":
 *          description: Napaka zahteve, uporabnik že obstaja.
 *          content:
 *           application/json:
 *            schema:
 *             $ref: "#/components/schemas/Napaka"
 *            example:
 *             sporočilo: Uporabnik s tem elektronskim naslovom je že registriran.
 *         "500":
 *          description: Napaka na strežniku pri registraciji uporabnika.            
 */
router.post('/registracija', ctrlAvtentikacija.registracija);
/**
 * @swagger
 *   /prijava:
 *     post:
 *       summary: Prijava obstoječega uporabnika
 *       description: Prijava **obstoječega uporabnika** z elektronskim naslovom in geslom.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Prijavni podatki
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikPrijava"
 *       responses:
 *         "200":
 *           description: Uspešna prijava uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Zahtevani so vsi podatki.
 *         "401":
 *           description: Napaka pri prijavi uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               examples:
 *                 uporabniško ime:
 *                   value:
 *                     sporočilo: Napačno uporabniško ime.
 *                   summary: napačno uporabniško ime
 *                 geslo:
 *                   value:
 *                     sporočilo: Napačno geslo.
 *                   summary: napačno geslo
 *         "500":
 *           description: Napaka na strežniku pri preverjanju uporabnika.
 */
router.post('/prijava', ctrlAvtentikacija.prijava);

/* Uporabniki */
router.get('/uporabniki', avtentikacija, ctrlUporabniki.uporabnikiSeznam);

/**
* @swagger
*  /uporabnik/{idUporabnika}:
*   get:
*    summary: Podrobnost dolocenega Uporabnika
*    description: Pridobitev **podrobnosti dolocenega Uporabnika** s podatki kot njegovim imenom in restavracij ki jih je nedavno obiskal.
*    tags: [Uporabniki]
*    parameters:
*     - in: path
*       name: idUporabnika
*       description: enolični identifikator Uporabnika
*       schema:
*        type: string
*       required: true
*       example: 5ff1e5ad3df71f12d8b3fb84
*    responses:
*     "200":
*      description: Uspešna zahteva s podrobnostmi zahtevanega Uporabnika v rezultatu.
*      content:
*       application/json:
*        schema:
*          $ref: "#/components/schemas/UporabnikBranjePodrobnosti"
*     "404":
*      description: Napaka zahteve, zahtevani Uporabnik ni mogoče najti.
*      content:
*       application/json:
*        schema:
*         $ref: "#/components/schemas/Napaka"
*        examples:
*         ne najdem Uporabnika:
*          $ref: "#/components/examples/NeNajdemUporabnika"
*     "500":
*      description: Napaka na strežniku pri dostopu do podatkovne baze.
*/
router.get('/uporabnik/:idUporabnika', ctrlUporabniki.uporabnikiPreberi);

router.put('/uporabnik/:idUporabnika', ctrlUporabniki.uporabnikiPosodobi);
router.delete('/uporabnik/: idUporabnika', ctrlUporabniki.uporabnikiIzbrisi);

/* Newsletter */
/**
 * @swagger
 *   /newsletter:
 *     post:
 *       summary: Prijava na weekly newsletter
 *       description: Prijava uporabnika z elektronskim naslovom na weekly newsletter.
 *       tags: [Naslovi]
 *       requestBody:
 *         description: Elektronski Naslov
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikNewsletter"
 *       responses:
 *         "201":
 *           description: Uspešna prijava na weekly newsletter.
 *         "400":
 *           description: Elektronski naslov ni ustrezen!.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Elektronski naslov ni ustrezen!.
 */
router.post('/newsletter', ctrlNaslovi.naslovKreiraj);

/* DB */
router.post('/db-izbrisi', ctrlDb.izbrisiPodatke);
router.post('/db-uvozi', ctrlDb.uvoziPodatke);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false, }),
   function(req,res){
      if(req.user){
        return res.redirect(303, 'https://myseat.fly.dev/prijava/google/' +req.user.generirajJwt());
      } else {
        return res.status(400).json({message:"Not found"});
      }
});
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', session: false, }),
   function(req,res){
      if(req.user){
        return res.redirect(303, 'https://myseat.fly.dev/prijava/facebook/' +req.user.generirajJwt());
      } else {
        return res.status(400).json({message:"Not found"});
      }
});
router.post('/send-recovery-email', ctrlAvtentikacija.sendRecoveryEmail);
router.get('/reset-password/:token', ctrlAvtentikacija.resetPasswordGetuserid);
router.post('/reset-password', ctrlAvtentikacija.resetPassword);
module.exports = router;