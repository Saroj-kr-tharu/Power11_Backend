const mongoose = require('mongoose');
const Game = require('../models/game');
const connect = require('../config/database');

const gameSeeds = [
    {
        name: 'CRICKET',
        maxPlayers: 11,
        creditLimit: 100,
        rolesConfig: new Map([
            ['BATSMAN', { min: 3, max: 6 }],
            ['BOWLER', { min: 3, max: 6 }],
            ['ALL_ROUNDER', { min: 1, max: 4 }],
            ['WICKET_KEEPER', { min: 1, max: 4 }]
        ]),
        scoringRules: new Map([
            ['run', 1],
            ['four', 1],
            ['six', 2],
            ['wicket', 25],
            ['catch', 8],
            ['stumping', 12],
            ['run_out', 6],
            ['maiden_over', 8],
            ['half_century', 8],
            ['century', 16],
            ['duck', -2],
            ['economy_rate_below_5', 6],
            ['economy_rate_5_to_6', 4],
            ['economy_rate_6_to_7', 2],
            ['economy_rate_10_to_11', -2],
            ['economy_rate_above_11', -4],
            ['strike_rate_above_170', 6],
            ['strike_rate_150_to_170', 4],
            ['strike_rate_130_to_150', 2],
            ['strike_rate_60_to_70', -2],
            ['strike_rate_below_60', -4],
            ['3_wicket_haul', 8],
            ['4_wicket_haul', 16],
            ['5_wicket_haul', 24]
        ]),
        status: 'ACTIVE',
        rulesVersion: 1
    },
    {
        name: 'FOOTBALL',
        maxPlayers: 11,
        creditLimit: 100,
        rolesConfig: new Map([
            ['GOALKEEPER', { min: 1, max: 1 }],
            ['DEFENDER', { min: 3, max: 5 }],
            ['MIDFIELDER', { min: 3, max: 5 }],
            ['FORWARD', { min: 1, max: 3 }]
        ]),
        scoringRules: new Map([
            ['goal_goalkeeper', 10],
            ['goal_defender', 6],
            ['goal_midfielder', 5],
            ['goal_forward', 4],
            ['assist', 3],
            ['clean_sheet_goalkeeper', 4],
            ['clean_sheet_defender', 4],
            ['clean_sheet_midfielder', 1],
            ['penalty_save', 5],
            ['penalty_miss', -2],
            ['goals_conceded_2', -1],
            ['yellow_card', -1],
            ['red_card', -3],
            ['own_goal', -2],
            ['saves_3', 1],
            ['pass_accuracy_70', 1],
            ['pass_accuracy_80', 2],
            ['pass_accuracy_90', 3],
            ['tackles_won_5', 2],
            ['interceptions_3', 1],
            ['shots_on_target_3', 1]
        ]),
        status: 'ACTIVE',
        rulesVersion: 1
    }
];

const seedGames = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Clear existing games
        await Game.deleteMany({});
        console.log('Cleared existing games');

        // Insert new games
        const games = await Game.insertMany(gameSeeds);
        console.log(`Seeded ${games.length} games successfully`);
        console.log('Games:', games.map(g => ({ id: g._id, name: g.name })));

        return games;
    } catch (error) {
        console.error('Error seeding games:', error);
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    seedGames()
        .then(() => {
            console.log('Game seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Game seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedGames, gameSeeds };
