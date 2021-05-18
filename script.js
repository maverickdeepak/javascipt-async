'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(data, className= '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${+(data.population / 1000000).toFixed(1)}M people</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryData = function (countryName) {

    // Ajax Call 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`);
    request.send();

    // Request for load the data
    request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // const data = JSON.parse(this.responseText)[1];
    renderCountry(data);

    // Get Neighbour Country
    const neighbour = data.borders[1];
    console.log(neighbour);

    if(!neighbour) return;

     // Ajax Call 2
     const request2 = new XMLHttpRequest();
     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
     request2.send();

    request2.addEventListener('load', function() {
        const data2 = JSON.parse(this.responseText);
        console.log(data2);

        renderCountry(data2, 'neighbour')
    })

});
};

getCountryData('usa');