const mongoose = require('mongoose');
const connect = require('../config/database');
const { seedContestsStandalone } = require('./contest.seed');

const runAllSeeds = async () => {
    try {
        console.log('='.repeat(50));
        console.log('Starting Contest Microservice Seeder');
        console.log('='.repeat(50));
        console.log('\nNOTE: This seeder requires Game and Match data');
        console.log('to be seeded first.\n');

        console.log('--- Seeding Contests ---');
        await seedContestsStandalone();

        console.log('\n' + '='.repeat(50));
        console.log('All Contest seeds completed successfully!');
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
