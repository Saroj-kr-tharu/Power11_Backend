const mongoose = require('mongoose');
const Match = require('../models/match');
const connect = require('../config/database');

/**
 * Match Seeder for Cricket and Football
 * 
 * NOTE: This seeder requires Game and TeamMaster data to be seeded first
 * in the Player_Game_microservice.
 * 
 * You need to update the gameId and teamId references below with actual ObjectIds
 * from your database after running the game and team seeds.
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

// This function creates match seeds with proper ObjectId references
// Call this after getting game and team IDs from the database
const getMatchSeeds = (cricketGameId, footballGameId, cricketTeams, footballTeams) => {
    const now = new Date();
    
    return [
        // Cricket Matches - IPL Style
        {
            gameId: cricketGameId,
            title: 'MI vs CSK - IPL 2026 Match 1',
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams.MI, isHome: true },
                { teamId: cricketTeams.CSK, isHome: false }
            ],
            venue: 'Wankhede Stadium, Mumbai',
            startTime: getFutureDate(1, 19),
            lockTime: getFutureDate(1, 18),
            endTime: getFutureDate(1, 23),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([['tournament', 'IPL 2026'], ['matchNumber', '1']]),
            createdBy: 'system'
        },
        {
            gameId: cricketGameId,
            title: 'RCB vs KKR - IPL 2026 Match 2',
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams.RCB, isHome: true },
                { teamId: cricketTeams.KKR, isHome: false }
            ],
            venue: 'M. Chinnaswamy Stadium, Bangalore',
            startTime: getFutureDate(2, 15),
            lockTime: getFutureDate(2, 14),
            endTime: getFutureDate(2, 19),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([['tournament', 'IPL 2026'], ['matchNumber', '2']]),
            createdBy: 'system'
        },
        {
            gameId: cricketGameId,
            title: 'DC vs RR - IPL 2026 Match 3',
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams.DC, isHome: true },
                { teamId: cricketTeams.RR, isHome: false }
            ],
            venue: 'Arun Jaitley Stadium, Delhi',
            startTime: getFutureDate(3, 19),
            lockTime: getFutureDate(3, 18),
            endTime: getFutureDate(3, 23),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([['tournament', 'IPL 2026'], ['matchNumber', '3']]),
            createdBy: 'system'
        },
        {
            gameId: cricketGameId,
            title: 'GT vs LSG - IPL 2026 Match 4',
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams.GT, isHome: true },
                { teamId: cricketTeams.LSG, isHome: false }
            ],
            venue: 'Narendra Modi Stadium, Ahmedabad',
            startTime: getFutureDate(4, 15),
            lockTime: getFutureDate(4, 14),
            endTime: getFutureDate(4, 19),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([['tournament', 'IPL 2026'], ['matchNumber', '4']]),
            createdBy: 'system'
        },
        {
            gameId: cricketGameId,
            title: 'PBKS vs SRH - IPL 2026 Match 5',
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams.PBKS, isHome: true },
                { teamId: cricketTeams.SRH, isHome: false }
            ],
            venue: 'PCA Stadium, Mohali',
            startTime: getFutureDate(5, 19),
            lockTime: getFutureDate(5, 18),
            endTime: getFutureDate(5, 23),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([['tournament', 'IPL 2026'], ['matchNumber', '5']]),
            createdBy: 'system'
        },
        // Completed Cricket Match
        {
            gameId: cricketGameId,
            title: 'CSK vs RCB - IPL 2026 Pre-season',
            matchType: 'TEAM',
            teams: [
                { teamId: cricketTeams.CSK, isHome: true },
                { teamId: cricketTeams.RCB, isHome: false }
            ],
            venue: 'MA Chidambaram Stadium, Chennai',
            startTime: getPastDate(2, 19),
            lockTime: getPastDate(2, 18),
            endTime: getPastDate(2, 23),
            status: 'COMPLETED',
            squadAnnounced: true,
            result: {
                winnerTeamId: cricketTeams.CSK,
                isDraw: false,
                summary: 'CSK won by 6 wickets',
                winMargin: '6 wickets'
            },
            metadata: new Map([['tournament', 'IPL 2026 Pre-season'], ['matchNumber', 'P1']]),
            createdBy: 'system'
        },

        // Football Matches - EPL Style
        {
            gameId: footballGameId,
            title: 'Manchester United vs Manchester City - EPL Gameweek 20',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.MUN, isHome: true },
                { teamId: footballTeams.MCI, isHome: false }
            ],
            venue: 'Old Trafford, Manchester',
            startTime: getFutureDate(2, 17),
            lockTime: getFutureDate(2, 16),
            endTime: getFutureDate(2, 19),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '20']]),
            createdBy: 'system'
        },
        {
            gameId: footballGameId,
            title: 'Liverpool vs Chelsea - EPL Gameweek 20',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.LIV, isHome: true },
                { teamId: footballTeams.CHE, isHome: false }
            ],
            venue: 'Anfield, Liverpool',
            startTime: getFutureDate(3, 15),
            lockTime: getFutureDate(3, 14),
            endTime: getFutureDate(3, 17),
            status: 'UPCOMING',
            squadAnnounced: true,
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '20']]),
            createdBy: 'system'
        },
        {
            gameId: footballGameId,
            title: 'Arsenal vs Tottenham - North London Derby',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.ARS, isHome: true },
                { teamId: footballTeams.TOT, isHome: false }
            ],
            venue: 'Emirates Stadium, London',
            startTime: getFutureDate(4, 17),
            lockTime: getFutureDate(4, 16),
            endTime: getFutureDate(4, 19),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '20']]),
            createdBy: 'system'
        },
        {
            gameId: footballGameId,
            title: 'Newcastle vs West Ham - EPL Gameweek 20',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.NEW, isHome: true },
                { teamId: footballTeams.WHU, isHome: false }
            ],
            venue: "St. James' Park, Newcastle",
            startTime: getFutureDate(5, 15),
            lockTime: getFutureDate(5, 14),
            endTime: getFutureDate(5, 17),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '20']]),
            createdBy: 'system'
        },
        {
            gameId: footballGameId,
            title: 'Aston Villa vs Brighton - EPL Gameweek 20',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.AVL, isHome: true },
                { teamId: footballTeams.BHA, isHome: false }
            ],
            venue: 'Villa Park, Birmingham',
            startTime: getFutureDate(6, 15),
            lockTime: getFutureDate(6, 14),
            endTime: getFutureDate(6, 17),
            status: 'UPCOMING',
            squadAnnounced: false,
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '20']]),
            createdBy: 'system'
        },
        // Completed Football Match
        {
            gameId: footballGameId,
            title: 'Chelsea vs Arsenal - EPL Gameweek 19',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.CHE, isHome: true },
                { teamId: footballTeams.ARS, isHome: false }
            ],
            venue: 'Stamford Bridge, London',
            startTime: getPastDate(3, 15),
            lockTime: getPastDate(3, 14),
            endTime: getPastDate(3, 17),
            status: 'COMPLETED',
            squadAnnounced: true,
            result: {
                winnerTeamId: footballTeams.ARS,
                isDraw: false,
                summary: 'Arsenal won 2-1',
                winMargin: '2-1'
            },
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '19']]),
            createdBy: 'system'
        },
        // Live Football Match
        {
            gameId: footballGameId,
            title: 'Manchester City vs Liverpool - EPL Gameweek 19',
            matchType: 'TEAM',
            teams: [
                { teamId: footballTeams.MCI, isHome: true },
                { teamId: footballTeams.LIV, isHome: false }
            ],
            venue: 'Etihad Stadium, Manchester',
            startTime: new Date(),
            lockTime: getPastDate(0, 1),
            endTime: getFutureDate(0, 2),
            status: 'LIVE',
            squadAnnounced: true,
            metadata: new Map([['tournament', 'EPL 2025-26'], ['gameweek', '19']]),
            createdBy: 'system'
        }
    ];
};

/**
 * Seed matches using external game and team data
 * @param {Object} params - Object containing gameIds and teamIds
 * @param {ObjectId} params.cricketGameId - Cricket game ObjectId
 * @param {ObjectId} params.footballGameId - Football game ObjectId
 * @param {Object} params.cricketTeams - Object mapping team shortNames to ObjectIds
 * @param {Object} params.footballTeams - Object mapping team shortNames to ObjectIds
 */
