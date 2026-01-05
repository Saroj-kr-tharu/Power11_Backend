const mongoose = require('mongoose');
const TeamMaster = require('../models/teammaster');
const Game = require('../models/game');
const connect = require('../config/database');

const getTeamMasterSeeds = (cricketGameId, footballGameId) => [
    // Cricket Teams - IPL Teams
    {
        gameId: cricketGameId,
        name: 'Mumbai Indians',
        shortName: 'MI',
        logo: 'https://example.com/logos/mi.png',
        country: 'India',
        homeCity: 'Mumbai',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Chennai Super Kings',
        shortName: 'CSK',
        logo: 'https://example.com/logos/csk.png',
        country: 'India',
        homeCity: 'Chennai',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Royal Challengers Bangalore',
        shortName: 'RCB',
        logo: 'https://example.com/logos/rcb.png',
        country: 'India',
        homeCity: 'Bangalore',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Kolkata Knight Riders',
        shortName: 'KKR',
        logo: 'https://example.com/logos/kkr.png',
        country: 'India',
        homeCity: 'Kolkata',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Delhi Capitals',
        shortName: 'DC',
        logo: 'https://example.com/logos/dc.png',
        country: 'India',
        homeCity: 'Delhi',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Rajasthan Royals',
        shortName: 'RR',
        logo: 'https://example.com/logos/rr.png',
        country: 'India',
        homeCity: 'Jaipur',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Punjab Kings',
        shortName: 'PBKS',
        logo: 'https://example.com/logos/pbks.png',
        country: 'India',
        homeCity: 'Mohali',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2008']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Sunrisers Hyderabad',
        shortName: 'SRH',
        logo: 'https://example.com/logos/srh.png',
        country: 'India',
        homeCity: 'Hyderabad',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2013']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Gujarat Titans',
        shortName: 'GT',
        logo: 'https://example.com/logos/gt.png',
        country: 'India',
        homeCity: 'Ahmedabad',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2022']]),
        createdBy: 'system'
    },
    {
        gameId: cricketGameId,
        name: 'Lucknow Super Giants',
        shortName: 'LSG',
        logo: 'https://example.com/logos/lsg.png',
        country: 'India',
        homeCity: 'Lucknow',
        status: 'ACTIVE',
        metadata: new Map([['league', 'IPL'], ['founded', '2022']]),
        createdBy: 'system'
    },

    // Football Teams - EPL Teams
    {
        gameId: footballGameId,
        name: 'Manchester United',
        shortName: 'MUN',
        logo: 'https://example.com/logos/mun.png',
        country: 'England',
        homeCity: 'Manchester',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1878']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Manchester City',
        shortName: 'MCI',
        logo: 'https://example.com/logos/mci.png',
        country: 'England',
        homeCity: 'Manchester',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1880']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Liverpool',
        shortName: 'LIV',
        logo: 'https://example.com/logos/liv.png',
        country: 'England',
        homeCity: 'Liverpool',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1892']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Chelsea',
        shortName: 'CHE',
        logo: 'https://example.com/logos/che.png',
        country: 'England',
        homeCity: 'London',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1905']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Arsenal',
        shortName: 'ARS',
        logo: 'https://example.com/logos/ars.png',
        country: 'England',
        homeCity: 'London',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1886']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Tottenham Hotspur',
        shortName: 'TOT',
        logo: 'https://example.com/logos/tot.png',
        country: 'England',
        homeCity: 'London',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1882']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Newcastle United',
        shortName: 'NEW',
        logo: 'https://example.com/logos/new.png',
        country: 'England',
        homeCity: 'Newcastle',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1892']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Aston Villa',
        shortName: 'AVL',
        logo: 'https://example.com/logos/avl.png',
        country: 'England',
        homeCity: 'Birmingham',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1874']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'Brighton & Hove Albion',
        shortName: 'BHA',
        logo: 'https://example.com/logos/bha.png',
        country: 'England',
        homeCity: 'Brighton',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1901']]),
        createdBy: 'system'
    },
    {
        gameId: footballGameId,
        name: 'West Ham United',
        shortName: 'WHU',
        logo: 'https://example.com/logos/whu.png',
        country: 'England',
        homeCity: 'London',
        status: 'ACTIVE',
        metadata: new Map([['league', 'EPL'], ['founded', '1895']]),
        createdBy: 'system'
    }
];

const seedTeamMasters = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Get game IDs
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            throw new Error('Games not found. Please run game seed first.');
        }

        // Clear existing team masters
        await TeamMaster.deleteMany({});
        console.log('Cleared existing team masters');

        const teamMasterSeeds = getTeamMasterSeeds(cricketGame._id, footballGame._id);

        // Insert new team masters
        const teams = await TeamMaster.insertMany(teamMasterSeeds);
        console.log(`Seeded ${teams.length} team masters successfully`);
        console.log('Cricket Teams:', teams.filter(t => t.gameId.equals(cricketGame._id)).map(t => t.shortName));
        console.log('Football Teams:', teams.filter(t => t.gameId.equals(footballGame._id)).map(t => t.shortName));

        return teams;
    } catch (error) {
        console.error('Error seeding team masters:', error);
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    seedTeamMasters()
        .then(() => {
            console.log('TeamMaster seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('TeamMaster seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedTeamMasters, getTeamMasterSeeds };
