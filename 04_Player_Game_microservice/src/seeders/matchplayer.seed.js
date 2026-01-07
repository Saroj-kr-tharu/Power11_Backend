const mongoose = require('mongoose');
const MatchPlayer = require('../models/MatchPlayer');
const Player = require('../models/player');
const Game = require('../models/game');
const connect = require('../config/database');

/**
 * MatchPlayer Seeder
 * 
 * NOTE: This seeder requires Game, Player, and Match data to be seeded first.
 * 
 * Links players to matches with specific credits, roles, and playing status.
 */

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
 * Seed match players using external data
 * @param {Object} params - Object containing matches and players data
 */
const seedMatchPlayers = async ({ matches, players, games }) => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        if (!matches || !players || !games) {
            throw new Error('Matches, Players, and Games data are required.');
        }

        // Clear existing match players
        await MatchPlayer.deleteMany({});
        console.log('Cleared existing match players');

        const matchPlayerSeeds = [];

        // Group players by team
        const cricketPlayers = players.filter(p => p.gameId.equals(games.cricket._id));
        const footballPlayers = players.filter(p => p.gameId.equals(games.football._id));

        // Create player lookup by team
        const cricketPlayersByTeam = {};
        cricketPlayers.forEach(player => {
            if (!cricketPlayersByTeam[player.team]) {
                cricketPlayersByTeam[player.team] = [];
            }
            cricketPlayersByTeam[player.team].push(player);
        });

        const footballPlayersByTeam = {};
        footballPlayers.forEach(player => {
            if (!footballPlayersByTeam[player.team]) {
                footballPlayersByTeam[player.team] = [];
            }
            footballPlayersByTeam[player.team].push(player);
        });

        // Process each match
        for (const match of matches) {
            const isCricket = match.gameId.equals(games.cricket._id);
            const isCompleted = match.status === 'COMPLETED';
            const playersByTeam = isCricket ? cricketPlayersByTeam : footballPlayersByTeam;
            
            // Get teams from match
            if (match.teams && match.teams.length >= 2) {
                // We need to get players for both teams in the match
                // For now, we'll use all available players for the game type
                const gameType = isCricket ? 'CRICKET' : 'FOOTBALL';
                const allPlayersForGame = isCricket ? cricketPlayers : footballPlayers;
                
                // Generate match players
                const matchPlayers = generateMatchPlayers(
                    match._id,
                    match.gameId,
                    allPlayersForGame.slice(0, 22), // Take up to 22 players
                    gameType,
                    isCompleted
                );
                
                matchPlayerSeeds.push(...matchPlayers);
            }
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
 * Standalone seeder - fetches required data from shared database
 */
const seedMatchPlayersStandalone = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Define schemas for fetching related data
        const GameSchema = new mongoose.Schema({
            name: String
        });
        const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

        const PlayerSchema = new mongoose.Schema({
            name: String,
            gameId: mongoose.Schema.Types.ObjectId,
            roles: [String],
            team: String,
            baseCredits: Number
        });
        const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

        const MatchSchema = new mongoose.Schema({
            gameId: mongoose.Schema.Types.ObjectId,
            title: String,
            teams: [{
                teamId: mongoose.Schema.Types.ObjectId,
                isHome: Boolean
            }],
            status: String
        });
        const Match = mongoose.models.Match || mongoose.model('Match', MatchSchema);

        // Fetch games
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            console.error('Games not found. Please ensure games are seeded first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/game.seed.js');
            throw new Error('Games not found');
        }

        // Fetch players
        const players = await Player.find({});
        if (players.length === 0) {
            console.error('No players found. Please ensure players are seeded first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/player.seed.js');
            throw new Error('Players not found');
        }

        // Fetch matches
        const matches = await Match.find({});
        if (matches.length === 0) {
            console.error('No matches found. Please ensure matches are seeded first.');
            console.log('Run: node 08_Match_microservice/src/seeders/match.seed.js');
            throw new Error('Matches not found');
        }

        console.log(`Found ${players.length} players`);
        console.log(`Found ${matches.length} matches`);

        // Clear existing match players
        await MatchPlayer.deleteMany({});
        console.log('Cleared existing match players');

        const matchPlayerSeeds = [];

        // Group players by game and team
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

        // Insert match players (handle duplicates by using ordered: false)
        if (matchPlayerSeeds.length > 0) {
            try {
                const insertedMatchPlayers = await MatchPlayer.insertMany(matchPlayerSeeds, { ordered: false });
                console.log(`Seeded ${insertedMatchPlayers.length} match players successfully`);
            } catch (error) {
                if (error.code === 11000) {
                    // Duplicate key error - some were inserted
                    console.log(`Seeded match players with some duplicates skipped`);
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

module.exports = { seedMatchPlayers, seedMatchPlayersStandalone, generateMatchPlayers };
