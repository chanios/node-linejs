const CONSENT = require('../../CONSENT')
const GroupMemberManager = require("../../Managers/GroupMemberManager");
const TextBaseChannel = require('./TextBaseChannel');

module.exports = class GroupChannel extends TextBaseChannel {
    /**
     * 
     * @param {import("../Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client,data)


        this.members = new GroupMemberManager(this)
        this.invites = new GroupMemberManager(this)

        if (data) this._patch(data);
    }

    get me(){
        return this.members.cache.get(this.client.user.id)
    }

    get owner(){
        let member = this.members.cache.get(this.extra.groupExtra.creator)
        if(!member) return this.client.users.add({id:this.extra.groupExtra.creator},false,{id: this.extra.groupExtra.creator})
        else return member
    }

    get joined(){
        return this.members.cache.has(this.client.user.id)
    }

    _patch(data){
        super._patch(data)
        if('picturePath' in data) {
            /**
             * @type {String}
             */
            this.picturePath = data.picturePath;
        }

        if ('extra' in data) {
            /**
             * @type {Object}
             */
            this.extra = data.extra;
            if('groupExtra' in data.extra) {
                if('memberMids' in data.extra.groupExtra) {
                    for (const id in data.extra.groupExtra.memberMids) {
                        this.members && this.members.add({
                            id: id,
                            timestamp: data.extra.groupExtra.memberMids[id]
                        })
                    }
                }
                if('inviteeMids' in data.extra.groupExtra) {
                    for (const id in data.extra.groupExtra.inviteeMids) {
                        this.invites && this.invites.add({
                            id: id,
                            timestamp: data.extra.groupExtra.inviteeMids[id]
                        })
                    }
                }
            }
        }
        
    }
    iconURL(){
        return CONSENT.line_server.CDN_PATH + this.picturePath
    }
    async fetch(){
        return this.client.groups.fetch(this.id)
    }
    /*
    * leave this group
    */
    leave(){
        return this.client.api.deleteSelfFromChat({
            reqSeq: 0,
            chatMid: this.id
        })
    }
    /**
     * invite user
     */
    invite(users){
        if(!Array.isArray(users)) users = [users]
        users = users.map(user=>this.client.users.resolveID(user)).filter(id => !this.members.cache.has(id) && !this.invites.cache.has(id))
        if(users.length >= 1) {
            return this.client.api.inviteIntoChat({
                reqSeq: 0,
                id: this.id,
                targetUserMids: users
            })
        } else return false
    }

    kick(users = []){
        if(!Array.isArray(users)) users = [users];
        users = users.map(user=>this.client.users.resolveID(user)).filter(id => id != this.client.user.id && id != this.owner.id)
        if(users.length >= 1) {
            return this.client.api.deleteOtherFromChat({
                reqSeq: 0,
                chatMid: this.id,
                targetUserMids: users
            })
        } else return false
    }
    
    /**
     * Reject This Group Invite If not Joined
     * @return {Promise<Object>}
     */
     async accept(){
        if(!this.invites.cache.has(this.client.user.id)) return false;
        return this.client.api.acceptChatInvitation({
            reqSeq: 0,
            chatMid: this.id
        })
    }
    
    /**
     * Reject This Group Invite If not Joined
     * @return {Promise<Object>}
     */
    async reject(){
        if(!this.invites.cache.has(this.client.user.id)) return false;
        return await this.client.api.rejectChatInvitation({
            reqSeq: 0,
            chatMid: this.id
        })
    }
}