const seedMatches = async ({ cricketGameId, footballGameId, cricketTeams, footballTeams }) => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        if (!cricketGameId || !footballGameId || !cricketTeams || !footballTeams) {
            throw new Error('Game IDs and Team IDs are required. Please provide them from Player_Game service data.');
        }

        // Clear existing matches
        await Match.deleteMany({});
        console.log('Cleared existing matches');

        const matchSeeds = getMatchSeeds(cricketGameId, footballGameId, cricketTeams, footballTeams);

        // Insert new matches
        const matches = await Match.insertMany(matchSeeds);
        console.log(`Seeded ${matches.length} matches successfully`);
        console.log('Cricket Matches:', matches.filter(m => m.gameId.equals(cricketGameId)).length);
        console.log('Football Matches:', matches.filter(m => m.gameId.equals(footballGameId)).length);

        return matches;
    } catch (error) {
        console.error('Error seeding matches:', error);
        throw error;
    }
};

/**
 * Standalone seeder - fetches game and team data from shared database
 * Use this when running seeder independently
 */
const seedMatchesStandalone = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Fetch games (assumes shared database or synced data)
        const Game = mongoose.model('Game', new mongoose.Schema({
            name: String
        }));
        
        const TeamMaster = mongoose.model('TeamMaster', new mongoose.Schema({
            gameId: mongoose.Schema.Types.ObjectId,
            shortName: String
        }));

        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            console.error('Games not found. Please ensure games are seeded in Player_Game microservice first.');
            console.log('Run: node 04_Player_Game_microservice/src/seeders/game.seed.js');
            throw new Error('Games not found');
        }

        // Fetch teams
        const cricketTeamDocs = await TeamMaster.find({ gameId: cricketGame._id });
        const footballTeamDocs = await TeamMaster.find({ gameId: footballGame._id });

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

        return matches;
    } catch (error) {
        console.error('Error seeding matches:', error);
        throw error;
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
