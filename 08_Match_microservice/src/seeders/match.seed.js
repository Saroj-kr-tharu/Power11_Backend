const mongoose = require('mongoose');
const Match = require('../models/match');
const connect = require('../config/database');
const {BATTELE_GAME_DB_URL}  = require('../config/server.config')

/**
 * Match Seeder for Cricket and Football
 * 
 * NOTE: This seeder requires Game and TeamMaster data to be seeded first
 * in the Player_Game_microservice (Battle11_PLAYERGAME_DB).
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

// Helper to calculate lockTime (15 minutes before match)
const getLockTime = (matchDate) => {
    const lockTime = new Date(matchDate);
    lockTime.setMinutes(lockTime.getMinutes() - 15);
    return lockTime;
};

// Helper to calculate endTime (3 hours after match for cricket, 2 hours for football)
const getEndTime = (matchDate, isCricket = true) => {
    const endTime = new Date(matchDate);
    endTime.setHours(endTime.getHours() + (isCricket ? 3 : 2));
    return endTime;
};

/**
 * Generate match seed data
 */
const getMatchSeeds = (cricketGameId, footballGameId, cricketTeams, footballTeams) => {
    const matches = [];

    // Cricket Matches
    const cricketTeamKeys = Object.keys(cricketTeams);
    if (cricketTeamKeys.length >= 2) {
        const team1Key = cricketTeamKeys[0];
        const team2Key = cricketTeamKeys[1];
        const team3Key = cricketTeamKeys[2] || team1Key;
        const team4Key = cricketTeamKeys[3] || team2Key;
        const team5Key = cricketTeamKeys[4] || team1Key;
        const team6Key = cricketTeamKeys[5] || team2Key;

        // Upcoming cricket matches
        const matchDate1 = getFutureDate(1, 14);
        matches.push({
            gameId: cricketGameId,
            title: `${team1Key} vs ${team2Key} - IPL 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team1Key], isHome: true },
                { teamId: cricketTeams[team2Key], isHome: false }
            ],
            venue: 'Wankhede Stadium, Mumbai',
            startTime: matchDate1,
            lockTime: getLockTime(matchDate1),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([
                ['series', 'IPL 2026'],
                ['format', 'T20']
            ]),
            createdBy: 'system'
        });

        const matchDate2 = getFutureDate(2, 19);
        matches.push({
            gameId: cricketGameId,
            title: `${team3Key} vs ${team4Key} - IPL 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team3Key], isHome: true },
                { teamId: cricketTeams[team4Key], isHome: false }
            ],
            venue: 'Eden Gardens, Kolkata',
            startTime: matchDate2,
            lockTime: getLockTime(matchDate2),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([
                ['series', 'IPL 2026'],
                ['format', 'T20']
            ]),
            createdBy: 'system'
        });

        const matchDate3 = getFutureDate(3, 15);
        matches.push({
            gameId: cricketGameId,
            title: `${team5Key} vs ${team6Key} - IPL 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team5Key], isHome: true },
                { teamId: cricketTeams[team6Key], isHome: false }
            ],
            venue: 'M. Chinnaswamy Stadium, Bangalore',
            startTime: matchDate3,
            lockTime: getLockTime(matchDate3),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([
                ['series', 'IPL 2026'],
                ['format', 'T20']
            ]),
            createdBy: 'system'
        });

        // Live cricket match
        const liveMatchDate = new Date();
        matches.push({
            gameId: cricketGameId,
            title: `${team1Key} vs ${team3Key} - IPL 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team1Key], isHome: true },
                { teamId: cricketTeams[team3Key], isHome: false }
            ],
            venue: 'MA Chidambaram Stadium, Chennai',
            startTime: liveMatchDate,
            lockTime: getLockTime(liveMatchDate),
            status: 'LIVE',
            squadAnnounced: true,
            metadata: new Map([
                ['series', 'IPL 2026'],
                ['format', 'T20']
            ]),
            createdBy: 'system'
        });

        // Completed cricket matches
        const pastDate1 = getPastDate(1, 19);
        matches.push({
            gameId: cricketGameId,
            title: `${team2Key} vs ${team4Key} - IPL 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team2Key], isHome: true },
                { teamId: cricketTeams[team4Key], isHome: false }
            ],
            venue: 'Narendra Modi Stadium, Ahmedabad',
            startTime: pastDate1,
            lockTime: getLockTime(pastDate1),
            endTime: getEndTime(pastDate1, true),
            status: 'COMPLETED',
            squadAnnounced: true,
            result: {
                winnerTeamId: cricketTeams[team2Key],
                isDraw: false,
                summary: `${team2Key} won by 25 runs`,
                winMargin: '25 runs'
            },
            metadata: new Map([
                ['series', 'IPL 2026'],
                ['format', 'T20']
            ]),
            createdBy: 'system'
        });

        const pastDate2 = getPastDate(2, 14);
        matches.push({
            gameId: cricketGameId,
            title: `${team1Key} vs ${team5Key} - India Tour 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team1Key], isHome: true },
                { teamId: cricketTeams[team5Key], isHome: false }
            ],
            venue: 'Rajiv Gandhi Stadium, Hyderabad',
            startTime: pastDate2,
            lockTime: getLockTime(pastDate2),
            endTime: getEndTime(pastDate2, true),
            status: 'COMPLETED',
            squadAnnounced: true,
            result: {
                winnerTeamId: cricketTeams[team1Key],
                isDraw: false,
                summary: `${team1Key} won by 5 wickets`,
                winMargin: '5 wickets'
            },
            metadata: new Map([
                ['series', 'India Tour 2026'],
                ['format', 'ODI']
            ]),
            createdBy: 'system'
        });

        // Cancelled cricket match
        const cancelledDate = getFutureDate(5, 14);
        matches.push({
            gameId: cricketGameId,
            title: `${team3Key} vs ${team5Key} - IPL 2026`,
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams[team3Key], isHome: true },
                { teamId: cricketTeams[team5Key], isHome: false }
            ],
            venue: 'Punjab Cricket Association Stadium, Mohali',
            startTime: cancelledDate,
            lockTime: getLockTime(cancelledDate),
            status: 'CANCELLED',
            squadAnnounced: false,
            metadata: new Map([
                ['series', 'IPL 2026'],
                ['format', 'T20'],
                ['cancelReason', 'Rain']
            ]),
            createdBy: 'system'
        });
    }

    // Football Matches
    const footballTeamKeys = Object.keys(footballTeams);
    if (footballTeamKeys.length >= 2) {
        const fTeam1Key = footballTeamKeys[0];
        const fTeam2Key = footballTeamKeys[1];
        const fTeam3Key = footballTeamKeys[2] || fTeam1Key;
        const fTeam4Key = footballTeamKeys[3] || fTeam2Key;
        const fTeam5Key = footballTeamKeys[4] || fTeam1Key;
        const fTeam6Key = footballTeamKeys[5] || fTeam2Key;

        // Upcoming football matches
        const fMatchDate1 = getFutureDate(1, 20);
        matches.push({
            gameId: footballGameId,
            title: `${fTeam1Key} vs ${fTeam2Key} - Premier League`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam1Key], isHome: true },
                { teamId: footballTeams[fTeam2Key], isHome: false }
            ],
            venue: 'Old Trafford, Manchester',
            startTime: fMatchDate1,
            lockTime: getLockTime(fMatchDate1),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([
                ['series', 'Premier League 2025-26'],
                ['matchweek', '20']
            ]),
            createdBy: 'system'
        });

        const fMatchDate2 = getFutureDate(2, 17);
        matches.push({
            gameId: footballGameId,
            title: `${fTeam3Key} vs ${fTeam4Key} - La Liga`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam3Key], isHome: true },
                { teamId: footballTeams[fTeam4Key], isHome: false }
            ],
            venue: 'Santiago Bernabeu, Madrid',
            startTime: fMatchDate2,
            lockTime: getLockTime(fMatchDate2),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([
                ['series', 'La Liga 2025-26'],
                ['matchweek', '18']
            ]),
            createdBy: 'system'
        });

        const fMatchDate3 = getFutureDate(3, 21);
        matches.push({
            gameId: footballGameId,
            title: `${fTeam5Key} vs ${fTeam6Key} - Bundesliga`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam5Key], isHome: true },
                { teamId: footballTeams[fTeam6Key], isHome: false }
            ],
            venue: 'Allianz Arena, Munich',
            startTime: fMatchDate3,
            lockTime: getLockTime(fMatchDate3),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([
                ['series', 'Bundesliga 2025-26'],
                ['matchweek', '17']
            ]),
            createdBy: 'system'
        });

        // Live football match
        const fLiveDate = new Date();
        matches.push({
            gameId: footballGameId,
            title: `${fTeam1Key} vs ${fTeam3Key} - FA Cup`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam1Key], isHome: true },
                { teamId: footballTeams[fTeam3Key], isHome: false }
            ],
            venue: 'Anfield, Liverpool',
            startTime: fLiveDate,
            lockTime: getLockTime(fLiveDate),
            status: 'LIVE',
            squadAnnounced: true,
            metadata: new Map([
                ['series', 'FA Cup 2026'],
                ['round', 'Quarter Final']
            ]),
            createdBy: 'system'
        });

        // Completed football matches
        const fPastDate1 = getPastDate(1, 20);
        matches.push({
            gameId: footballGameId,
            title: `${fTeam2Key} vs ${fTeam4Key} - La Liga`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam2Key], isHome: true },
                { teamId: footballTeams[fTeam4Key], isHome: false }
            ],
            venue: 'Camp Nou, Barcelona',
            startTime: fPastDate1,
            lockTime: getLockTime(fPastDate1),
            endTime: getEndTime(fPastDate1, false),
            status: 'COMPLETED',
            squadAnnounced: true,
            result: {
                winnerTeamId: footballTeams[fTeam2Key],
                isDraw: false,
                summary: `${fTeam2Key} won 3-1`,
                winMargin: '2 goals'
            },
            metadata: new Map([
                ['series', 'La Liga 2025-26'],
                ['matchweek', '17']
            ]),
            createdBy: 'system'
        });

        const fPastDate2 = getPastDate(3, 18);
        matches.push({
            gameId: footballGameId,
            title: `${fTeam1Key} vs ${fTeam5Key} - Premier League`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam1Key], isHome: true },
                { teamId: footballTeams[fTeam5Key], isHome: false }
            ],
            venue: 'Emirates Stadium, London',
            startTime: fPastDate2,
            lockTime: getLockTime(fPastDate2),
            endTime: getEndTime(fPastDate2, false),
            status: 'COMPLETED',
            squadAnnounced: true,
            result: {
                isDraw: true,
                summary: 'Match ended 2-2',
                winMargin: 'Draw'
            },
            metadata: new Map([
                ['series', 'Premier League 2025-26'],
                ['matchweek', '18']
            ]),
            createdBy: 'system'
        });

        // Cancelled football match
        const fCancelledDate = getFutureDate(4, 15);
        matches.push({
            gameId: footballGameId,
            title: `${fTeam3Key} vs ${fTeam5Key} - Champions League`,
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams[fTeam3Key], isHome: true },
                { teamId: footballTeams[fTeam5Key], isHome: false }
            ],
            venue: 'San Siro, Milan',
            startTime: fCancelledDate,
            lockTime: getLockTime(fCancelledDate),
            status: 'CANCELLED',
            squadAnnounced: false,
            metadata: new Map([
                ['series', 'Champions League 2025-26'],
                ['round', 'Group Stage'],
                ['cancelReason', 'Stadium maintenance']
            ]),
            createdBy: 'system'
        });
    }

    return matches;
};

