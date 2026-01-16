const express = require('express')
const bodyParser = require('body-parser')


const { createChannel, subscribeMessage } = require("./utlis/messageQueue");
const { subscribeEvent } = require("./services/remainder.service.js");


const {PORT, REMINDER_BINDING_KEY, REDIS_URL}= require('./config/server.config')
const connect = require('../src/config/database.js');
const appRoutes = require('./Routes/index')

const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    
    app.use("/api", appRoutes)
    const channel = await createChannel();
    subscribeMessage(channel, subscribeEvent, REMINDER_BINDING_KEY);

    app.listen(PORT, async () => {
        console.log(` Leardboard Server start at ${PORT}`)
        await connect();
        console.log('Mongodb Connected');
    })

}

serverSetupAndStart()