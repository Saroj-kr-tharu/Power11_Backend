const mongoose = require('mongoose');
const Leaderboard = require('../models/leaderboard');
const connect = require('../config/database');

/**
 * Leaderboard Seeder
 * 
 * NOTE: This seeder requires Contest and Team data to be seeded first.
 * 
 * Creates leaderboard entries for completed contests with rankings.
 */

/**
 * Generates leaderboard entries for a contest
 * @param {ObjectId} contestId - The contest ID
 * @param {Number} participantCount - Number of participants
 * @param {Boolean} isCompleted - Whether the contest is completed
 */
const generateLeaderboardEntries = (contestId, participantCount, isCompleted = false) => {
    const entries = [];
    
    // Generate sample user IDs and team IDs
    for (let i = 0; i < participantCount; i++) {
        // Generate points (higher for better ranks if completed)
        const basePoints = isCompleted ? Math.floor(Math.random() * 200) + 50 : 0;
        
        entries.push({
            contestId,
            teamId: new mongoose.Types.ObjectId(), // Placeholder team ID
            userId: `user_${String(i + 1).padStart(5, '0')}`,
            totalPoints: basePoints,
            rank: null // Will be calculated after sorting
        });
    }
    
    // Sort by points and assign ranks for completed contests
    if (isCompleted) {
        entries.sort((a, b) => b.totalPoints - a.totalPoints);
        entries.forEach((entry, index) => {
            entry.rank = index + 1;
        });
    }
    
    return entries;
};

/**
 * Seed leaderboards using external contest data
 * @param {Array} contests - Array of contest documents
 */
const seedLeaderboards = async (contests) => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        if (!contests || contests.length === 0) {
            throw new Error('Contest data is required.');
        }

        // Clear existing leaderboards
        await Leaderboard.deleteMany({});
        console.log('Cleared existing leaderboards');

        const leaderboardSeeds = [];

        // Process completed contests only for meaningful leaderboard data
        const completedContests = contests.filter(c => c.status === 'COMPLETED');
        
        for (const contest of completedContests) {
            const participantCount = Math.min(contest.joinedParticipants, 50); // Limit for seeding
            
            if (participantCount > 0) {
                const entries = generateLeaderboardEntries(
                    contest._id,
                    participantCount,
                    true
                );
                leaderboardSeeds.push(...entries);
            }
        }

        // Insert leaderboard entries
        if (leaderboardSeeds.length > 0) {
            const insertedLeaderboards = await Leaderboard.insertMany(leaderboardSeeds);
            console.log(`Seeded ${insertedLeaderboards.length} leaderboard entries successfully`);
        } else {
            console.log('No leaderboard entries to seed (no completed contests)');
        }

        return leaderboardSeeds;
    } catch (error) {
        console.error('Error seeding leaderboards:', error);
        throw error;
    }
};

/**
 * Standalone seeder - fetches contest data from shared database
 */
const seedLeaderboardsStandalone = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Define Contest schema for fetching data
        const ContestSchema = new mongoose.Schema({
            name: String,
            matchId: mongoose.Schema.Types.ObjectId,
            gameId: mongoose.Schema.Types.ObjectId,
            status: String,
            joinedParticipants: Number
        });
        const Contest = mongoose.models.Contest || mongoose.model('Contest', ContestSchema);

        // Define Team schema for fetching user teams
        const TeamSchema = new mongoose.Schema({
            userId: String,
            matchId: mongoose.Schema.Types.ObjectId,
            name: String
        });
        const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);

        // Fetch contests
        const contests = await Contest.find({});
        if (contests.length === 0) {
            console.error('No contests found. Please ensure contests are seeded first.');
            console.log('Run: node 06_Contest_microservice/src/seeders/contest.seed.js');
            throw new Error('Contests not found');
        }

        console.log(`Found ${contests.length} contests`);

        // Fetch teams if available
        const teams = await Team.find({});
        console.log(`Found ${teams.length} teams`);

        // Clear existing leaderboards
        await Leaderboard.deleteMany({});
        console.log('Cleared existing leaderboards');

        const leaderboardSeeds = [];

        // Process contests (prioritize completed ones)
        const completedContests = contests.filter(c => c.status === 'COMPLETED');
        const liveContests = contests.filter(c => c.status === 'LIVE');
        
        console.log(`Completed contests: ${completedContests.length}`);
        console.log(`Live contests: ${liveContests.length}`);

        // Create team lookup by match
        const teamsByMatch = {};
        teams.forEach(team => {
            const matchKey = team.matchId?.toString();
            if (matchKey) {
                if (!teamsByMatch[matchKey]) {
                    teamsByMatch[matchKey] = [];
                }
                teamsByMatch[matchKey].push(team);
            }
        });

        // Generate leaderboard entries for completed contests
        for (const contest of completedContests) {
            const matchTeams = teamsByMatch[contest.matchId?.toString()] || [];
            const participantCount = Math.min(contest.joinedParticipants || 10, 50);
            
            // If we have actual teams, use them; otherwise generate placeholder data
            if (matchTeams.length > 0) {
                const entries = matchTeams.slice(0, participantCount).map((team, index) => ({
                    contestId: contest._id,
                    teamId: team._id,
                    userId: team.userId,
                    totalPoints: Math.floor(Math.random() * 200) + 50,
                    rank: null
                }));
                
                // Sort and assign ranks
                entries.sort((a, b) => b.totalPoints - a.totalPoints);
                entries.forEach((entry, idx) => {
                    entry.rank = idx + 1;
                });
                
                leaderboardSeeds.push(...entries);
            } else {
                // Generate placeholder leaderboard data
                const entries = generateLeaderboardEntries(contest._id, participantCount, true);
                leaderboardSeeds.push(...entries);
            }
        }

        // Generate partial leaderboard entries for live contests
        for (const contest of liveContests) {
            const participantCount = Math.min(contest.joinedParticipants || 5, 20);
            const entries = generateLeaderboardEntries(contest._id, participantCount, false);
            
            // Live contests might have some points but no final rank
            entries.forEach(entry => {
                entry.totalPoints = Math.floor(Math.random() * 100);
            });
            
            leaderboardSeeds.push(...entries);
        }

        // Insert leaderboard entries
        if (leaderboardSeeds.length > 0) {
            try {
                const insertedLeaderboards = await Leaderboard.insertMany(leaderboardSeeds, { ordered: false });
                console.log(`Seeded ${insertedLeaderboards.length} leaderboard entries successfully`);
            } catch (error) {
                if (error.code === 11000) {
                    console.log('Seeded leaderboard entries with some duplicates skipped');
                } else {
                    throw error;
                }
            }
        } else {
            console.log('No leaderboard entries to seed');
        }

        return leaderboardSeeds;
    } catch (error) {
        console.error('Error seeding leaderboards:', error);
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    seedLeaderboardsStandalone()
        .then(() => {
            console.log('Leaderboard seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Leaderboard seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedLeaderboards, seedLeaderboardsStandalone, generateLeaderboardEntries };
