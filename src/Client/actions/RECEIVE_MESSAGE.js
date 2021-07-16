const CONSENT = require("../../CONSENT")
const { string_of_enum } = require("../../util/Util")

/*
  'USER' : 0,
  'ROOM' : 1,
  'GROUP' : 2,
  'SQUARE' : 3,
  'SQUARE_CHAT' : 4,
  'SQUARE_MEMBER' : 5,
  'BOT' : 6
*/
module.exports = async(client, op) =>{
    let channel;
    let mid_type = string_of_enum(CONSENT.thrift.TalkService_types.MIDType,op.message.toType)
    
    if(mid_type == 'USER') channel = client.channels.cache.get(op.message._from)
    else if(mid_type == 'GROUP') channel = client.groups.cache.get(op.message.to)
    else client.debug && console.trace('unknow type ',mid_type, op)
    let content_type = string_of_enum(CONSENT.thrift.TalkService_types.ContentType,op.message.contentType)
    if(content_type == "CALL") {
        client.emit('call_receive',channel)
    }
    else if (channel && channel.messages) {
        client.emit("message",channel.messages.add(op.message,true,{
            id: op.message.id
        }))
    }
}  