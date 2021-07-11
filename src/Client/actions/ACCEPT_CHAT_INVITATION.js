const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let group = await client.groups.cache.get(where)
    
    if(group) {
        let invite_member = group.invites.cache.get(client.user.id)
        if(invite_member) {
            group.members.add(invite_member,true,{
                id: client.user.id
            })
            group.invites.cache.delete(client.user.id)
        }
        client.emit("chat_join",group)
    }
}