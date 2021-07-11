const { Client } = require("..");
const bot = new Client();

bot.on('ready',async() => {
    console.log(`logged as ${bot.user.displayName} ${bot.user.id}`)

    let group = bot.groups.cache.find(g => g.name.match(/some_awesome_group_name/))
    await group.members.fetch()//Fetch All member First

    let member = group.members.cache.find(member => member.user.displayName == "someawesome")//now find member with that name

    await member.user.send('HeW looo ' + member.user.displayName)//Now Dm to that user
    member.kick()//Now Kick that Member

    group.invite(member)// Hey Comeback :3

    member.user.block()// Block Him hmmm
})
bot.login()