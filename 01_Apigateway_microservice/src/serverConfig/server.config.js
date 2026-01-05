const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    FORTEND_URL: process.env.FORTEND_URL,
    AUTH_BACKEND_URL: process.env.AUTH_BACKEND_URL,
    PAYMENT_BACKEND_URL: process.env.PAYMENT_BACKEND_URL,
    PLAYER_GAME_BACKEND_URL: process.env.PLAYER_GAME_BACKEND_URL,
    TEAM_BACKEND_URL: process.env.TEAM_BACKEND_URL,
    CONTEST_BACKEND_URL: process.env.CONTEST_BACKEND_URL,
    LEADERBOARD_BACKEND_URL: process.env.LEADERBOARD_BACKEND_URL,
    MATCH_BACKEND_URL: process.env.MATCH_BACKEND_URL,
    
    
    PORT: process.env.PORT,
    INTERNAL_SERVER_TOKEN: process.env.INTERNAL_SERVER_TOKEN,

    PRIVATEJWT: process.env.PRIVATEJWT,
    RefreshPRIVATEJWT: process.env.RefreshPRIVATEJWT,
}