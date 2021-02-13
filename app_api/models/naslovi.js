const mongoose = require('mongoose');

const nasloviShema = new mongoose.Schema({
    elektronskiNaslov: { type: String, required: true }
});

mongoose.model('Naslov', nasloviShema, 'Naslovi');