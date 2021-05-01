const iterapi = require('node-iterapi')
const axios = require('axios')
const express = require('express')
const helper = require('./helper')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000
const TOKEN = process.env.BOT_TOKEN
const DOMAIN = `https://api.telegram.org/bot${TOKEN}/`

app.post(`/${TOKEN}`, (req, res) => {
    message=req.body
    res.sendStatus(200)
    //helper.sendMessage(message.message.from.id, message.message.text)
    helper.commandHandler(message.message.from.id, message.message.text)
})

app.get('/', (req, res) => {
    helper.sendMessage(969689568, 'some one accessed the endpoint')
    res.send('hello this is working')
})

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})