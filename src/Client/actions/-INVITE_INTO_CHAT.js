const Client = require("../Client")

/**
 * 
 * @param {Client} client 
 * @param {any} op 
 */
module.exports = async(client, op) =>{
    /*
    let where = op.param1;
    let executer = op.param2;

    let invite = client.invites.add({
        id: where,
        createdTime: op.createdTime
    },true,{
        id: where
    })*/
    client.emit("invite_other",op)
}