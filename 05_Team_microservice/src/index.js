const express = require('express')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')


const {PORT}= require('./config/server.config')
const connect = require('../src/config/database.js');
const appRoutes = require('./Routes/index')

const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser());

    
    
    app.use("/api", appRoutes)

    app.listen(PORT, async () => {
        console.log(` Team Server start at ${PORT}`)
        await connect();
        console.log('Mongodb Connected');
    })

}

serverSetupAndStart()