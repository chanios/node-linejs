const Base = require("../Base");
const { ChatType,Extra } = require("../../CONSENT").thrift.TalkService_types
const { string_of_enum } = require("../../util/Util")
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
             * @type {?String}
             */
            this.type = string_of_enum(ChatType,data.type) || this.type;
        }
        
        if('createdTime' in data) {
            /**
             * @type {?Date}
             */
            this.createdTime = new Date(parseInt(data.createdTime));
        }
        
        if('favoriteTimestamp' in data) {
            /**
             * @type {?Date}
             */
            this.favoriteTimestamp = new Date(parseInt(data.favoriteTimestamp));
        }
        
        if('name' in data) {
            /**
             * @type {?String}
             */
            this.name = data.name;
        }

        if('chatName' in data) {
            /**
             * @type {?String}
             */
            this.name = data.chatName;
        }

        if('picturePath' in data) {
            /**
             * @type {?String}
             */
            this.picturePath = data.picturePath;
        }
        if('extra' in data) {
            /**
             * @type {?Extra}
             */
            this.extra = data.extra;
        }
    }
}