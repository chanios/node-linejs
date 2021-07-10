const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let channel = client.channels.cache.get(op.param1)
    if (channel && channel.messages) {
        client.emit('message_unsend',await channel.messages.add({
            deleted: true
        },
        true,
        {
            id: op.param2
        }))
    }
}