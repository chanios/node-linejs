const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let executer = op.param2;

    let invite = client.invites.cache.get(where)
    client.emit("chat_invite_cancel",invite,client.users.cache.get(executer))
    client.invites.cache.delete(where)
}