const axios = require('axios')
require('dotenv').config()

const TOKEN = process.env.BOT_TOKEN
const DOMAIN = `https://api.telegram.org/bot${TOKEN}/`

const sendMessage = (id, msg) => {
    console.log('id', id, 'message', msg)
    axios.post(DOMAIN+'sendMessage', {
        chat_id: id,
        text: msg
    })
    .catch(err => {
        console.log('id', id, 'message', msg)
        console.log('error in sending message')
    })
}

module.exports = {
    sendMessage: sendMessage
}