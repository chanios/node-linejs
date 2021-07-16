const Client = require("../Client")
/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = (client, op) =>{
    let raw_updated = JSON.parse(op.param3)

    let updated = {}
    for (const key in raw_updated) {
        if(key.startsWith('OLD_')) {
            let real_key = key.replace(/OLD_/,'')
            if(raw_updated[real_key]){
                if(real_key == "DISPLAY_NAME") updated['displayName'] = raw_updated[real_key]
                else client.debug && console.trace("UNKNOW UPDATE TYPE", real_key)
            }
        }
    }
    
    if (Object.keys(updated).length !== 0) { // Check For Empty(No Update)
        let old_user = client.users.cache.get(op.param1)
        let new_user = client.users.add({
            id: op.param1,
            ...updated
        },true,{
            id: op.param1
        })
        client.emit('UserUpdate',old_user,new_user)
    }
}