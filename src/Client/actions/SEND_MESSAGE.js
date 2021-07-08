const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let channel = client.channels.cache.get(op.message.to)
    if (channel && channel.messages) {
        client.emit("message",channel.messages.add(op.message,true,{
            id: op.message.id
        }))
    }
}