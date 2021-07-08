'use strict';
const { GetChatsRequest } = require("../CONSENT/gen-nodejs/TalkService_types");
const TextBaseChannel = require("../structures/Channel/TextBaseChannel");
const BaseManager = require("./BaseManager");
/**
 * Manages API methods for users and stores their cache.
 * @extends {BaseManager}
 */
 class ChannelManager extends BaseManager {
    /**
     * 
     * @param {import("./Client")} client 
     */
    constructor(client,iterable){
        super(client,iterable,TextBaseChannel)
        

        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, TextBaseChannel>}
         * @name UserManager#cache
         */
        this.cache
    }

    
    /**
     * 
     * @param {String} id 
     * @returns {Promise<TextBaseChannel[]>}
     */
    async fetch(id){
        if(!id){
            let all_contacts = await this.client.api.getChats(all)
            return await Promise.all(all_contacts.map(id => this.fetch(id)));
        }else{
            let _ = await this.client.api.getChats(
                new GetChatsRequest({
                    chatMids: [id]
                }))
            for (let i = 0; i < _.length; i++) {
                await this.add(_,true,{id:_[i].chatMid})
            }
            return this.cache.get(id)
        }
    }
}
module.exports = ChannelManager