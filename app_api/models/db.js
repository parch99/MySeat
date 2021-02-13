const mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/MySeat';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_CLOUD_URI;
} else if (process.env.NODE_ENV === 'docker') {
  dbURI = 'mongodb://sp-edugeocache-mongodb/MySeat';
}

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose je povezan na ${dbURI}.`);
});

mongoose.connection.on('error', () => {
    console.log('Mongoose napaka pri povezavi');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose ni povezan.');
});

const pravilnaZaustavitev = (sporocilo, povratniKlic) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose je zaprl povezavo preko '${sporocilo}'`);
        povratniKlic();
    });
};

// Ponovni zagon nodemon
process.once('SIGUSR2', () => {
    pravilnaZaustavitev('nodemon ponovni zagon', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Izhod iz aplikacije
process.on('SIGINT', () => {
    pravilnaZaustavitev('izhod iz aplikacije', () => {
        process.exit(0);
    });
});

// Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
    pravilnaZaustavitev('izhod iz aplikacije na Heroku', () => {
        process.exit(0);
    });
});

require('./lokacije');
require('./uporabniki');
require('./naslovi');
