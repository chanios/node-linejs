const Client = require("../Client")
const { string_of_enum } = require("../../util/Util")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */

 module.exports = async(client, op) =>{
    let where = op.param1

    let channel = client.channels.cache.get(where) || client.groups.cache.get(where)
    if (channel && channel.messages) {
        let message = channel.messages.add({
            to: where,
            id: op.param3
        },true,{
            id: op.param3
        })
        if(message) {
            let user = client.users.cache.get(op.param2)
            client.emit("message_read",message, user)
        }
    }
}