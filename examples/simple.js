const Client = require('../src/Client/Client');
const bot = new Client();

bot.on('ready',()=>{
    console.log('logged as ' + bot.user.displayName + ' ' + bot.user.id)
})

bot.on('message',
/**
 * 
 * @param {import('../src/structures/Message/Message')} message 
 */
async(message)=>{
    if(message.author.id == bot.user.id) return;
    if(message.content == 'ping') {
        await message.channel.send('pong')
    }
})
bot.on('message_read',
/**
 * 
 * @param {import('../src/structures/Message/Message')} message 
 * @param {import('../src/structures/User/User')} user 
 */
(message,user)=>{
    console.log(`${user.displayName} READ ${message.id} ${message.content}`)
})
bot.on('chat_invite',invite=>{
    console.log(`channel ${invite.id} invite by ${invite.user.displayName}`)
    invite.accept()
})
bot.on('chat_join',channel=>{
    channel.send('มานี่ได้ไงฟะ')
})

bot.login()