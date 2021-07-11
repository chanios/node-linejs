const Client = require("../Client")
/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let executer = op.param2;
    let target = op.param3;
    
    if(target == client.user.id) {
        let group = await client.groups.cache.get(where)
        if(group) {
            let group = await client.groups.cache.get(where)
            let member = group.invites.add({
                id: executer
            },true,{
                id: executer
            })
            await member.fetch()
            client.emit("chat_invite_other",member,group.me)
        }
    }
}