const mongoose = require('mongoose');
const Contest = require('../models/contest');
const connect = require('../config/database');

/**
 * Contest Seeder for Cricket and Football
 * 
 * This seeder connects to multiple databases:
 * - Contest DB: Main database for contests (via connect())
 * - Game DB: mongodb://localhost/Battle11_PLAYERGAME_DB
 * - Match DB: mongodb://localhost/Battle11_MATCH
 */

// Database URIs
const GAME_DB_URI = "mongodb://localhost/Battle11_PLAYERGAME_DB";
const MATCH_DB_URI = "mongodb://localhost/Battle11_MATCH";

/**
 * Create separate database connections for Game and Match databases
 */
const createExternalConnections = async () => {
    const connections = {};

    // Create connection to Game database (no deprecated options)
    connections.gameDb = await mongoose.createConnection(GAME_DB_URI).asPromise();
    console.log('Connected to Game Database:', GAME_DB_URI);

    // Create connection to Match database (no deprecated options)
    connections.matchDb = await mongoose.createConnection(MATCH_DB_URI).asPromise();
    console.log('Connected to Match Database:', MATCH_DB_URI);

    return connections;
};

/**
 * Define schemas for external databases
 */
const getExternalModels = (connections) => {
    // Game Schema for Game database
    const GameSchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: String,
        isActive: { type: Boolean, default: true }
    });

    // Match Schema for Match database
    const MatchSchema = new mongoose.Schema({
        gameId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        team1: {
            name: String,
            shortName: String,
            logo: String
        },
        team2: {
            name: String,
            shortName: String,
            logo: String
        },
        startTime: { type: Date, required: true },
        endTime: Date,
        status: {
            type: String,
            enum: ['SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED'],
            default: 'SCHEDULED'
        },
        venue: String,
        matchType: String
    });

    const Game = connections.gameDb.model('Game', GameSchema);
    const Match = connections.matchDb.model('Match', MatchSchema);

    return { Game, Match };
};

/**
 * Generate contest seeds with proper ObjectId references
 * @param {ObjectId} cricketGameId - Cricket game ObjectId
 * @param {ObjectId} footballGameId - Football game ObjectId  
 * @param {Array} cricketMatches - Array of cricket match documents
 * @param {Array} footballMatches - Array of football match documents
 * @returns {Array} Array of contest seed objects
 */
const getContestSeeds = (cricketGameId, footballGameId, cricketMatches, footballMatches) => {
    const contests = [];

    // Cricket Contests for each match
    cricketMatches.forEach((match) => {
        const matchEndTime = match.endTime || new Date(match.startTime.getTime() + 4 * 60 * 60 * 1000);
        const matchStatus = match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED';

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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
            isFull: false
        });
    });

    // Football Contests for each match
    footballMatches.forEach((match) => {
        const matchEndTime = match.endTime || new Date(match.startTime.getTime() + 2 * 60 * 60 * 1000);
        const matchStatus = match.status === 'COMPLETED' ? 'COMPLETED' : match.status === 'LIVE' ? 'LIVE' : 'SCHEDULED';

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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
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
            endTime: matchEndTime,
            status: matchStatus,
            isFull: false
        });
    });

    return contests;
};

/**
 * Seed contests using external game and match data
 */
const seedContests = async ({ cricketGameId, footballGameId, cricketMatches, footballMatches }) => {
    try {
        await connect();
        console.log('Connected to Contest MongoDB');

        if (!cricketGameId || !footballGameId) {
            throw new Error('Both cricketGameId and footballGameId are required.');
        }

        if (!cricketMatches || !footballMatches) {
            throw new Error('Both cricketMatches and footballMatches arrays are required.');
        }

        await Contest.deleteMany({});
        console.log('Cleared existing contests');

        const contestSeeds = getContestSeeds(cricketGameId, footballGameId, cricketMatches, footballMatches);
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
 * Standalone seeder - fetches game and match data from separate databases
 */
const seedContestsStandalone = async () => {
    let connections = null;

    try {
        await connect();
        console.log('Connected to Contest MongoDB');

        connections = await createExternalConnections();
        const { Game, Match } = getExternalModels(connections);

        console.log('\nFetching games from Game Database...');
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            console.error('\n❌ Games not found in Game Database.');
            const availableGames = await Game.find({}).select('name');
            console.log('Available games:', availableGames.map(g => g.name).join(', ') || 'None');
            throw new Error('Games not found. Please seed games first.');
        }

        console.log(`✓ Found Cricket Game: ${cricketGame._id}`);
        console.log(`✓ Found Football Game: ${footballGame._id}`);

        console.log('\nFetching matches from Match Database...');
        const cricketMatches = await Match.find({ gameId: cricketGame._id });
        const footballMatches = await Match.find({ gameId: footballGame._id });

        if (cricketMatches.length === 0 && footballMatches.length === 0) {
            console.error('\n❌ No matches found in Match Database.');
            throw new Error('Matches not found. Please seed matches first.');
        }

        console.log(`✓ Found ${cricketMatches.length} cricket matches`);
        console.log(`✓ Found ${footballMatches.length} football matches`);

        await Contest.deleteMany({});
        console.log('\n✓ Cleared existing contests');

        const contestSeeds = getContestSeeds(cricketGame._id, footballGame._id, cricketMatches, footballMatches);
        const contests = await Contest.insertMany(contestSeeds);

        console.log(`\n${'='.repeat(50)}`);
        console.log('           SEEDING COMPLETE');
        console.log('='.repeat(50));
        console.log(`Total Contests Seeded: ${contests.length}`);
        console.log(`Cricket Contests: ${contests.filter(c => c.gameId.equals(cricketGame._id)).length}`);
        console.log(`Football Contests: ${contests.filter(c => c.gameId.equals(footballGame._id)).length}`);
        console.log('='.repeat(50));

        return contests;
    } catch (error) {
        console.error('\n❌ Error seeding contests:', error.message);
        throw error;
    } finally {
        if (connections) {
            if (connections.gameDb) await connections.gameDb.close();
            if (connections.matchDb) await connections.matchDb.close();
            console.log('\n✓ Closed external database connections');
        }
    }
};

const clearContests = async () => {
    try {
        await connect();
        const result = await Contest.deleteMany({});
        console.log(`All contests cleared. Deleted: ${result.deletedCount}`);
        return result;
    } catch (error) {
        console.error('Error clearing contests:', error);
        throw error;
    }
};

const getContestStats = async () => {
    try {
        await connect();
        return {
            total: await Contest.countDocuments(),
            byStatus: {
                scheduled: await Contest.countDocuments({ status: 'SCHEDULED' }),
                live: await Contest.countDocuments({ status: 'LIVE' }),
                completed: await Contest.countDocuments({ status: 'COMPLETED' }),
                cancelled: await Contest.countDocuments({ status: 'CANCELLED' })
            }
        };
    } catch (error) {
        console.error('Error getting contest stats:', error);
        throw error;
    }
};

if (require.main === module) {
    seedContestsStandalone()
        .then(() => {
            console.log('\n✅ Contest seeding completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n❌ Contest seeding failed:', error.message);
            process.exit(1);
        });
}

module.exports = {
    seedContests,
    seedContestsStandalone,
    getContestSeeds,
    clearContests,
    getContestStats,
    createExternalConnections,
    getExternalModels,
    GAME_DB_URI,
    MATCH_DB_URI
};