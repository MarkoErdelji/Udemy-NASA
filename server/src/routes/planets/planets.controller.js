const {getAllPlanets} = require('../../models/planets.model');

function httpGetAllPlanets(req, res){
    console.log(getAllPlanets());
    res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};