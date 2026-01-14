const mongoose = require('mongoose');

const {MANGODB_URL} = require('./server.config')



const connect = async() => {
    await mongoose.connect(MANGODB_URL);
    
}

module.exports =  connect;