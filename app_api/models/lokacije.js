const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   WorkingHoursShema:
 *    type: object
 *    properties:
 *     Monday:
 *      type: string
 *     Tuesday:
 *      type: string
 *     Wednesday:
 *      type: string
 *     Thursday:
 *      type: string
 *     Friday:
 *      type: string
 *     Saturday:
 *      type: string
 *     Sunday:
 *      type: string
 *   RezervacijeShema:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     priimek:
 *      type: string
 *     datum:
 *      type: string
 *     number:
 *      type: Number
*/

const WorkingHoursShema = new mongoose.Schema({
    Monday: { type: String },
    Tuesday: { type: String },
    Wednesday: { type: String },
    Thursday: { type: String },
    Friday: { type: String },
    Saturday: { type: String },
    Sunday: { type: String }
});

/**
 * @swagger
 * components:
 *  schemas:
 *   KomentarAzuriranje:
 *    description: Podatki komentarja pri posodabljanju
 *    type: object
 *    properties:
 *     avtor:
 *      type: string
 *      example: Dejan Lavbič
 *     ocena:
 *      type: integer
 *      minimum: 0
 *      maximum: 5
 *      example: 1
 *     cost:
 *      type: integer
 *      minimum: 0
 *      maximum: 3
 *      example: 1
 *     komentar:
 *      type: string
 *      example: Uff, brez komentarja.
 *    required:
 *     - naziv
 *     - ocena
 *     - cost
 *     - komentar
 *   KomentarBranje:
 *    description: Podatki komentarja pri branju
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 5e04bfb6a3aff223697cbbcb
 *     avtor:
 *      type: string
 *      example: Dejan Lavbič
 *     ocena:
 *      type: integer
 *      minimum: 0
 *      maximum: 5
 *      example: 1
 *     cost:
 *      type: integer
 *      minimum: 0
 *      maximum: 3
 *      example: 1
 *     besediloKomentarja:
 *      type: string
 *      example: Uff, brez komentarja.
 *     datum:
 *      type: string
 *      format: date-time
 *      example: 2019-12-26T14:12:06.488Z
 *    required:
 *     - _id
 *     - avtor
 *     - ocena
 *     - cost
 *     - besediloKomentarja
 *     - datum
 *   KomentarLokacija:
 *    description: Podatki komentarja z nazivom in enoličnim identifikatorjem lokacije
 *    type: object
 *    properties:
 *     lokacija:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        format: uuid
 *        example: 5ded18eb51386c3799833191
 *       naziv:
 *        type: string
 *        example: Trojane
 *      required:
 *       - id
 *       - naziv
 *     komentar:
 *      type: object
 *      $ref: "#/components/schemas/KomentarBranje"
 *    required:
 *     - lokacija
 *     - komentar
 */

 /**
 * @swagger
 * components:
 *  schemas:
 *   KomentarAzuriranje:
 *    description: Podatki komentarja pri ažuriranju
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *      example: Dejan Lavbič
 *     ocena:
 *      type: integer
 *      minimum: 0
 *      maximum: 5
 *      example: 1
 *     cost:
 *      type: integer
 *      minimum: 0
 *      maximum: 3
 *      example: 3
 *     komentar:
 *      type: string
 *      example: Good food.
 *    required:
 *     - naziv
 *     - ocena
 *     - cost
 *     - komentar
 */
const komentarjiShema = new mongoose.Schema({
    avtor: { type: String, required: true },
    ocena: { type: Number, required: true, min: 0, max: 5 },
    cost: { type: Number, required: true, min: 0, max: 3 },
    datum: { type: Date, "default": Date.now },
    besediloKomentarja: { type: String, required: true }
});

/**
 * Sheme podatkov
 * @swagger
 * components:
 *  schemas:
 *   LokacijaBranjePovzetek:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 5ded18eb51386c3799833191
 *     naziv:
 *      type: string
 *      example: Trojane
 *     naslov:
 *      type: string
 *      description: poštni naslov
 *      example: Trojane 11, 1222 Trojane
 *     ocena:
 *      type: integer
 *      description: povprečna ocena vseh komentarjev
 *      example: 4
 *     cost:
 *      type: integer
 *      description: povprečen cost vseh komentarjev
 *      example: 3
 *     razdalja:
 *      type: number
 *      description: razdalja do trenutne lokacije
 *      example: 5200
 *    required:
 *     - _id
 *     - naziv
 *     - naslov
 *     - ocena
 *     - cost
 *     - razdalja
*/
const rezervacijeShema = new mongoose.Schema({
    ime: { type: String, required: true },
    priimek: { type: Number, required: true, min: 0, max: 23 },
    datum: { type: Date, "default": Date.now },
    number: { type: Number, required: true, min: 0, max: 12 }
});

