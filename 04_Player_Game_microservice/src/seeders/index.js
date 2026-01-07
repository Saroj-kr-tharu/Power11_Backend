const mongoose = require('mongoose');
const connect = require('../config/database');

const { seedGames } = require('./game.seed');
const { seedTeamMasters } = require('./teammaster.seed');
const { seedPlayers } = require('./player.seed');
const { seedMatchPlayersStandalone } = require('./matchplayer.seed');

const runAllSeeds = async () => {
    try {
        await connect();
        console.log('='.repeat(50));
        console.log('Starting Player_Game Microservice Seeder');
        console.log('='.repeat(50));

        // Seed in order (games first, then dependent data)
        console.log('\n--- Seeding Games ---');
        await seedGames();

        console.log('\n--- Seeding Team Masters ---');
        await seedTeamMasters();

        console.log('\n--- Seeding Players ---');
        await seedPlayers();

        console.log('\n--- Seeding Match Players ---');
        console.log('NOTE: Match Players require Matches to be seeded first.');
        console.log('If matches are not seeded, this step will be skipped.');
        try {
            await seedMatchPlayersStandalone();
        } catch (error) {
            console.log('Match Players seeding skipped (run after seeding matches)');
        }

        console.log('\n' + '='.repeat(50));
        console.log('All seeds completed successfully!');
        console.log('='.repeat(50));

    } catch (error) {
        console.error('Seeding failed:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run if executed directly
if (require.main === module) {
    runAllSeeds()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error('Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { runAllSeeds };
