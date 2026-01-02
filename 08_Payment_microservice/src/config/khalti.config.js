const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [
  
  'KHALTI_SECRET_KEY',
  'KHALTI_PUBLIC_KEY',
  'KHALTI_PAYMENT_URL',
  'KHALTI_VERIFICATION_URL'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

module.exports = {

  KHALTI_SECRET_KEY: process.env.KHALTI_SECRET_KEY,
  KHALTI_PUBLIC_KEY: process.env.KHALTI_PUBLIC_KEY,
  KHALTI_PAYMENT_URL: process.env.KHALTI_PAYMENT_URL,
  KHALTI_VERIFICATION_URL: process.env.KHALTI_VERIFICATION_URL,
};