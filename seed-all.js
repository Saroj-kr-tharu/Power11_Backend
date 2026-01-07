/**
 * Master Seeder Script
 * 
 * Runs all seeders in the correct order:
 * 1. Games (Cricket, Football)
 * 2. Team Masters
 * 3. Players
 * 4. Matches
 * 5. Match Players
 * 6. Contests
 * 7. Leaderboards
 * 
 * Usage: node seed-all.js
 */

const mongoose = require('mongoose');
const path = require('path');

// Load environment config from one of the microservices
require('dotenv').config({ path: path.join(__dirname, '04_Player_Game_microservice', '.env') });

const MONGODB_URL = process.env.MANGODB_URL || process.env.MONGODB_URL || 'mongodb://localhost:27017/fantasy_sports';

const runAllSeeders = async () => {
    try {
        console.log('='.repeat(60));
        console.log('        MASTER SEEDER - Fantasy Sports Platform');
        console.log('='.repeat(60));
        console.log(`\nConnecting to MongoDB: ${MONGODB_URL}\n`);

        await mongoose.connect(MONGODB_URL);
        console.log('✓ Connected to MongoDB\n');

        // Import models
        const Game = require('./04_Player_Game_microservice/src/models/game');
        const TeamMaster = require('./04_Player_Game_microservice/src/models/teammaster');
        const Player = require('./04_Player_Game_microservice/src/models/player');
        const MatchPlayer = require('./04_Player_Game_microservice/src/models/MatchPlayer');
        const Match = require('./08_Match_microservice/src/models/match');
        const Contest = require('./06_Contest_microservice/src/models/contest');
        const Leaderboard = require('./07_Leaderboard_microservice/src/models/leaderboard');

        // Import seed data generators
        const { gameSeeds } = require('./04_Player_Game_microservice/src/seeders/game.seed');
        const { getTeamMasterSeeds } = require('./04_Player_Game_microservice/src/seeders/teammaster.seed');
        const { getPlayerSeeds } = require('./04_Player_Game_microservice/src/seeders/player.seed');
        const { generateMatchPlayers } = require('./04_Player_Game_microservice/src/seeders/matchplayer.seed');
        const { getMatchSeeds } = require('./08_Match_microservice/src/seeders/match.seed');
        const { getContestSeeds } = require('./06_Contest_microservice/src/seeders/contest.seed');
        const { generateLeaderboardEntries } = require('./07_Leaderboard_microservice/src/seeders/leaderboard.seed');

        // ========== STEP 1: Seed Games ==========
        console.log('─'.repeat(50));
        console.log('STEP 1: Seeding Games (Cricket & Football)');
        console.log('─'.repeat(50));

        await Game.deleteMany({});
        const games = await Game.insertMany(gameSeeds);
        console.log(`✓ Seeded ${games.length} games`);

        const cricketGame = games.find(g => g.name === 'CRICKET');
        const footballGame = games.find(g => g.name === 'FOOTBALL');
        console.log(`  - Cricket Game ID: ${cricketGame._id}`);
        console.log(`  - Football Game ID: ${footballGame._id}\n`);

        // ========== STEP 2: Seed Team Masters ==========
        console.log('─'.repeat(50));
        console.log('STEP 2: Seeding Team Masters');
        console.log('─'.repeat(50));

        await TeamMaster.deleteMany({});
        const teamMasterSeeds = getTeamMasterSeeds(cricketGame._id, footballGame._id);
        const teams = await TeamMaster.insertMany(teamMasterSeeds);
        console.log(`✓ Seeded ${teams.length} teams`);

        const cricketTeamDocs = teams.filter(t => t.gameId.equals(cricketGame._id));
        const footballTeamDocs = teams.filter(t => t.gameId.equals(footballGame._id));
        console.log(`  - Cricket Teams: ${cricketTeamDocs.map(t => t.shortName).join(', ')}`);
        console.log(`  - Football Teams: ${footballTeamDocs.map(t => t.shortName).join(', ')}\n`);

        // Build team ID maps
        const cricketTeams = {};
        cricketTeamDocs.forEach(t => { cricketTeams[t.shortName] = t._id; });

        const footballTeams = {};
        footballTeamDocs.forEach(t => { footballTeams[t.shortName] = t._id; });

        // ========== STEP 3: Seed Players ==========
        console.log('─'.repeat(50));
        console.log('STEP 3: Seeding Players');
        console.log('─'.repeat(50));

        await Player.deleteMany({});
        const playerSeeds = getPlayerSeeds(cricketGame._id, footballGame._id);
        const players = await Player.insertMany(playerSeeds);
        console.log(`✓ Seeded ${players.length} players`);
        console.log(`  - Cricket Players: ${players.filter(p => p.gameId.equals(cricketGame._id)).length}`);
        console.log(`  - Football Players: ${players.filter(p => p.gameId.equals(footballGame._id)).length}\n`);

        // ========== STEP 4: Seed Matches ==========
        console.log('─'.repeat(50));
        console.log('STEP 4: Seeding Matches');
        console.log('─'.repeat(50));

        await Match.deleteMany({});
        const matchSeeds = getMatchSeeds(cricketGame._id, footballGame._id, cricketTeams, footballTeams);
        const matches = await Match.insertMany(matchSeeds);
        console.log(`✓ Seeded ${matches.length} matches`);

        const cricketMatches = matches.filter(m => m.gameId.equals(cricketGame._id));
        const footballMatches = matches.filter(m => m.gameId.equals(footballGame._id));
        console.log(`  - Cricket Matches: ${cricketMatches.length}`);
        console.log(`  - Football Matches: ${footballMatches.length}\n`);

        // ========== STEP 5: Seed Match Players ==========
        console.log('─'.repeat(50));
        console.log('STEP 5: Seeding Match Players');
        console.log('─'.repeat(50));

        await MatchPlayer.deleteMany({});
        
        // Group players by game
        const cricketPlayers = players.filter(p => p.gameId.equals(cricketGame._id));
        const footballPlayers = players.filter(p => p.gameId.equals(footballGame._id));
        
        const matchPlayerSeeds = [];
        for (const match of matches) {
            const isCricket = match.gameId.equals(cricketGame._id);
            const isCompleted = match.status === 'COMPLETED';
            const allPlayersForGame = isCricket ? cricketPlayers : footballPlayers;
            const gameType = isCricket ? 'CRICKET' : 'FOOTBALL';
            
            const matchPlayers = generateMatchPlayers(
                match._id,
                match.gameId,
                allPlayersForGame.slice(0, 22),
                gameType,
                isCompleted
            );
            matchPlayerSeeds.push(...matchPlayers);
        }
        
        const insertedMatchPlayers = await MatchPlayer.insertMany(matchPlayerSeeds);
        console.log(`✓ Seeded ${insertedMatchPlayers.length} match players`);
        console.log(`  - Across ${matches.length} matches\n`);

        // ========== STEP 6: Seed Contests ==========
        console.log('─'.repeat(50));
        console.log('STEP 6: Seeding Contests');
        console.log('─'.repeat(50));

        await Contest.deleteMany({});
        const contestSeeds = getContestSeeds(cricketGame._id, footballGame._id, cricketMatches, footballMatches);
        const contests = await Contest.insertMany(contestSeeds);
        console.log(`✓ Seeded ${contests.length} contests`);
        console.log(`  - Cricket Contests: ${contests.filter(c => c.gameId.equals(cricketGame._id)).length}`);
        console.log(`  - Football Contests: ${contests.filter(c => c.gameId.equals(footballGame._id)).length}\n`);

        // ========== STEP 7: Seed Leaderboards ==========
        console.log('─'.repeat(50));
        console.log('STEP 7: Seeding Leaderboards');
        console.log('─'.repeat(50));

        await Leaderboard.deleteMany({});
        
        const leaderboardSeeds = [];
        const completedContests = contests.filter(c => c.status === 'COMPLETED');
        const liveContests = contests.filter(c => c.status === 'LIVE');
        
        // Generate leaderboard entries for completed contests
        for (const contest of completedContests) {
            const participantCount = Math.min(contest.joinedParticipants || 10, 50);
            const entries = generateLeaderboardEntries(contest._id, participantCount, true);
            leaderboardSeeds.push(...entries);
        }
        
        // Generate partial leaderboard for live contests
        for (const contest of liveContests) {
            const participantCount = Math.min(contest.joinedParticipants || 5, 20);
            const entries = generateLeaderboardEntries(contest._id, participantCount, false);
            entries.forEach(entry => {
                entry.totalPoints = Math.floor(Math.random() * 100);
            });
            leaderboardSeeds.push(...entries);
        }
        
        const insertedLeaderboards = await Leaderboard.insertMany(leaderboardSeeds);
        console.log(`✓ Seeded ${insertedLeaderboards.length} leaderboard entries`);
        console.log(`  - From ${completedContests.length} completed contests`);
        console.log(`  - From ${liveContests.length} live contests\n`);

        // ========== Summary ==========
        console.log('='.repeat(60));
        console.log('                    SEEDING COMPLETE!');
        console.log('='.repeat(60));
        console.log('\nSummary:');
        console.log(`  ✓ Games:         ${games.length}`);
        console.log(`  ✓ Teams:         ${teams.length}`);
        console.log(`  ✓ Players:       ${players.length}`);
        console.log(`  ✓ Matches:       ${matches.length}`);
        console.log(`  ✓ Match Players: ${insertedMatchPlayers.length}`);
        console.log(`  ✓ Contests:      ${contests.length}`);
        console.log(`  ✓ Leaderboards:  ${insertedLeaderboards.length}`);
        console.log(`  ─────────────────────`);
        console.log(`  Total Records:   ${games.length + teams.length + players.length + matches.length + insertedMatchPlayers.length + contests.length + insertedLeaderboards.length}`);
        console.log('='.repeat(60));

    } catch (error) {
        console.error('\n✗ Seeding failed:', error.message);
        console.error(error);
        throw error;
    } finally {
        await mongoose.connection.close();
        console.log('\n✓ Database connection closed');
    }
};

// Run the seeder
runAllSeeders()
    .then(() => {
        console.log('\nAll seeders completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\nSeeder failed with error:', error.message);
        process.exit(1);
    });
