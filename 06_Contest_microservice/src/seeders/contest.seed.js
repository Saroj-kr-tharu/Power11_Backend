const mongoose = require('mongoose');
const Contest = require('../models/contest');
const connect = require('../config/database');

/**
 * Contest Seeder for Cricket and Football
 * 
 * NOTE: This seeder requires Game and Match data to be seeded first.
 * 
 * You need to update the gameId and matchId references below with actual ObjectIds
 * from your database after running the game and match seeds.
 */

// Helper function to generate future dates
const getFutureDate = (daysFromNow, hours = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    date.setHours(hours, 0, 0, 0);
    return date;
};

const getPastDate = (daysAgo, hours = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hours, 0, 0, 0);
    return date;
};

// Creates contest seeds with proper ObjectId references
const getContestSeeds = (cricketGameId, footballGameId, cricketMatches, footballMatches) => {
    const contests = [];

    // Cricket Contests for each match
    cricketMatches.forEach((match, index) => {
        // Mega Contest
        contests.push({
            name: `Mega Contest - ${match.title}`,
            matchId: match._id,
            gameId: cricketGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 5,
            entryFee: 49,
            prizePool: 100000,
            maxParticipants: 5000,
            joinedParticipants: Math.floor(Math.random() * 1000),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 4 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });

        // Head to Head Contest
        contests.push({
            name: `Head to Head - ${match.title}`,
            matchId: match._id,
            gameId: cricketGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 1,
            entryFee: 25,
            prizePool: 45,
            maxParticipants: 2,
            joinedParticipants: match.status === 'COMPLETED' ? 2 : Math.floor(Math.random() * 2),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 4 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: match.status === 'COMPLETED'
        });

        // Winners Take All Contest
        contests.push({
            name: `Winners Take All - ${match.title}`,
            matchId: match._id,
            gameId: cricketGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 3,
            entryFee: 99,
            prizePool: 50000,
            maxParticipants: 1000,
            joinedParticipants: Math.floor(Math.random() * 500),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 4 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });

        // Free Entry Contest
        contests.push({
            name: `Free Entry - ${match.title}`,
            matchId: match._id,
            gameId: cricketGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 1,
            entryFee: 0,
            prizePool: 500,
            maxParticipants: 10000,
            joinedParticipants: Math.floor(Math.random() * 5000),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 4 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });

        // Small League Contest
        contests.push({
            name: `Small League - ${match.title}`,
            matchId: match._id,
            gameId: cricketGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 2,
            entryFee: 10,
            prizePool: 500,
            maxParticipants: 100,
            joinedParticipants: Math.floor(Math.random() * 50),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 4 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });
    });

    // Football Contests for each match
    footballMatches.forEach((match, index) => {
        // Grand Prize Contest
        contests.push({
            name: `Grand Prize - ${match.title}`,
            matchId: match._id,
            gameId: footballGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 5,
            entryFee: 59,
            prizePool: 150000,
            maxParticipants: 5000,
            joinedParticipants: Math.floor(Math.random() * 1500),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 2 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });

        // Head to Head Contest
        contests.push({
            name: `Head to Head - ${match.title}`,
            matchId: match._id,
            gameId: footballGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 1,
            entryFee: 20,
            prizePool: 36,
            maxParticipants: 2,
            joinedParticipants: match.status === 'COMPLETED' ? 2 : Math.floor(Math.random() * 2),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 2 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: match.status === 'COMPLETED'
        });

        // Premium League Contest
        contests.push({
            name: `Premium League - ${match.title}`,
            matchId: match._id,
            gameId: footballGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 3,
            entryFee: 199,
            prizePool: 100000,
            maxParticipants: 1000,
            joinedParticipants: Math.floor(Math.random() * 300),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 2 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });

        // Practice Contest (Free)
        contests.push({
            name: `Practice Contest - ${match.title}`,
            matchId: match._id,
            gameId: footballGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 1,
            entryFee: 0,
            prizePool: 1000,
            maxParticipants: 20000,
            joinedParticipants: Math.floor(Math.random() * 8000),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 2 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });

        // Mini League Contest
        contests.push({
            name: `Mini League - ${match.title}`,
            matchId: match._id,
            gameId: footballGameId,
            rulesVersion: 1,
            maxTeamsPerUser: 2,
            entryFee: 15,
            prizePool: 750,
            maxParticipants: 100,
            joinedParticipants: Math.floor(Math.random() * 60),
            startTime: match.startTime,
            endTime: match.endTime || new Date(match.startTime.getTime() + 2 * 60 * 60 * 1000),
            status: match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
            isFull: false
        });
    });

    return contests;
};

/**
 * Seed contests using external game and match data
 * @param {Object} params - Object containing gameIds and matches
 */
const seedContests = async ({ cricketGameId, footballGameId, cricketMatches, footballMatches }) => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        if (!cricketGameId || !footballGameId || !cricketMatches || !footballMatches) {
            throw new Error('Game IDs and Match data are required.');
        }

        // Clear existing contests
        await Contest.deleteMany({});
        console.log('Cleared existing contests');

        const contestSeeds = getContestSeeds(cricketGameId, footballGameId, cricketMatches, footballMatches);

        // Insert new contests
        const contests = await Contest.insertMany(contestSeeds);
        console.log(`Seeded ${contests.length} contests successfully`);
        console.log('Cricket Contests:', contests.filter(c => c.gameId.equals(cricketGameId)).length);
        console.log('Football Contests:', contests.filter(c => c.gameId.equals(footballGameId)).length);

        return contests;
    } catch (error) {
        console.error('Error seeding contests:', error);
        throw error;
    }
};

/**
 * Standalone seeder - fetches game and match data from shared database
 * Use this when running seeder independently
 */
const seedContestsStandalone = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Define schemas for fetching related data
        const Game = mongoose.model('Game', new mongoose.Schema({
            name: String
        }));

        const Match = mongoose.model('Match', new mongoose.Schema({
            gameId: mongoose.Schema.Types.ObjectId,
            title: String,
            startTime: Date,
            endTime: Date,
            status: String
        }));

        // Fetch games
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            console.error('Games not found. Please ensure games are seeded first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/game.seed.js');
            throw new Error('Games not found');
        }

        // Fetch matches
        const cricketMatches = await Match.find({ gameId: cricketGame._id });
        const footballMatches = await Match.find({ gameId: footballGame._id });

        if (cricketMatches.length === 0 && footballMatches.length === 0) {
            console.error('No matches found. Please ensure matches are seeded first.');
            console.log('Run: node 08_Match_microservice/src/seeders/match.seed.js');
            throw new Error('Matches not found');
        }

        console.log(`Found ${cricketMatches.length} cricket matches`);
        console.log(`Found ${footballMatches.length} football matches`);

        // Clear existing contests
        await Contest.deleteMany({});
        console.log('Cleared existing contests');

        const contestSeeds = getContestSeeds(cricketGame._id, footballGame._id, cricketMatches, footballMatches);

        // Insert new contests
        const contests = await Contest.insertMany(contestSeeds);
        console.log(`Seeded ${contests.length} contests successfully`);

        return contests;
    } catch (error) {
        console.error('Error seeding contests:', error);
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    seedContestsStandalone()
        .then(() => {
            console.log('Contest seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Contest seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedContests, seedContestsStandalone, getContestSeeds };
