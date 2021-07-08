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
    
    if(target == client.user.id) {
        let invite = client.invites.add({
            id: where,
            createdTime: op.createdTime
        },true,{
            id: where
        })
        let inviter = client.users.cache.get(executer)
        client.emit("chat_invite",invite,inviter)
    }
}