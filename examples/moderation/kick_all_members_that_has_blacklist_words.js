const { Client } = require("../..");
const bot = new Client();

bot.on('ready',async() => {
    console.log(`logged as ${bot.user.displayName} ${bot.user.id}`)

    let group = bot.groups.cache.find(g => g.name.match(/some_awesome_group_name/))
    await group.members.fetch()//Fetch All member First

    let members = group.members.cache.filter(member => member.user.displayName.match(someblacklistword))//now find member with that name

    group.kick(members)// Kick Em
})

bot.login()