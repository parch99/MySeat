var express = require('express');
var router = express.Router();

const homepage = require('../controllers/index');
const ctrlLokacije = require("../controllers/lokacije");
const ctrlUser = require("../controllers/users");
const ctrlDb = require("../controllers/db");

router.get('/list', ctrlLokacije.seznam);
router.get('/lokacija/:idLokacije', ctrlLokacije.podrobnostiLokacije);
router.get('/uporabnik/:idUporabnika', ctrlUser.userpod);
router.get('/lastnik/:idUporabnika', ctrlUser.ownerpod);

router
  .route('/lokacija/:idLokacije/order/nov')
  .get(ctrlLokacije.prikaziObrazecZaRezervacijo)
  .post(ctrlLokacije.shraniRezervacijo);

router
  .route('/list/lokacija-nov-restoran')
  .get(ctrlLokacije.prikaziObrazecZaRestoran)
  .post(ctrlLokacije.shraniRestoran);

router
  .route('/lokacija/:idLokacije/komentar/nov')
  .get(ctrlLokacije.dodajKomentar)
  .post(ctrlLokacije.shraniKomentar);

router.get('/', homepage.informacije);
router.get('/signup', ctrlUser.dodajUporabnika);
router.get('/login', ctrlUser.overiUporabnika);
router.get('/db', ctrlDb.izbrisiPodatke);
router.get('/db', ctrlDb.uvoziPodatke);

router.get('/about', homepage.infoAbout);
router.get('/map', homepage.mappage);

module.exports = router;
