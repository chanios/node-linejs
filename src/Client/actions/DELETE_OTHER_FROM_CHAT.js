const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    let where = op.param1;
    let deleter = op.param2;
    let target = op.param3;
    let group = client.groups.cache.get(where)
    if(group) {
        let member = group.members.cache.get(target)
        if(member) {
            group.members.cache.delete(target)
            client.emit("chat_member_remove",member,group.members.cache.get(deleter))
        }
    }

}