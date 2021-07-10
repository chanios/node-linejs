const { Client } = require("node-linejs");
const bot = new Client();

bot.on('ready',()=>{
    console.log(`logged as ${bot.user.displayName} ${bot.user.id}`)
    /*
    bot.users.cache.get('someuserid').send('Heww lo Line (⪴╰╯⪳)')
    bot.channels.cache.get('somechannelid').send('Heww lo Line (⪴╰╯⪳)')
    */
    
})
bot.on('message',async(message)=>{
    if(message.author.id == bot.user.id) return;
    if(message.content == 'ping') {
        await message.channel.send('pong')
    }
})
bot.on('message_read',(message,user)=>{
    console.log(`${user.displayName} READ ${message.id} ${message.content}`)
})
bot.on('chat_invite',invite=>{
    console.log(`channel ${invite.id} invite by ${invite.user.displayName}`)
})
bot.on('chat_join',channel=>{
    channel.send('Chat Joined')
})
// Raw Data From Fetchops
bot.on('raw',(op,data)=>{
    console.log(op,data)
})
bot.login()