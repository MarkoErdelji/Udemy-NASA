const launchesDatabase = require('./launches.mongo');
const { planets } = require('./planets.model');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;


const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA','ZTM'],
    upcoming: true,
    success: true,
}

function getAllLaunches(){
    return launchesDatabase.find({},{'__v':0,'_id':0});
}

saveLaunch(launch);

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet){
        throw new Error('No matching planet found')
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },launch,{upsert:true}); 
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber')

    if (!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber
}


async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber()+1;
    const newLaunch = Object.assign(launch,{
        flightNumber: newFlightNumber,
        customer: ['Zero to Mastery', 'NASA'],
        upcoming: true,
        success: true,
        flightNumber:newFlightNumber
    })

    await saveLaunch(newLaunch);
}

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    console.log(aborted);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    abortLaunchById,
    getAllLaunches,
    scheduleNewLaunch,
};