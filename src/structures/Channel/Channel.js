const Base = require("../Base");
const { ChatType,Extra } = require("../../CONSENT").thrift.TalkService_types

module.exports = class Channel extends Base {
    /**
     * 
     * @param {import("../Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client)

        if (data) this._patch(data);
    }
    
    async _patch(data){
        super._patch(data)
        /**
         * The ID of the channel
         * @type {String}
         */
        this.id = data.chatMid||data.mid||data.id;
        
        
        if('notificationDisabled' in data) {
            /**
             * @type {?Boolean}
             */
            this.notificationDisabled = data.notificationDisabled;
        }
        if('type' in data) {
            /**
             * @type {?ChatType}
             */
            this.type = data.type;
        }
        if('extra' in data) {
            /**
             * @type {?Extra}
             */
            this.extra = data.extra;
        }
    }
}