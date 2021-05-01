const axios = require('axios')

const TOKEN = process.env.BOT_TOKEN
const DOMAIN = `https://api.telegram.org/bot${TOKEN}/`

const sendMessage = (id, msg) => {
    axios.post(DOMAIN+'/sendMessage', {
        chat_id: id,
        text: msg
    })
}

module.exports = {
    sendMessage: sendMessage()
}