const Base = require("../Base");

module.exports = class Group_Member extends Base {
    /**
     * 
     * @param {import("../../Client/Client")} client
     * @param {Object} data 
     */
    constructor(client,data){
        super(client,data)

        this.client = client

        if(data) this._patch(data)
    }
    get user(){
        return this.client.users.cache.get(this.id)
    }
    get joined_date(){
        return new Date(this.timestamp)
    }
    get group(){
        return this.client.groups.cache.get(this.groupID)
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
        if('groupID' in data) {
            /**
             * ID of the Group
             * @type {String}
             */
             this.groupID = data.groupID
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
}