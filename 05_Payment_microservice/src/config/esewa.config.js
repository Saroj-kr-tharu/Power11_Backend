const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [
  'ESEWA_SECRET_KEY',
  'ESEWA_GATEWAY_URL',
  'ESEWA_PRODUCT_CODE'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

module.exports = {
  ESEWA_SECRET_KEY: process.env.ESEWA_SECRET_KEY,
  ESEWA_GATEWAY_URL: process.env.ESEWA_GATEWAY_URL,
  ESEWA_PRODUCT_CODE: process.env.ESEWA_PRODUCT_CODE,
};