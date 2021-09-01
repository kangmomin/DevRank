const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./token')[0]

const callApi = require('./callApi')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
    if(!msg.content.startsWith("+")) return 0 //커맨드가 아니라면 무시 
    if(msg.author.bot) return 0 //봇이 친 커맨드라면 무시

    const cmd = msg.content.split(' ')[0].slice(1) //커맨드 부분만 따로 따냄 

    if(cmd == "call") return callApi(msg)
})

client.login(token)