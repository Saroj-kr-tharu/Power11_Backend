const dotenv = require('dotenv')


dotenv.config()

module.exports = { 
    PORT  : process.env.PORT,
    PRIVATEJWT  : process.env.PRIVATEJWT,
    
    INTERNAL_SERVER_TOKEN: process.env.INTERNAL_SERVER_TOKEN,
    MANGODB_URL: process.env.MANGODB_URL,

    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    CHANNEL_NAME: process.env.CHANNEL_NAME,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    
    PLAYER_GAME_BACKEND_URL: process.env.PLAYER_GAME_BACKEND_URL,
    TEAM_BACKEND_URL: process.env.TEAM_BACKEND_URL,
    CONTEST_BACKEND_URL: process.env.CONTEST_BACKEND_URL,
    MATCH_BACKEND_URL: process.env.MATCH_BACKEND_URL,



}