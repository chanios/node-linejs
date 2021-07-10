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
    
    /** @private */
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
    /**
     * Accept This Invite
     * @return {Promise<Object>}
     */
    async accept(){
        return await this.client.api.acceptChatInvitation(new AcceptChatInvitationRequest({
            reqSeq: 0,
            chatMid: this.id
        }))
    }
    
    /**
     * Reject This Invite
     * @return {Promise<Object>}
     */
    async reject(){
        return await this.client.api.rejectChatInvitation(new RejectChatInvitationRequest({
            reqSeq: 0,
            chatMid: this.id
        }))
    }
}