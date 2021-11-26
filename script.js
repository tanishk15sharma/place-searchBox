const searchInput = document.querySelector(".search");
const suggestionBox = document.querySelector(".suggestions");


searchInput.addEventListener("change", displayMatches)
searchInput.addEventListener("keyup", displayMatches)




let url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';



const cities = [];


fetch(url)
    .then(convert => convert.json())
    .then(data => cities.push(...data))

//console.log(cities);



function findCity(wordToMatch, cities) {
    return cities.filter(place => {
        let regexMatch = new RegExp(wordToMatch, "gi")
        return place.city.match(regexMatch) || place.state.match(regexMatch)
    })
}


function displayMatches() {
    let gotMatchs = findCity(this.value, cities);
    //console.log(gotMatchs );
    let displayArray = gotMatchs.map(items => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = items.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = items.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `<li>
         <span class="name" > ${cityName} , ${stateName} </span>
         <span class="population" > ${items.population} </span> 
    </li>
         `
    }).join();

    suggestionBox.innerHTML = displayArray



}





//const searchInput = document.querySelector(".search")