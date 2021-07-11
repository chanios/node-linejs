const GroupMemberManager = require("../../Managers/GroupMemberManager");
const TextBaseChannel = require("./TextBaseChannel");

module.exports = class GroupChannel extends TextBaseChannel {
    /**
     * 
     * @param {import("../Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client,data)

        this.members = new GroupMemberManager(this)

        if (data) this._patch(data);
    }

    get owner(){
        return this.members.cache.get(this.extra.groupExtra.creator)
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
                for (const id in data.extra.groupExtra.memberMids) {
                    this.members && this.members.add({
                        id: id,
                        timestamp: data.extra.groupExtra.memberMids[id]
                    })
                }
            }
        }
        
    }
    async fetch(){
        let chat = (await this.client.api.getChats({
            chatMids: [this.id],
            withMembers: true,
            withInvitees: true
        })).chats
        if(!chat[0]) return;
        this._patch(chat[0])
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
        return this.client.api.inviteIntoChat({
            reqSeq: 0,
            id: this.id,
            targetUserMids: users.map(user=>this.client.users.resolveID(user))
        })
    }

    kick(users){
        if(!Array.isArray(users)) users = [users];
        return this.client.api.deleteOtherFromChat({
            reqSeq: 0,
            chatMid: this.id,
            targetUserMids: users.map(user=>this.client.users.resolveID(user))
        })
    }
}