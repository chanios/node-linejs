const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let user_id = op.param2;
    let group = client.groups.cache.get(where)
    
    if(group) {
        let member = group.members.cache.get(user_id)
        if(member) {
            group.members.cache.delete(user_id)
            client.emit("chat_member_remove",member)
        }
    }
}