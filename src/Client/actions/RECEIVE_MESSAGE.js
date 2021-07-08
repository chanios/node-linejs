const Message = require("../../structures/Message/Message")

module.exports = async(client, op) =>{
    let msg = new Message(client,op.message)
    client.emit("message",await msg.author.channel.messages.add(msg,true,{id:msg.id}))
}