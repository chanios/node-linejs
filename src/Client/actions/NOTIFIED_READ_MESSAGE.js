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
    
    let channel = client.channels.cache.get(where)

    let user = client.users.cache.get(executer)
    let message = channel.messages.cache.get(target)
    
    client.emit("message_read",message, user)
}