const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let channel = client.channels.cache.get(op.param1)
    if (channel) {
        client.emit('call_receive',channel)
    }
}