const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [

    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_FAILED_URL',
    'STRIPE_SUCCESS_URL',


];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

module.exports = {

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_FAILED_URL: process.env.STRIPE_FAILED_URL,
    STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL,

};