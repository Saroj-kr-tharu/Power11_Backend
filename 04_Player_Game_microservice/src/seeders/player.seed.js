const mongoose = require('mongoose');
const Player = require('../models/player');
const Game = require('../models/game');
const connect = require('../config/database');

const getPlayerSeeds = (cricketGameId, footballGameId) => [
    // Cricket Players - Mumbai Indians
    { name: 'Rohit Sharma', gameId: cricketGameId, roles: ['BATSMAN'], team: 'MI', baseCredits: 10.5 },
    { name: 'Ishan Kishan', gameId: cricketGameId, roles: ['BATSMAN', 'WICKET_KEEPER'], team: 'MI', baseCredits: 9.0 },
    { name: 'Suryakumar Yadav', gameId: cricketGameId, roles: ['BATSMAN'], team: 'MI', baseCredits: 10.0 },
    { name: 'Tilak Varma', gameId: cricketGameId, roles: ['BATSMAN'], team: 'MI', baseCredits: 8.5 },
    { name: 'Hardik Pandya', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'MI', baseCredits: 10.5 },
    { name: 'Jasprit Bumrah', gameId: cricketGameId, roles: ['BOWLER'], team: 'MI', baseCredits: 10.0 },
    { name: 'Piyush Chawla', gameId: cricketGameId, roles: ['BOWLER'], team: 'MI', baseCredits: 7.0 },

    // Cricket Players - Chennai Super Kings
    { name: 'MS Dhoni', gameId: cricketGameId, roles: ['WICKET_KEEPER'], team: 'CSK', baseCredits: 9.0 },
    { name: 'Ruturaj Gaikwad', gameId: cricketGameId, roles: ['BATSMAN'], team: 'CSK', baseCredits: 9.5 },
    { name: 'Devon Conway', gameId: cricketGameId, roles: ['BATSMAN'], team: 'CSK', baseCredits: 9.0 },
    { name: 'Shivam Dube', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'CSK', baseCredits: 8.5 },
    { name: 'Ravindra Jadeja', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'CSK', baseCredits: 10.0 },
    { name: 'Deepak Chahar', gameId: cricketGameId, roles: ['BOWLER'], team: 'CSK', baseCredits: 8.0 },
    { name: 'Matheesha Pathirana', gameId: cricketGameId, roles: ['BOWLER'], team: 'CSK', baseCredits: 8.5 },

    // Cricket Players - Royal Challengers Bangalore
    { name: 'Virat Kohli', gameId: cricketGameId, roles: ['BATSMAN'], team: 'RCB', baseCredits: 10.5 },
    { name: 'Faf du Plessis', gameId: cricketGameId, roles: ['BATSMAN'], team: 'RCB', baseCredits: 9.5 },
    { name: 'Glenn Maxwell', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'RCB', baseCredits: 9.5 },
    { name: 'Dinesh Karthik', gameId: cricketGameId, roles: ['WICKET_KEEPER'], team: 'RCB', baseCredits: 8.0 },
    { name: 'Mohammed Siraj', gameId: cricketGameId, roles: ['BOWLER'], team: 'RCB', baseCredits: 9.0 },
    { name: 'Wanindu Hasaranga', gameId: cricketGameId, roles: ['BOWLER', 'ALL_ROUNDER'], team: 'RCB', baseCredits: 9.0 },
    { name: 'Harshal Patel', gameId: cricketGameId, roles: ['BOWLER'], team: 'RCB', baseCredits: 8.5 },

    // Cricket Players - Kolkata Knight Riders
    { name: 'Shreyas Iyer', gameId: cricketGameId, roles: ['BATSMAN'], team: 'KKR', baseCredits: 9.5 },
    { name: 'Venkatesh Iyer', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'KKR', baseCredits: 8.5 },
    { name: 'Andre Russell', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'KKR', baseCredits: 10.0 },
    { name: 'Sunil Narine', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'KKR', baseCredits: 9.5 },
    { name: 'Rinku Singh', gameId: cricketGameId, roles: ['BATSMAN'], team: 'KKR', baseCredits: 8.5 },
    { name: 'Nitish Rana', gameId: cricketGameId, roles: ['BATSMAN'], team: 'KKR', baseCredits: 8.0 },
    { name: 'Varun Chakravarthy', gameId: cricketGameId, roles: ['BOWLER'], team: 'KKR', baseCredits: 8.5 },

    // Cricket Players - Delhi Capitals
    { name: 'David Warner', gameId: cricketGameId, roles: ['BATSMAN'], team: 'DC', baseCredits: 10.0 },
    { name: 'Rishabh Pant', gameId: cricketGameId, roles: ['WICKET_KEEPER', 'BATSMAN'], team: 'DC', baseCredits: 10.0 },
    { name: 'Axar Patel', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'DC', baseCredits: 8.5 },
    { name: 'Kuldeep Yadav', gameId: cricketGameId, roles: ['BOWLER'], team: 'DC', baseCredits: 9.0 },
    { name: 'Anrich Nortje', gameId: cricketGameId, roles: ['BOWLER'], team: 'DC', baseCredits: 8.5 },
    { name: 'Mitchell Marsh', gameId: cricketGameId, roles: ['ALL_ROUNDER'], team: 'DC', baseCredits: 9.0 },
    { name: 'Prithvi Shaw', gameId: cricketGameId, roles: ['BATSMAN'], team: 'DC', baseCredits: 8.0 },

    // Cricket Players - Rajasthan Royals
    { name: 'Sanju Samson', gameId: cricketGameId, roles: ['WICKET_KEEPER', 'BATSMAN'], team: 'RR', baseCredits: 9.5 },
    { name: 'Jos Buttler', gameId: cricketGameId, roles: ['BATSMAN', 'WICKET_KEEPER'], team: 'RR', baseCredits: 10.5 },
    { name: 'Yashasvi Jaiswal', gameId: cricketGameId, roles: ['BATSMAN'], team: 'RR', baseCredits: 9.5 },
    { name: 'Shimron Hetmyer', gameId: cricketGameId, roles: ['BATSMAN'], team: 'RR', baseCredits: 8.5 },
    { name: 'Ravichandran Ashwin', gameId: cricketGameId, roles: ['BOWLER', 'ALL_ROUNDER'], team: 'RR', baseCredits: 8.5 },
    { name: 'Trent Boult', gameId: cricketGameId, roles: ['BOWLER'], team: 'RR', baseCredits: 9.0 },
    { name: 'Yuzvendra Chahal', gameId: cricketGameId, roles: ['BOWLER'], team: 'RR', baseCredits: 9.0 },

    // Football Players - Manchester United
    { name: 'Andre Onana', gameId: footballGameId, roles: ['GOALKEEPER'], team: 'MUN', baseCredits: 5.5 },
    { name: 'Lisandro Martinez', gameId: footballGameId, roles: ['DEFENDER'], team: 'MUN', baseCredits: 5.5 },
    { name: 'Harry Maguire', gameId: footballGameId, roles: ['DEFENDER'], team: 'MUN', baseCredits: 5.0 },
    { name: 'Luke Shaw', gameId: footballGameId, roles: ['DEFENDER'], team: 'MUN', baseCredits: 5.5 },
    { name: 'Diogo Dalot', gameId: footballGameId, roles: ['DEFENDER'], team: 'MUN', baseCredits: 5.5 },
    { name: 'Casemiro', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'MUN', baseCredits: 6.5 },
    { name: 'Bruno Fernandes', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'MUN', baseCredits: 9.5 },
    { name: 'Kobbie Mainoo', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'MUN', baseCredits: 6.0 },
    { name: 'Marcus Rashford', gameId: footballGameId, roles: ['FORWARD'], team: 'MUN', baseCredits: 8.5 },
    { name: 'Rasmus Hojlund', gameId: footballGameId, roles: ['FORWARD'], team: 'MUN', baseCredits: 7.5 },
    { name: 'Alejandro Garnacho', gameId: footballGameId, roles: ['FORWARD'], team: 'MUN', baseCredits: 7.0 },

    // Football Players - Manchester City
    { name: 'Ederson', gameId: footballGameId, roles: ['GOALKEEPER'], team: 'MCI', baseCredits: 6.0 },
    { name: 'Ruben Dias', gameId: footballGameId, roles: ['DEFENDER'], team: 'MCI', baseCredits: 6.5 },
    { name: 'John Stones', gameId: footballGameId, roles: ['DEFENDER'], team: 'MCI', baseCredits: 6.0 },
    { name: 'Kyle Walker', gameId: footballGameId, roles: ['DEFENDER'], team: 'MCI', baseCredits: 6.0 },
    { name: 'Josko Gvardiol', gameId: footballGameId, roles: ['DEFENDER'], team: 'MCI', baseCredits: 6.0 },
    { name: 'Rodri', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'MCI', baseCredits: 7.5 },
    { name: 'Kevin De Bruyne', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'MCI', baseCredits: 10.5 },
    { name: 'Bernardo Silva', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'MCI', baseCredits: 8.5 },
    { name: 'Erling Haaland', gameId: footballGameId, roles: ['FORWARD'], team: 'MCI', baseCredits: 14.0 },
    { name: 'Phil Foden', gameId: footballGameId, roles: ['FORWARD', 'MIDFIELDER'], team: 'MCI', baseCredits: 9.0 },
    { name: 'Jack Grealish', gameId: footballGameId, roles: ['FORWARD'], team: 'MCI', baseCredits: 7.5 },

    // Football Players - Liverpool
    { name: 'Alisson Becker', gameId: footballGameId, roles: ['GOALKEEPER'], team: 'LIV', baseCredits: 6.5 },
    { name: 'Virgil van Dijk', gameId: footballGameId, roles: ['DEFENDER'], team: 'LIV', baseCredits: 7.0 },
    { name: 'Trent Alexander-Arnold', gameId: footballGameId, roles: ['DEFENDER'], team: 'LIV', baseCredits: 7.5 },
    { name: 'Andy Robertson', gameId: footballGameId, roles: ['DEFENDER'], team: 'LIV', baseCredits: 6.5 },
    { name: 'Ibrahima Konate', gameId: footballGameId, roles: ['DEFENDER'], team: 'LIV', baseCredits: 5.5 },
    { name: 'Alexis Mac Allister', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'LIV', baseCredits: 7.5 },
    { name: 'Dominik Szoboszlai', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'LIV', baseCredits: 7.5 },
    { name: 'Ryan Gravenberch', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'LIV', baseCredits: 6.0 },
    { name: 'Mohamed Salah', gameId: footballGameId, roles: ['FORWARD'], team: 'LIV', baseCredits: 13.0 },
    { name: 'Darwin Nunez', gameId: footballGameId, roles: ['FORWARD'], team: 'LIV', baseCredits: 8.0 },
    { name: 'Luis Diaz', gameId: footballGameId, roles: ['FORWARD'], team: 'LIV', baseCredits: 8.0 },

    // Football Players - Chelsea
    { name: 'Robert Sanchez', gameId: footballGameId, roles: ['GOALKEEPER'], team: 'CHE', baseCredits: 5.0 },
    { name: 'Thiago Silva', gameId: footballGameId, roles: ['DEFENDER'], team: 'CHE', baseCredits: 5.0 },
    { name: 'Levi Colwill', gameId: footballGameId, roles: ['DEFENDER'], team: 'CHE', baseCredits: 5.0 },
    { name: 'Reece James', gameId: footballGameId, roles: ['DEFENDER'], team: 'CHE', baseCredits: 6.5 },
    { name: 'Ben Chilwell', gameId: footballGameId, roles: ['DEFENDER'], team: 'CHE', baseCredits: 5.5 },
    { name: 'Enzo Fernandez', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'CHE', baseCredits: 7.5 },
    { name: 'Moises Caicedo', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'CHE', baseCredits: 6.5 },
    { name: 'Cole Palmer', gameId: footballGameId, roles: ['MIDFIELDER', 'FORWARD'], team: 'CHE', baseCredits: 9.5 },
    { name: 'Nicolas Jackson', gameId: footballGameId, roles: ['FORWARD'], team: 'CHE', baseCredits: 7.5 },
    { name: 'Raheem Sterling', gameId: footballGameId, roles: ['FORWARD'], team: 'CHE', baseCredits: 7.0 },
    { name: 'Noni Madueke', gameId: footballGameId, roles: ['FORWARD'], team: 'CHE', baseCredits: 6.5 },

    // Football Players - Arsenal
    { name: 'David Raya', gameId: footballGameId, roles: ['GOALKEEPER'], team: 'ARS', baseCredits: 5.5 },
    { name: 'William Saliba', gameId: footballGameId, roles: ['DEFENDER'], team: 'ARS', baseCredits: 6.5 },
    { name: 'Gabriel Magalhaes', gameId: footballGameId, roles: ['DEFENDER'], team: 'ARS', baseCredits: 6.5 },
    { name: 'Ben White', gameId: footballGameId, roles: ['DEFENDER'], team: 'ARS', baseCredits: 6.0 },
    { name: 'Oleksandr Zinchenko', gameId: footballGameId, roles: ['DEFENDER'], team: 'ARS', baseCredits: 5.5 },
    { name: 'Declan Rice', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'ARS', baseCredits: 8.0 },
    { name: 'Martin Odegaard', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'ARS', baseCredits: 9.5 },
    { name: 'Bukayo Saka', gameId: footballGameId, roles: ['MIDFIELDER', 'FORWARD'], team: 'ARS', baseCredits: 10.0 },
    { name: 'Gabriel Jesus', gameId: footballGameId, roles: ['FORWARD'], team: 'ARS', baseCredits: 8.0 },
    { name: 'Gabriel Martinelli', gameId: footballGameId, roles: ['FORWARD'], team: 'ARS', baseCredits: 8.5 },
    { name: 'Kai Havertz', gameId: footballGameId, roles: ['FORWARD', 'MIDFIELDER'], team: 'ARS', baseCredits: 8.0 },

    // Football Players - Tottenham
    { name: 'Guglielmo Vicario', gameId: footballGameId, roles: ['GOALKEEPER'], team: 'TOT', baseCredits: 5.5 },
    { name: 'Cristian Romero', gameId: footballGameId, roles: ['DEFENDER'], team: 'TOT', baseCredits: 6.0 },
    { name: 'Micky van de Ven', gameId: footballGameId, roles: ['DEFENDER'], team: 'TOT', baseCredits: 5.5 },
    { name: 'Pedro Porro', gameId: footballGameId, roles: ['DEFENDER'], team: 'TOT', baseCredits: 5.5 },
    { name: 'Destiny Udogie', gameId: footballGameId, roles: ['DEFENDER'], team: 'TOT', baseCredits: 5.0 },
    { name: 'Yves Bissouma', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'TOT', baseCredits: 6.0 },
    { name: 'James Maddison', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'TOT', baseCredits: 8.0 },
    { name: 'Dejan Kulusevski', gameId: footballGameId, roles: ['MIDFIELDER'], team: 'TOT', baseCredits: 7.5 },
    { name: 'Son Heung-min', gameId: footballGameId, roles: ['FORWARD'], team: 'TOT', baseCredits: 10.5 },
    { name: 'Richarlison', gameId: footballGameId, roles: ['FORWARD'], team: 'TOT', baseCredits: 7.5 },
    { name: 'Brennan Johnson', gameId: footballGameId, roles: ['FORWARD'], team: 'TOT', baseCredits: 6.5 }
];

const seedPlayers = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Get game IDs
        const cricketGame = await Game.findOne({ name: 'CRICKET' });
        const footballGame = await Game.findOne({ name: 'FOOTBALL' });

        if (!cricketGame || !footballGame) {
            throw new Error('Games not found. Please run game seed first.');
        }

        // Clear existing players
        await Player.deleteMany({});
        console.log('Cleared existing players');

        const playerSeeds = getPlayerSeeds(cricketGame._id, footballGame._id);

        // Insert new players
        const players = await Player.insertMany(playerSeeds);
        console.log(`Seeded ${players.length} players successfully`);
        console.log('Cricket Players:', players.filter(p => p.gameId.equals(cricketGame._id)).length);
        console.log('Football Players:', players.filter(p => p.gameId.equals(footballGame._id)).length);

        return players;
    } catch (error) {
        console.error('Error seeding players:', error);
        throw error;
    }
};

// Run if executed directly
if (require.main === module) {
    seedPlayers()
        .then(() => {
            console.log('Player seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Player seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedPlayers, getPlayerSeeds };
