const axios = require('axios');
const {INTERNAL_SERVER_TOKEN,CONTEST_BACKEND_URL, MATCH_BACKEND_URL,PLAYER_GAME_BACKEND_URL  } = require('../config/server.config')

// Service URLs
const SERVICES = {
    GAME: PLAYER_GAME_BACKEND_URL,
    CONTEST: CONTEST_BACKEND_URL,
    MATCH:  MATCH_BACKEND_URL
};

// Pre-configured axios instance with internal token
const internalClient = axios.create({
    timeout: 5000,
    headers: {
        'x-internal-server-token': INTERNAL_SERVER_TOKEN,
        'x-service-name': 'team-service',
        'Content-Type': 'application/json',
    },
});

// Optional: Add response interceptor for error handling
internalClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(`Internal service call failed: ${error}`);
        throw error;
    }
);

module.exports = { internalClient, SERVICES };