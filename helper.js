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

const sendUrl = (id, msg, btnText, url) => {
    console.log('id', id, 'message', msg)
    axios.post(DOMAIN+'sendMessage', {
        "chat_id":id,
        "text": msg,
        "reply_markup":JSON.stringify({
            "inline_keyboard": [
                [
                    {
                        "text": btnText,
                        "url": url
                    }
                ]
            ]
        })
    })
    .catch(err => {
        console.log('id', id, 'message', msg)
        console.log('error in sending message')
    })
}
const login = (arr) => {
    sendUrl(id, 'Codex Welcomes You', 'Join Codex', 'https://www.google.com')
}
const commandHandler = (id, text) => {
    arr=text.split(' ')
    switch(arr[0]) {
        case '/start':
            sendMessage(id, 'This is the start')
        break
        case '/register':
            sendMessage(id, `Greetings from Codex:
            This bot will help you to join the main Codex Club Group
            But First we need to Verify, it is youThis is measure has been taken to avoid non qualified persons from entering the codex club
            you need to verify yourself by entering the login credentials used to login into student portal
            Enter /login <registration number> <password> to verify yourself
            Say your regno is 1941012869 and password is blackhatcoder then Enter
            /login 1941012869 blackhatcoder`)
        case '/login':
            sendMessage(id, 'please while we verify your credentials')
            login(id, arr)
    }
}

module.exports = {
    sendMessage: sendMessage,
    commandHandler: commandHandler
}