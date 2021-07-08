'use strict';
const GroupMember = require("../structures/User/Group_Member");
const BaseManager = require("./BaseManager");
/**
 * Manages API methods for users and stores their cache.
 * @extends {BaseManager}
 */
 class GroupMemberManager extends BaseManager {
    /**
     * 
     * @param {import("../structures/Channel/GroupChannel")} group 
     */
    constructor(group,iterable){
        super(group.client,iterable,GroupMember)
        
        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, GroupMember>}
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
module.exports = GroupMemberManager