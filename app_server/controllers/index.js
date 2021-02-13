const errorpage = (req, res) => {
    res.render('error', { message: "Sorry, this page does not exist" });
};
const mappage = (req, res) => {
    res.render('map');
};

var informacije = (req, res) => {
    res.render('main', {
        title1: 'BEST RESTAURANT FINDER IN TOWN',
        title2: 'All your local cousine in one place',
        city: 'Ljubljana',
        description1: 'This app allows you to easily locate nearby venues which serve food and drinks.',
        description2: 'Ljubljana is a beautiful city, with tons of great local dishes. With our app, you can easily find places that serve great food.'
    });
};

var infoAbout = (req, res) => {
    res.render('about', {
        description1: 'Prvi del opisa',
        description2: 'Drugi del opisa'
    });
};

module.exports = {
    informacije,
    infoAbout,
    errorpage,
    mappage
};