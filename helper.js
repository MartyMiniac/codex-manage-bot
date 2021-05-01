const axios = require('axios')
const iterapi = require('node-iterapi')
require('dotenv').config()

const TOKEN = process.env.BOT_TOKEN
const DOMAIN = `https://api.telegram.org/bot${TOKEN}/`
const JOIN_URL = process.env.JOIN_URL

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
const login = (id, arr) => {
    if(arr.length<3) {
        sendMessage(id, 'login failure: incomplete details provided')
    }
    else {
        console.log(arr[1], arr[2])
        let student = new iterapi(arr[1], arr[2])
        student.login().then(() => {
            student.info().then(info => {
                let name = info.name
                let yr = 4-(parseInt(res.detail[0].enrollmentno.substring(0,2))-17)

                if(yr==1) {
                    sendUrl(id, `Hi ${name},\nCodex Welcomes You`, 'Join Codex', JOIN_URL)
                }
                else {
                    sendMessage(id, 'Bro... I said only first years not you')
                }
            })
        }).catch(() => {
            sendMessage(id, `login failure: check your login credentials\nI received:\nRegistration Number : ${arr[1]}\nPassword : ${arr[2]}`)
        })
    }
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
        break
        case '/login':
            login(id, arr)
    }
}

module.exports = {
    sendMessage: sendMessage,
    commandHandler: commandHandler
}