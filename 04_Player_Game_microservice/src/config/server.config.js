const dotenv = require('dotenv')


dotenv.config()

module.exports = { 
    PORT  : process.env.PORT,
  
    INTERNAL_SERVER_TOKEN: process.env.INTERNAL_SERVER_TOKEN,
    MANGODB_URL: process.env.MANGODB_URL,
    PRIVATEJWT: process.env.PRIVATEJWT,
    RefreshPRIVATEJWT: process.env.RefreshPRIVATEJWT,

    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    CHANNEL_NAME: process.env.CHANNEL_NAME,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,

}