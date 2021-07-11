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
        let group = await client.groups.fetch(where)
        if(group) {
            let inviter = client.users.cache.get(executer)
            client.emit("chat_invite",group,inviter)
        }
    }
}