const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let channel = client.channels.cache.get(where)
    
    client.emit("chat_leave",channel)
    client.channels.cache.delete(where)
}