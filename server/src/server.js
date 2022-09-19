const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { planets, getAllPlanets } = require('./models/planets.model');

const MONGO_URL = "mongodb+srv://nasa-api:48IzhjzicW2JfjO6@cluster0.ewnqviy.mongodb.net/nasa?retryWrites=true&w=majority"

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once('open', () =>{
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error',(err) => {
    console.error(err);
})

const {loadPlanetsData} = require('./models/planets.model');

async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

    console.log(planets);

}

startServer();





