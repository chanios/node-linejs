const { MIDType,ContentType,MessageRelationType,ServiceCode,AppExtensionType } = require("../../CONSENT/gen-nodejs/TalkService_types");
const Base = require("../Base");
const Location = require("../Location/Location");

module.exports = class Message extends Base {
    /**
     * 
     * @param {import("../Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client)
        /**
         * Whether this message has been deleted
         * @type {boolean}
         */
        this.deleted = false;

        if (data) this._patch(data);
    }
    get author(){
        return this.client.users.cache.get(this._from)
    }
    
    get channel(){
        return this.client.channels.cache.get(this._from)
    }
    
    get content(){
        return this.text
    }
    /** @private */
    async _patch(data){
        super._patch(data)
        /**
         * The ID of the message
         * @type {String}
         */
        this.id = data.id||data.id;
        
        
        if('text' in data && data.text) {
            /**
             * @type {?String}
             */
            this.text = data.text;
        }
        if('toType' in data){
            /**
             * @type {?MIDType}
             */
            this.toType = data.toType;
        }
        
        if('createdTime' in data){
            /**
             * @type {?Date}
             */
            this.createdTime = new Date(parseInt(data.createdTime));
        }
        
        if('deliveredTime' in data){
            /**
             * @type {?Date}
             */
             this.deliveredTime = new Date(parseInt(data.deliveredTime));
        }
        
        if('location' in data){
            /**
             * @type {?Location}
             */
            this.location = new Location(this.client,data.location);
        }
        
        if('hasContent' in data){
            /**
             * @type {?Boolean}
             */
            this.hasContent = data.hasContent;
        }

        if('contentType' in data){
            /**
             * @type {?ContentType}
             */
            this.contentType = data.contentType;
        }
        if('contentMetadata' in data){
            /**
             * @type {?Object.<string,string>}
             */
            this.contentMetadata = data.contentMetadata;
        }
        if('contentPreview' in data){
            /**
             * @type {?String}
             */
            this.contentPreview = data.contentPreview;
        }
        if('sessionId' in data){
            /**
             * @type {?Number}
             */
            this.sessionId = data.sessionId;
        }
        if('chunks' in data){
            /**
             * @type {?String[]}
             */
            this.chunks = data.chunks;
        }
        if('relatedMessageId' in data){
            /**
             * @type {?String}
             */
            this.relatedMessageId = data.relatedMessageId;
        }
        if('messageRelationType' in data){
            /**
             * @type {?MessageRelationType}
             */
            this.messageRelationType = data.messageRelationType;
        }
        if('readCount' in data){
            /**
             * @type {?Number}
             */
            this.readCount = data.readCount;
        }
        if('relatedMessageServiceCode' in data){
            /**
             * @type {?ServiceCode}
             */
            this.relatedMessageServiceCode = data.relatedMessageServiceCode;
        }
        if('appExtensionType' in data){
            /**
             * @type {?AppExtensionType}
             */
            this.appExtensionType = data.appExtensionType;
        }
        if('_from' in data){
            /**
             * @type {?String}
             */
            this._from = data._from;
        }
        if('to' in data){
            /**
             * @type {?String}
             */
            this.to = data.to;
        }
        if('deleted' in data){
            /**
             * @type {?Boolean}
             */
            this.deleted = data.deleted;
        }
    }
    async unsend(){
        let r = await this.client.api.unsendMessage(0,this.id)
        this.deleted = true
        return r
    }
}