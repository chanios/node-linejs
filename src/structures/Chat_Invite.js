const Base = require("./Base");
const {
    AcceptChatInvitationRequest,
    RejectChatInvitationRequest
} = require("../CONSENT").thrift.TalkService_types
module.exports = class Chat_Invite extends Base {
    /**
     * 
     * @param {import("../Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client)
        if (data) this._patch(data);
    }

    get channel(){
        return this.client.channels.cache.get(this.id)
    }
    
    get user(){
        return this.client.user
    }
    
    async _patch(data){
        super._patch(data)
        
        if('id' in data){
            /**
             * @type {String}
             */
            this.id = data.id;
        }
        
        if('createdTime' in data){
            /**
             * @type {?Date}
             */
            this.createdTime = new Date(parseInt(data.createdTime));
        }
    }
}