const Client = require("../Client")
/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    
    let group = client.groups.cache.get(where)
    if(group) {
        client.groups.cache.delete(where)
        client.emit("chat_invite_reject",group)
    }
}