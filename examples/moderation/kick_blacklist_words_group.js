const { Client } = require("../..");
const bot = new Client();

bot.on('ready',()=>{
    console.log(`logged as ${bot.user.displayName} ${bot.user.id}`)
})

bot.on('message',async(message)=>{
    if(message.author.id == bot.user.id) return;
    if(!message.group) return; // return if this message is not in group
    if(message.content.match(/blacklisted/)) {
        message.member.kick()
    }
})

bot.login()