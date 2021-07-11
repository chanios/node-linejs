const { Client } = require("..");
const bot = new Client();

bot.on('ready',()=>{
    console.log(`logged as ${bot.user.displayName} ${bot.user.id}`)
    
    //mention with user object
    let user = bot.users.cache.get('someuserid')
    user.send(`hello ${user}`)

    //mention with user id
    user.send(`hello <@userid>`)
})
bot.login()