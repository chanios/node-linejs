const TextBaseChannel = require("../Channel/TextBaseChannel");
const Message = require("../Message/Message");
const Base_User = require("./Base_User");

module.exports = class User extends Base_User {
    /**
     * 
     * @param {import("../../Client/Client")} client 
     * @param {Object} data 
     */
    constructor(client,data={}){
        super(client,data)
        this.createdTime = new Date(parseInt(data.createdTime));
        this.type = data.type;
        this.status = data.status;
        this.relation = data.relation;
        this.pictureStatus = data.pictureStatus;
        this.thumbnailUrl = data.thumbnailUrl;
        this.statusMessage = data.statusMessage;
        this.displayNameOverridden = data.displayNameOverridden;
        this.favoriteTime = data.favoriteTime;
        this.capableVoiceCall = data.capableVoiceCall;
        this.capableVideoCall = data.capableVideoCall;
        this.capableMyhome = data.capableMyhome;
        this.capableBuddy = data.capableBuddy;
        this.attributes = data.attributes;
        this.settings = data.settings;
        this.recommendParams = data.recommendParams;
        this.friendRequestStatus = data.friendRequestStatus;

        this.channel = new TextBaseChannel(client,{
            id: this.id
        })
        this.client.channels.add(this.channel,true,{
            id: this.id
        })
    }
    /**
     * Send Message to this user
     * @param {String} text 
     * @param {?Message} options 
     * @return {Promise<Message>}
     */
    send(text, options={}){
        return this.channel.send(text,options)
    }
    /**
     * block this user
     */
    block(){
        return this.client.api.blockContact(0,this.id)
    }
    /**
     * unblock this user
     */
     unblock(){
        return this.client.api.unblockContact(0,this.id)
    }
}