/**
 * Sheme podatkov
 * @swagger
 * components:
 *  schemas:
 *   LokacijaBranjeZahteva:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 5ded18eb51386c3799833191
 *     naziv:
 *      type: string
 *      example: Trojane
 *     naslov:
 *      type: string
 *      description: poštni naslov
 *      example: Trojane 11, 1222 Trojane
 *     ocena:
 *      type: integer
 *      description: povprečna ocena vseh komentarjev
 *      example: 4
 *     cost:
 *      type: integer
 *      description: povprecna vseh atributov cost pri komentarjih
 *      example: 4
 *     razdalja:
 *      type: number
 *      description: razdalja do trenutne lokacije
 *      example: 5200
 *    required:
 *     - _id
 *     - naziv
 *     - naslov
 *     - ocena
 *     - cost
 *     - lastnosti
 *     - razdalja
 *   LokacijaAzuriranjePovzetekZahteva:
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *      description: ime restavracije
 *      example: Trojane
 *     naslov:
 *      type: string
 *      description: poštni naslov
 *      example: Trojane 11, 1222 Trojane
 *     lng:
 *      type: number
 *      description: zemljepisna dolžina
 *      example: 14.883872
 *     lat:
 *      type: number
 *      description: zemljepisna širina
 *      example: 46.188109
 *     mondayfriday:
 *      description: delovni čas od ponedeljek do petek
 *      type: string
 *      example: 10:00 - 18:00
 *     saturday:
 *      description: delovni čas sobota
 *      type: string
 *      example: 10:00 - 18:00
 *     sunday:
 *      description: delovni čas nedelja
 *      type: string
 *      example: 10:00 - 18:00
 *     phone:
 *      description: telefonska stevilka
 *      type: string
 *      example: 069 955 954
 *    required:
 *     - naziv
 *     - naslov
 *     - lng
 *     - lat
 *     - mondayfriday
 *     - saturday
 *     - sunday
 *     - phone
 *   LokacijaAzuriranjePovzetekOdgovor:
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *      description: ime restavracije
 *      example: Trojane
 *     naslov:
 *      type: string
 *      description: poštni naslov
 *      example: Trojane 11, 1222 Trojane
 *     kordinate:
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     WorkingHours:
 *      type: array
 *      items:
 *       type: WorkingHours
 *      example:
 *       - Monday: 10:00 - 18:00
 *       - Tuesday: 10:00 - 18:00
 *       - Wednesday: 10:00 - 18:00
 *       - Thursday: 10:00 - 18:00
 *       - Friday: 10:00 - 18:00
 *       - Saturday: 10:00 - 18:00
 *       - Sunday: 10:00 - 18:00
 *     ocena:
 *      type: integer
 *      description: povprečna ocena vseh komentarjev
 *      example: 5
 *     cost:
 *      type: integer
 *      description: povprečna ocena vseh atributov cost pri komentarjih
 *      example: 3
 *     phone:
 *      type: string
 *      description: telefonska stevilka
 *      example: 069 955 954
 *    required:
 *     - naziv
 *     - naslov
 *     - koordinate
 *     - WorkingHours
 *     - ocena
 *     - cost
 *     - phone
 *   LokacijaBranjePodrobnosti:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 5ded18eb51386c3799833191
 *     naziv:
 *      type: string
 *      example: Trojane
 *     naslov:
 *      type: string
 *      description: poštni naslov
 *      example: Trojane 11, 1222 Trojane
 *     koordinate:
 *      type: array
 *      description: GPS koordinate (zemljepisna dolžina in širina)
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     ocena:
 *      type: integer
 *      description: povprečna ocena vseh komentarjev
 *      example: 4
 *     cost:
 *      type: integer
 *      description: povprečna ocena atributov cost pri komentarjih
 *      example: 4
 *     WorkingHours:
 *      type: array
 *      items:
 *       type: WorkingHours
 *      example:
 *       - Monday: 10:00 - 18:00
 *       - Tuesday: 10:00 - 18:00
 *       - Wednesday: 10:00 - 18:00
 *       - Thursday: 10:00 - 18:00
 *       - Friday: 10:00 - 18:00
 *       - Saturday: 10:00 - 18:00
 *       - Sunday: 10:00 - 18:00
 *     komentarji:
 *      type: array
 *      items:
 *       type: KomentarBranje
 *      example:
 *       - _id: 5de111349b2fa34e120eb6bd
 *         avtor: Dejan Lavbič
 *         ocena: 5
 *         cost: 3
 *         besediloKomentarja: Odlična lokacija, ne morem je prehvaliti.
 *         datum: 2019-11-07T00:00:00.000Z
 *       - _id: 5de111349b2fa34e120eb6be
 *         avtor: Kim Jong Un
 *         ocena: 1
 *         cost: 3
 *         besediloKomentarja: Čisti dolgčas, še kava je zanič.
 *         datum: 2019-11-08T00:00:00.000Z
 *    required:
 *     - _id
 *     - naziv
 *     - naslov
 *     - koordinate
 *     - ocena
 *     - cost
 *     - WorkingHours
 *     - komentarji
 */

const lokacijeShema = new mongoose.Schema({
    naziv: { type: String, required: true },
    naslov: { type: String },
    ocena: { type: Number, "default": 0, min: 0, max: 5 },
    cost: { type: Number, "default": 0, min: 0, max: 3 },
    number: [String],
    koordinate: { type: [Number], index: '2dsphere' },
    WorkingHours: [WorkingHoursShema],
    komentarji: [komentarjiShema],
    rezervacije: [rezervacijeShema]
});

mongoose.model('Lokacija', lokacijeShema, 'Lokacije');
// Lokacija je ime modela,
// lokacijeShema je shema, ki jo uporabimo in
// Lokacije je (opcijsko) ime MongoDB zbirke.