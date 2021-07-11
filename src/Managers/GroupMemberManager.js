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
        this.group = group
        
        /**
         * The cache of this manager
         * @type {import("@discordjs/collection").Collection<String, GroupMember>}
         * @name UserManager#cache
         */
        this.cache
    }

    
    /**
     * 
     * @param {String[] | String} ids 
     * @returns {Promise<GroupMember[]>}
     */
    async fetch(ids){
        if(!ids){
            return await this.fetch(this.cache.keyArray())
        }else{
            if(!Array.isArray(ids)) ids = [ids]
            let users = (await this.client.users.fetch(ids)).map(user=>
                this.add({
                    id: user.id,
                    groupID: this.groupID
                },true,{
                    id: user.id
                })
            )
            return users
        }
    }
}
module.exports = GroupMemberManager