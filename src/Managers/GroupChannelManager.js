const CONSENT = require("../CONSENT");
const GroupChannel = require("../structures/Channel/GroupChannel");
const BaseManager = require("./BaseManager");
const { ChatType } = CONSENT.thrift.TalkService_types
/**
 * Manages API methods for groups and stores their cache.
 * @extends {BaseManager}
 */
 class GroupChannelManager extends BaseManager {
    /**
     * 
     * @param {import("../Client/Client")} client 
     */
    constructor(client,iterable){
        super(client,iterable,GroupChannel)
        

        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, GroupChannel>}
         * @name GroupChannelManager#cache
         */
        this.cache
    }

    /**
     * 
     * @param {String} name 
     * @param {{
     *  picturePath: ?String,
     *  targetUserMids: [String],
     *  type: ('group'|'room'|'peer')
     * }} options 
     */
    async create(name,options={}){
        options.type = ChatType[options.type.toUpperCase()]
        let raw = (await this.client.api.createChat({
            reqSeq: 0,
            name: name,
            ...options
        })).chat
        console.log(raw)
        return this.add(raw,true,{
            id: raw.chatMid
        })
    }
    /**
     * 
     * @param {String|Array} chatMids 
     * @returns {Promise<GroupChannel[]>}
     */
    async fetch(chatMids){
        if(typeof chatMids == "string") chatMids = [chatMids];
        if(!chatMids) {
            chatMids = (await this.client.api.getAllChatMids({
                withMemberChats: true
            },0)).memberChatMids
        }
        if (!chatMids.length) return;
        let chats = (await this.client.api.getChats({
            chatMids,
            withMembers: true
        })).chats
        console.log(chats)
        
        chats = chats.map(c=>this.add(c,true,{
            id: c.chatMid
        }))
        if(chats.length == 1) return chats[0]
        else return chats
    }
}
module.exports = GroupChannelManager