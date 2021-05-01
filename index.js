const iterapi = require('node-iterapi')
const axios = require('axios')
const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000
const TOKEN = process.env.BOT_TOKEN
const DOMAIN = `https://api.telegram.org/bot${TOKEN}/`

app.post(`/${TOKEN}`, (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})