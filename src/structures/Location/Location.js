const Base = require("../Base");

module.exports = class Location extends Base {
    /**
     * 
     * @param {import("../../Client/Client")} client 
     * @param {*} data 
     */
    constructor(client,data){
        super(client)

        if(data) this._patch(data)
    }
    /** @private */
    async _patch(data){
        if('title' in data) {
            /**
             * @type {?String}
             */
            this.title = null; 
        }
        if('address' in data) {
            /**
             * @type {?String}
             */
            this.address = null; 
        }
        if('latitude' in data) {
            /**
             * @type {?Number}
             */
            this.latitude = null; 
        }
        if('longitude' in data) {
            /**
             * @type {?Number}
             */
            this.longitude = null; 
        }
        if('phone' in data) {
            /**
             * @type {?String}
             */
            this.phone = null; 
        }
        if('categoryId' in data) {
            /**
             * @type {?String}
             */
            this.categoryId = null; 
        }
        if('provider' in data) {
            this.provider = null; 
        }
        if('accuracy' in data) {
            this.accuracy = null; 
        }
    }
}