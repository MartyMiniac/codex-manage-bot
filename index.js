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
    helper.sendMessage(message.message.chat.id, message.text)
    res.sendStatus(200)
})

app.get('/', (req, res) => {
    helper.sendMessage(969689568, 'some one accessed the endpoint')
    res.send('hello this is working')
})

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})