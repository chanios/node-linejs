const CONSENT = require('../../CONSENT')
const { ContactType } = CONSENT.thrift.TalkService_types;
const Message = require("../Message/Message");
const Base_User = require("./Base_User");
const { string_of_enum } = require("../../util/Util")

module.exports = class User extends Base_User {
    /**
     * 
     * @param {import("../../Client/Client")} client 
     * @param {Object} data 
     */
    constructor(client,data={}){
        super(client,data)

        if(data) this._patch(data)
    }
    async _patch(data){
        super._patch(data)
        if('type' in data) {
            /**
             * Type Of the User
             * @type {String}
             */
            this.type = string_of_enum(ContactType,data.type) || this.type;
        }
        if('relation' in data) {
            /**
             * Relation Of the User
             * @type {Object}
             */
            this.relation = data.relation;
        }
        if('pictureStatus' in data) {
            /**
             * pictureStatus Of the User
             * @type {Object}
             */
            this.pictureStatus = data.pictureStatus;
        }
        if('thumbnailUrl' in data) {
            /**
             * thumbnailUrl Of the User
             * @type {String}
             */
            this.thumbnailUrl = data.thumbnailUrl;
        }
        if('statusMessage' in data) {
            /**
             * statusMessage Of the User
             * @type {String}
             */
            this.statusMessage = data.statusMessage;
        }
        if('displayNameOverridden' in data) {
            /**
             * displayNameOverridden Of the User
             * @type {Object}
             */
            this.displayNameOverridden = data.displayNameOverridden;
        }
        if('capableVoiceCall' in data) {
            /**
             * capableVoiceCall
             * @type {Boolean}
             */
            this.capableVoiceCall = data.capableVoiceCall;
        }
        if('capableVideoCall' in data) {
            /**
             * capableVideoCall
             * @type {Boolean}
             */
            this.capableVideoCall = data.capableVideoCall;
        }
        if('capableMyhome' in data) {
            /**
             * capableMyhome
             * @type {Boolean}
             */
            this.capableMyhome = data.capableMyhome;
        }
        if('capableBuddy' in data) {
            /**
             * capableBuddy
             * @type {Boolean}
             */
            this.capableBuddy = data.capableBuddy;
        }
        if('attributes' in data) {
            /**
             * attributes
             * @type {any}
             */
            this.attributes = data.attributes;
        }
        if('settings' in data) {
            /**
             * settings
             * @type {any}
             */
            this.settings = data.settings;
        }
        if('recommendParams' in data) {
            /**
             * recommendParams
             * @type {String}
             */
            this.recommendParams = data.recommendParams;
        }
        if('friendRequestStatus' in data) {
            /**
             * friendRequestStatus
             * @type {String}
             */
            this.friendRequestStatus = data.FriendRequestStatus;
        }
        if('regionCode' in data) {
            /**
             * regionCode Of the User
             * @type {?String}
             */
            this.regionCode = data.regionCode;
        }
    }
    avatarURL(){
        return CONSENT.line_server.CDN_PATH + this.picturePath
    }
    /**
     * Send Message to this user
     * @param {String} text 
     * @param {?Message} options 
     * @return {Promise<Message>}
     */
    send(text, options={}){
        return this.channel.send(text,options)
    }
    /**
     * block this user
     */
    block(){
        return this.client.api.blockContact(0,this.id)
    }
    /**
     * unblock this user
     */
    unblock(){
        return this.client.api.unblockContact(0,this.id)
    }
}