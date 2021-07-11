const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let executer = op.param2;

    let group = client.groups.cache.get(where)
    if(group) {
        group.invites.cache.delete(executer)
        client.emit("chat_invite_accept",group,client.users.cache.get(executer))
    }
}