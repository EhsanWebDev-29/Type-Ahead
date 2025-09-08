
const endPoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// fetching data, convert into js array and then using spread operator to store data into cities

fetch(endPoint)
.then(res => res.json())
.then(data => cities.push(...data));


console.log(cities);

// function which matches words with the array of cities above

function findMatches (wordToMatch,cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch,"gi");
        return place.city.match(regex) || place.state.match(regex)
    })
}

// regular expression which gives commas to population

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// this function displays what matches while we type in the input field

function displayMatches () {
    const matchArray = findMatches(this.value,cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value,"gi");
        const cityName = place.city.replace(regex,`<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex,`<span class="hl">${this.value}</span>`);
        return `<li>
         <span class="name">${cityName},${stateName}</span>
         <span class="population">${numberWithCommas(place.population)}</span>
        </li>`
        
        
    }).join(" ");
    suggestions.innerHTML = html;
}

const searchBox = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// handling event on the existing html

searchBox.addEventListener("keyup",displayMatches);







