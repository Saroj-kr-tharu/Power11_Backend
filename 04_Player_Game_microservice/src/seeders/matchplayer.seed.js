const mongoose = require('mongoose');
const MatchPlayer = require('../models/MatchPlayer');
const Player = require('../models/player');
const Game = require('../models/game');
const connect = require('../config/database');
const {MATCH_DB_URL} = require('../config/server.config');

/**
 * MatchPlayer Seeder
 * 
 * NOTE: This seeder connects to TWO databases:
 * - Player_Game DB (default): For Players, Games, and MatchPlayers
 * - Match DB: For fetching Match data
 */

// Database URLs

const MATCH_DB_URL = 'mongodb://localhost/Battle11_MATCH';

// Cricket roles for reference
const CRICKET_ROLES = ['BATSMAN', 'BOWLER', 'ALL_ROUNDER', 'WICKET_KEEPER'];

// Football roles for reference
const FOOTBALL_ROLES = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'];

/**
 * Generates MatchPlayer data for a match with given players
 * @param {ObjectId} matchId - The match ID
 * @param {ObjectId} gameId - The game ID
 * @param {Array} players - Array of player documents
 * @param {String} gameType - 'CRICKET' or 'FOOTBALL'
 * @param {Boolean} isCompleted - Whether the match is completed (for points)
 */
const generateMatchPlayers = (matchId, gameId, players, gameType, isCompleted = false) => {
    return players.map((player, index) => {
        // Determine if player is in playing XI (first 11 players)
        const isInPlayingXI = index < 11;
        
        // Generate random points for completed matches
        const points = isCompleted ? Math.floor(Math.random() * 150) : 0;
        
        // Adjust credits slightly from base credits (match-specific)
        const creditAdjustment = (Math.random() - 0.5) * 1; // -0.5 to +0.5
        const credits = Math.max(4, Math.min(16, player.baseCredits + creditAdjustment));
        
        return {
            matchId,
            playerId: player._id,
            gameId,
            credits: parseFloat(credits.toFixed(1)),
            roles: player.roles,
            isPlaying: isInPlayingXI,
            playingStatus: isInPlayingXI ? 'ANNOUNCED' : (index < 15 ? 'BENCH' : 'UNANNOUNCED'),
            points,
            isActive: true
        };
    });
};

/**
 * Create a separate connection to Match database
 */
const createMatchDbConnection = async () => {
    const matchConnection = await mongoose.createConnection(MATCH_DB_URL);
    console.log('Connected to Match database');
    
    // Define Match schema for the separate connection
    const MatchSchema = new mongoose.Schema({
        gameId: mongoose.Schema.Types.ObjectId,
        title: String,
        teams: [{
            teamId: mongoose.Schema.Types.ObjectId,
            isHome: Boolean
        }],
        status: String
    });
    
    const MatchModel = matchConnection.model('Match', MatchSchema);
    return { matchConnection, MatchModel };
};

/**
 * Seed match players using external data
 * @param {Object} params - Object containing matches and players data
 */
const seedMatchPlayers = async ({ matches, players, games }) => {
    try {
        await connect();
        console.log('Connected to Player/Game MongoDB');

        if (!matches || !players || !games) {
            throw new Error('Matches, Players, and Games data are required.');
        }

        // Clear existing match players
        await MatchPlayer.deleteMany({});
        console.log('Cleared existing match players');

        const matchPlayerSeeds = [];

        // Group players by game
        const cricketPlayers = players.filter(p => p.gameId.equals(games.cricket._id));
        const footballPlayers = players.filter(p => p.gameId.equals(games.football._id));

        // Process each match
        for (const match of matches) {
            const isCricket = match.gameId.equals(games.cricket._id);
            const isCompleted = match.status === 'COMPLETED';
            const gameType = isCricket ? 'CRICKET' : 'FOOTBALL';
            const allPlayersForGame = isCricket ? cricketPlayers : footballPlayers;
            
            // Generate match players (up to 22 per match)
            const matchPlayers = generateMatchPlayers(
                match._id,
                match.gameId,
                allPlayersForGame.slice(0, 22),
                gameType,
                isCompleted
            );
            
            matchPlayerSeeds.push(...matchPlayers);
        }

        // Insert match players
        if (matchPlayerSeeds.length > 0) {
            const insertedMatchPlayers = await MatchPlayer.insertMany(matchPlayerSeeds);
            console.log(`Seeded ${insertedMatchPlayers.length} match players successfully`);
        } else {
            console.log('No match players to seed');
        }

        return matchPlayerSeeds;
    } catch (error) {
        console.error('Error seeding match players:', error);
        throw error;
    }
};

