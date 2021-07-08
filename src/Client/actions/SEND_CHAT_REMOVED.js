const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let executer = op.param2;

    let channel = client.channels.cache.get(where)
    
    channel.messages.cache.get(executer)

    client.emit("message_delete",message)
}