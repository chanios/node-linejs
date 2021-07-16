'use strict';
const Message = require("../structures/Message/Message");
const BaseManager = require("./BaseManager");
/**
 * Manages API methods for users and stores their cache.
 * @extends {BaseManager}
 */
 class MessageMananger extends BaseManager {
    /**
     * 
     * @param {import("./Client")} client 
     */
    constructor(channel,iterable){
        super(channel.client,iterable,Message)
        
        this.channel = channel
        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, Message>}
         * @name MessageMananger#cache
         */
        this.cache
    }
    
    add(data, cache = true, options = {}) {
        return super.add(data, cache, { extras: [this.channel],...options });
    }
    
}
module.exports = MessageMananger