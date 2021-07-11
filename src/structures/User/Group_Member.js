const CONSENT = require("../../CONSENT");
const Base = require("../Base");

module.exports = class GroupMember extends Base {
    /**
     * 
     * @param {import("../../Client/Client")} client
     * @param {Object} data 
     */
    constructor(client, data, group){
        super(client,data)

        this.group = group

        this.client = client

        if(data) this._patch(data)
    }
    get user(){
        return this.client.users.cache.get(this.id)
    }
    get joined_date(){
        return new Date(this.timestamp)
    }
    async _patch(data){
        super._patch(data)

        if('id' in data) {
            /**
             * ID of the Member
             * @type {String}
             */
            this.id = data.id
        }
        if('timestamp' in data) {
            /**
             * Join Time in unix Of the member
             * @type {?Number}
             */
            this.timestamp = parseInt(data.timestamp);
        }
        if(this.id) {
            this.client.users.add({
                id: this.id
            },true,{
                id: this.id
            })
        }
    }
    async fetch(){
        await this.client.users.fetch(this.id)
        return this
    }
    /**
     * When concatenated with a string, this automatically returns the user's mention instead of the User object.
     * @returns {string}
     */
     toString() {
        return CONSENT.message.mention.toString(this.id);
    }

    /**
     * Kick This User
     */
    kick() {
        return this.group.kick(this)
    }
}