/**
 * Seed matches with provided game and team data
 * Use this when called from master seeder
 */
const seedMatches = async (cricketGameId, footballGameId, cricketTeams, footballTeams) => {
    try {
        // Clear existing matches
        await Match.deleteMany({});
        console.log('Cleared existing matches');

        const matchSeeds = getMatchSeeds(cricketGameId, footballGameId, cricketTeams, footballTeams);

        // Insert new matches
        const matches = await Match.insertMany(matchSeeds);
        console.log(`Seeded ${matches.length} matches successfully`);

        return matches;
    } catch (error) {
        console.error('Error seeding matches:', error);
        throw error;
    }
};

/**
 * Standalone seeder - fetches game and team data from Player_Game database
 * Use this when running seeder independently
 */
const seedMatchesStandalone = async () => {
    let playerGameDbConnection = null;

    try {
        // Connect to Match microservice database
        await connect();
        console.log('Connected to Match MongoDB');

        // Connect to Player_Game microservice database (different DB)
        const PLAYER_GAME_DB_URL = BATTELE_GAME_DB_URL;
        playerGameDbConnection = mongoose.createConnection(PLAYER_GAME_DB_URL);

        await new Promise((resolve, reject) => {
            playerGameDbConnection.once('open', resolve);
            playerGameDbConnection.once('error', reject);
        });

        console.log('Connected to Player_Game MongoDB (Battle11_PLAYERGAME_DB)');

        // Define schemas for Player_Game database
        const GameSchema = new mongoose.Schema({
            name: String,
            isActive: Boolean
        });
        
        const TeamMasterSchema = new mongoose.Schema({
            gameId: mongoose.Schema.Types.ObjectId,
            name: String,
            shortName: String,
            logo: String,
            isActive: Boolean
        });

        // Create models using Player_Game connection
        const Game = playerGameDbConnection.model('Game', GameSchema);
        const TeamMaster = playerGameDbConnection.model('TeamMaster', TeamMasterSchema);

        // Fetch games from Player_Game database
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            console.error('Games not found. Please ensure games are seeded in Player_Game microservice first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/game.seed.js');
            throw new Error('Games not found in Battle11_PLAYERGAME_DB');
        }

        console.log('Found Cricket Game:', cricketGame._id);
        console.log('Found Football Game:', footballGame._id);

        // Fetch teams from Player_Game database
        const cricketTeamDocs = await TeamMaster.find({ gameId: cricketGame._id });
        const footballTeamDocs = await TeamMaster.find({ gameId: footballGame._id });

        if (cricketTeamDocs.length === 0 || footballTeamDocs.length === 0) {
            console.error('Teams not found. Please ensure teams are seeded in Player_Game microservice first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/team.seed.js');
            throw new Error('Teams not found in Battle11_PLAYERGAME_DB');
        }

        // Map teams by shortName
        const cricketTeams = {};
        cricketTeamDocs.forEach(t => { cricketTeams[t.shortName] = t._id; });

        const footballTeams = {};
        footballTeamDocs.forEach(t => { footballTeams[t.shortName] = t._id; });

        console.log('Found Cricket Teams:', Object.keys(cricketTeams));
        console.log('Found Football Teams:', Object.keys(footballTeams));

        // Clear existing matches
        await Match.deleteMany({});
        console.log('Cleared existing matches');

        const matchSeeds = getMatchSeeds(cricketGame._id, footballGame._id, cricketTeams, footballTeams);

        // Insert new matches
        const matches = await Match.insertMany(matchSeeds);
        console.log(`Seeded ${matches.length} matches successfully`);
        console.log('Cricket Matches:', matches.filter(m => m.gameId.equals(cricketGame._id)).length);
        console.log('Football Matches:', matches.filter(m => m.gameId.equals(footballGame._id)).length);

        // Log match summary
        const statusCounts = matches.reduce((acc, m) => {
            acc[m.status] = (acc[m.status] || 0) + 1;
            return acc;
        }, {});
        console.log('Match Status Summary:', statusCounts);

        return matches;
    } catch (error) {
        console.error('Error seeding matches:', error);
        throw error;
    } finally {
        // Close Player_Game database connection
        if (playerGameDbConnection) {
            await playerGameDbConnection.close();
            console.log('Closed Player_Game database connection');
        }
    }
};

// Run if executed directly
if (require.main === module) {
    seedMatchesStandalone()
        .then(() => {
            console.log('Match seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Match seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedMatches, seedMatchesStandalone, getMatchSeeds };