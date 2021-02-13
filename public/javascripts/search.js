const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const SearchRestaurants = async searchText => {
    const res = await fetch('./testni-podatki.json');
    const restaurants = await res.json();
    
    //Get matches to current text input
    let matches = restaurants.filter(restaurant => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return restaurant.naziv.match(regex) || restaurant.naslov.match(regex) || restaurant.number.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }
    
    outputHtml(matches);
}

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches
        .map(
            match => `
            <div class="card card-body mb-1">
                <h4>${match.naziv} (${match.naslov})<span class="text-primary">
                ${match.number}</span></h4>
            </div>
        `)
        .join('');
        matchList.innerHTML = html;
    }
}
search.addEventListener('input', () => SearchRestaurants(search.value));