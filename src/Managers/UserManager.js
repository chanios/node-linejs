'use strict';
const User = require("../structures/User/User");
const Collection = require("../util/Collection");
const BaseManager = require("./BaseManager");
/**
 * Manages API methods for users and stores their cache.
 * @extends {BaseManager}
 */
 class UserManager extends BaseManager {
    /**
     * 
     * @param {import("./Client")} client 
     */
    constructor(client,iterable){
        super(client,iterable,User)
        

        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, User>}
         * @name UserManager#cache
         */
        this.cache
    }

    
    /**
     * 
     * @param {String} id 
     * @returns {Promise<User[]>}
     */
    async fetch(id){
        if(!id){
            let all_contacts = await this.client.api.getAllContactIds(0)
            return await Promise.all(all_contacts.map(id => this.fetch(id)));
        }else{
            if(this.cache.has(id)) return this.cache.get(id)
            let _ = await this.client.api.getContact(id)
            return await this.add(_,true,{id:id})
        }
    }
}
module.exports = UserManager