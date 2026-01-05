const mongoose = require('mongoose');
const connect = require('../config/database');
const { seedMatchesStandalone } = require('./match.seed');

const runAllSeeds = async () => {
    try {
        console.log('='.repeat(50));
        console.log('Starting Match Microservice Seeder');
        console.log('='.repeat(50));
        console.log('\nNOTE: This seeder requires Game and TeamMaster data');
        console.log('from Player_Game microservice to be seeded first.\n');

        console.log('--- Seeding Matches ---');
        await seedMatchesStandalone();

        console.log('\n' + '='.repeat(50));
        console.log('All Match seeds completed successfully!');
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
