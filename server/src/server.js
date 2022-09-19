const http = require('http');
const app = require('./app');
const {mongoConnect} = require('./services/mongo')
const { planets, getAllPlanets } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const {loadPlanetsData} = require('./models/planets.model');
const {loadLaunchData} = require('./models/launches.model');

async function startServer(){
    await mongoConnect();
    await loadLaunchData();
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

    console.log(planets);

}

startServer();





