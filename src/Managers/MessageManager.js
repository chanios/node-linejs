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
        

        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, Message>}
         * @name MessageMananger#cache
         */
        this.cache
    }
}
module.exports = MessageMananger