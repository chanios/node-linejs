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
        let member = group.members.cache.get(op.param2)
        if(member) {
            group.members.cache.delete(param2)
            client.emit("chat_member_remove",member)
        }
    }
}