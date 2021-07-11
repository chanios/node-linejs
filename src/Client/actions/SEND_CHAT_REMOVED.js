const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let channel = client.channels.cache.get(op.param1)
    let message_id = op.param2
    if (channel && channel.messages) {
        let message = channel.messages.cache.get(message_id)
        if(message) {
            channel.messages.cache.delete(message_id)
            client.emit('message_unsend',message)
        }
    }
}