const axios = require('axios')
const iterapi = require('./node-iterapi')
const invites = require('./invites')
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
            console.log('login done')
            student.info()
            .then(info => {
                let name = info.detail[0].name
                let yr = 4-(parseInt(info.detail[0].enrollmentno.substring(0,2))-17)
                let reg = info.detail[0].enrollmentno

                if(invites.includes(reg)) {
                    sendMessage(969689568, `${name}, ${arr[1]} joined`)
                    sendUrl(id, `Hi ${name},\nCodex Welcomes You`, 'Join Codex', JOIN_URL)
                }
                else {
                    sendMessage(969689568, `${name}, ${arr[1]} tried joining but failed`)
                    sendMessage(id, 'Only selected students are welcomed to Codex\nIf you think you were selected but you are unable to join then message in the group tagging @martyminiac')
                }
            })
            .catch(() => {
                sendMessage(id, `login failure: check your login credentials\nI received:\nRegistration Number : ${arr[1]}\nPassword : ${arr[2]}`)
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
            sendMessage(969689568, `person with ID ${id} started using the bot`)
            sendMessage(id, 'use /register to trigger the bot\nTo learn more about the bot use /info')
        break
        case '/register':
            sendMessage(969689568, `person with ID ${id} tried to register`)
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
        break
        case '/info':
            sendMessage(969689568, `person with ID ${id} found your info`)
            sendUrl(id, `This Project is made by Rohan Verma,\nTo Find More about the project click on the following button`, 'Github Repo', 'https://github.com/MartyMiniac/codex-manage-bot')
        break
    }
}

module.exports = {
    sendMessage: sendMessage,
    commandHandler: commandHandler
}