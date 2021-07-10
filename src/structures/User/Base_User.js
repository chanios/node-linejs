const Base = require("../Base");
const {AvatarProfile} = require("../../CONSENT").thrift.TalkService_types
module.exports = class Base_User extends Base {
    constructor(client,data){
        super(client)

        if(data) this._patch(data)
    }
    /**
     * 
     * @param {Object} data 
     * @private
     */
    _patch(data){
        super._patch(data)
        /**
         * The ID of the User
         * @type {String}
         */
        this.id = data.mid||data.id;
        
        if('createdTime' in data) {
            /**
             * CreatedTime Of the User
             * @type {?Date}
             */
            this.createdTime = new Date(parseInt(data.createdTime));
        }
        if('displayName' in data) {
            /**
             * Name Of the User
             * @type {?String}
             */
            this.displayName = data.displayName;
        }
        if('phoneticName' in data) {
            /**
             * Name Of the User
             * @type {?String}
             */
            this.phoneticName = data.phoneticName;
        }
        if('pictureStatus' in data) {
            /**
             * @type {?String}
             */
            this.pictureStatus = data.pictureStatus;
        }
        if('picturePath' in data) {
            /**
             * @type {?String}
             */
            this.picturePath = data.picturePath;
        }
        if('musicProfile' in data) {
            /**
             * @type {?String}
             */
            this.musicProfile = data.musicProfile;
        }
        if('videoProfile' in data) {
            /**
             * @type {?String}
             */
            this.videoProfile = data.videoProfile;
        }
        if('avatarProfile' in data) {
            /**
             * @type {?AvatarProfile}
             */
            this.avatarProfile = data.avatarProfile;
        }
        if('statusMessageContentMetadata' in data) {
            /**
             * @type {?Object.<string,string>}
             */
            this.statusMessageContentMetadata = data.statusMessageContentMetadata;
        }
    }
}