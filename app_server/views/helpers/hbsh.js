const hbs = require('handlebars');

hbs.registerHelper('stars', (ocena) => {
    let stars = '';
    for (let i = 1; i <= 5; i++)
        stars += '<i class="fa' + (ocena >= i ? 's' : 'r') + ' fa-star"></i>';
    return stars;
});
hbs.registerHelper('money', (ocena) => {
    let money = '';
    for (let i = 1; i <= 3; i++)
        if(ocena >= i){
            money += '<i class="fa' + 's' + ' fa-euro-sign"></i>';
        } else {
            money += '<i class="fa fa-euro" style="color:black"></i>';
        }
    return money;
});
hbs.registerHelper('zamenjaj', (besedilo, nizPrej, nizPotem) => {
    return besedilo.replace(new RegExp(nizPrej, 'g'), nizPotem);
  });
  
  hbs.registerHelper('formatirajDatum', (nizDatum) => {
    const datum = new Date(nizDatum);
    const imenaMesecev = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
    const d = datum.getDate();
    const m = imenaMesecev[datum.getMonth()];
    const l = datum.getFullYear();
    return `${d}. ${m}, ${l}`;
  });

  hbs.registerHelper('ujemanjeNiza', (vrednost1, vrednost2, moznosti) => {
    return (vrednost1 == vrednost2) ? moznosti.fn(this) : moznosti.inverse(this);
  });
