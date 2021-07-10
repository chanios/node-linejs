module.exports = async(client, op) =>{
    let channel = client.channels.cache.get(op.message.to)
    if (channel && channel.messages) {
        client.emit("message",channel.messages.add(op.message,true,{
            id: op.message.id
        }))
    }
}