const MessageMananger = require("../../Managers/MessageManager");
const Message = require("../Message/Message");
const Channel = require("./Channel");

module.exports = class TextBaseChannel extends Channel {
    /**
     * 
     * @param {import("../Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client,data)
        
        this.messages = new MessageMananger(this)

        if (data) this._patch(data);
    }
    
    async _patch(data){
        super._patch(data)
        
        if('createdTime' in data) {
            /**
             * @type {?Date}
             */
            this.createdTime = new Date(parseInt(data.createdTime));
        }
        
        if('favoriteTimestamp' in data) {
            /**
             * @type {?Date}
             */
            this.favoriteTimestamp = new Date(parseInt(data.favoriteTimestamp));
        }
        
        if('name' in data) {
            /**
             * @type {?String}
             */
            this.name = data.name;
        }

        if('chatName' in data) {
            /**
             * @type {?String}
             */
            this.name = data.chatName;
        }

        if('picturePath' in data) {
            /**
             * @type {?String}
             */
            this.picturePath = data.picturePath;
        }
        if('extra' in data) {
            /**
             * @type {?any}
             */
            this.extra = data.extra;
        }
    }
    
    /**
     * Send Message to this channel
     * @param {String} text 
     * @param {?Message} options 
     * @return {Promise<Message>}
     */
     async send(text, options={}){
        if(!'contentType' in options) option["contentType"] = 0
        if(!'contentMetadata' in options) option["contentMetadata"] = {}

        let msg = new Message(this.client,{
            _from: this.client.user.id,
            to: this.id,
            text,
            ...options
        })
        let m = await this.client.api.sendMessage(0,msg)
        msg._patch(m)
        return msg
    }
}