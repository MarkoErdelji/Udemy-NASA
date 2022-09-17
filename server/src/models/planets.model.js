const parse = require('csv-parse')
const fs = require('fs');
const path = require('path');

const planets = [];

function loadPlanetsData(){
    return new Promise((resolve,reject) => {fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
    .pipe(parse.parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)){
            planets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
        reject(err);
    })
    .
    on('end', () => 
    {
        console.log(`${planets.length} habitable planets found`);
        resolve();
    })
    });
}

function isHabitablePlanet(planet){
    return planet['koi_disposition'] == 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function getAllPlanets(){
    return planets;
}

module.exports = {
    planets,
    loadPlanetsData,
    getAllPlanets,
};