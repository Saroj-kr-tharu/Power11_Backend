const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  FORGET_LINK: process.env.FORGET_LINK,
  MOVIE_BOOKING_URL: process.env.MOVIE_BOOKING_URL,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  
};
