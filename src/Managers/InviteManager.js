const Chat_Invite = require("../structures/Chat_Invite");
const BaseManager = require("./BaseManager");
/**
 * Manages API methods for groups and stores their cache.
 * @extends {BaseManager}
 */
 class Chat_InviteManager extends BaseManager {
    /**
     * 
     * @param {import("../Client/Client")} client 
     */
    constructor(client,iterable){
        super(client,iterable,Chat_Invite)
        

        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, Chat_Invite>}
         * @name Chat_InviteManager#cache
         */
        this.cache
    }
    
    /**
     * 
     * @param {String|Array} chatMids 
     * @returns {Promise<Chat_Invite[]>}
     */
    async fetch(chatMids){
        if(typeof chatMids == "string") chatMids = [chatMids];
        if(!chatMids) {
            chatMids = (await this.client.api.getAllChatMids({
                withInvitees: true
            },0)).invitedChatMids
        }
        if (!chatMids.length) return;
        return chatMids.map(c=>this.add({
            id: c
        },true,{
            id: c.chatMid
        }))

    }
}
module.exports = Chat_InviteManager