/**
 * Standalone seeder - fetches data from TWO databases:
 * - Player/Game DB: Players, Games (same DB as MatchPlayer)
 * - Match DB: Matches (separate DB)
 */
const seedMatchPlayersStandalone = async () => {
    let matchConnection = null;
    
    try {
        // Connect to Player/Game database (default connection)
        await connect();
        console.log('Connected to Player/Game MongoDB');

        // Create separate connection to Match database
        const { matchConnection: mConn, MatchModel } = await createMatchDbConnection();
        matchConnection = mConn;

        // Fetch games from Player/Game DB
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            console.error('Games not found. Please ensure games are seeded first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/game.seed.js');
            throw new Error('Games not found');
        }

        console.log(`Found Cricket game: ${cricketGame._id}`);
        console.log(`Found Football game: ${footballGame._id}`);

        // Fetch players from Player/Game DB
        const players = await Player.find({});
        if (players.length === 0) {
            console.error('No players found. Please ensure players are seeded first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/player.seed.js');
            throw new Error('Players not found');
        }

        console.log(`Found ${players.length} players`);

        // Fetch matches from Match DB (separate database)
        const matches = await MatchModel.find({});
        if (matches.length === 0) {
            console.error('No matches found in Match database. Please ensure matches are seeded first.');
            console.log('Run: node 08_Match_microservice/src/seeders/match.seed.js');
            throw new Error('Matches not found');
        }

        console.log(`Found ${matches.length} matches from Match database`);

        // Clear existing match players
        await MatchPlayer.deleteMany({});
        console.log('Cleared existing match players');

        const matchPlayerSeeds = [];

        // Group players by game
        const cricketPlayers = players.filter(p => p.gameId.equals(cricketGame._id));
        const footballPlayers = players.filter(p => p.gameId.equals(footballGame._id));

        console.log(`Cricket players: ${cricketPlayers.length}`);
        console.log(`Football players: ${footballPlayers.length}`);

        // Process each match
        for (const match of matches) {
            const isCricket = match.gameId.equals(cricketGame._id);
            const isCompleted = match.status === 'COMPLETED';
            const allPlayersForGame = isCricket ? cricketPlayers : footballPlayers;
            const gameType = isCricket ? 'CRICKET' : 'FOOTBALL';
            
            if (allPlayersForGame.length === 0) {
                console.log(`No players found for ${gameType} match: ${match._id}`);
                continue;
            }
            
            // Generate match players (up to 22 per match)
            const matchPlayers = generateMatchPlayers(
                match._id,
                match.gameId,
                allPlayersForGame.slice(0, 22),
                gameType,
                isCompleted
            );
            
            matchPlayerSeeds.push(...matchPlayers);
            console.log(`Generated ${matchPlayers.length} players for match: ${match.title || match._id}`);
        }

        // Insert match players (handle duplicates by using ordered: false)
        if (matchPlayerSeeds.length > 0) {
            try {
                const insertedMatchPlayers = await MatchPlayer.insertMany(matchPlayerSeeds, { ordered: false });
                console.log(`Seeded ${insertedMatchPlayers.length} match players successfully`);
            } catch (error) {
                if (error.code === 11000) {
                    // Duplicate key error - some were inserted
                    const insertedCount = error.insertedDocs ? error.insertedDocs.length : 'unknown';
                    console.log(`Seeded match players with some duplicates skipped. Inserted: ${insertedCount}`);
                } else {
                    throw error;
                }
            }
        } else {
            console.log('No match players to seed');
        }

        return matchPlayerSeeds;
    } catch (error) {
        console.error('Error seeding match players:', error);
        throw error;
    } finally {
        // Close the separate Match database connection
        if (matchConnection) {
            await matchConnection.close();
            console.log('Closed Match database connection');
        }
    }
};

/**
 * Clear all match players
 */
const clearMatchPlayers = async () => {
    try {
        await connect();
        await MatchPlayer.deleteMany({});
        console.log('Cleared all match players');
    } catch (error) {
        console.error('Error clearing match players:', error);
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    seedMatchPlayersStandalone()
        .then(() => {
            console.log('MatchPlayer seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('MatchPlayer seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { 
    seedMatchPlayers, 
    seedMatchPlayersStandalone, 
    generateMatchPlayers,
    clearMatchPlayers 
};