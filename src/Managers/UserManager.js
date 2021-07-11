'use strict';
const Message = require("../structures/Message/Message");
const Client_User = require("../structures/User/Client_User");
const Group_Member = require("../structures/User/Group_Member");
const User = require("../structures/User/User");
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

    
    resolveID(user){
        if(user instanceof Group_Member) return user.id;
        if(user instanceof Client_User) return user.id;
        if(user instanceof Message) return user.user.id;
        return super.resolveID(user)
    }
    /**
     * 
     * @param {String[] | String} ids 
     * @returns {Promise<User[]|User>}
     */
    async fetch(ids){
        if(!ids){
            let all_contacts = await this.client.api.getAllContactIds(0)
            return await this.fetch(all_contacts)
        }else{
            if(!Array.isArray(ids)) ids = [ids]
            let _ = (await this.client.api.getContacts(ids)).map(contact=>this.add(contact,true,{id:contact.mid}))
            if(_.length <= 1) return _[0];
            else return _
        }
    }
}
module.exports = UserManager