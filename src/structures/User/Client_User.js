const User = require("./User");

module.exports = class Client_User extends User {
    constructor(client,data){
        super(client,data)
        
        if(data) this._patch(data)
    }
    
    async _patch(data){
        super._patch(data)
        if('email' in data) {
            /**
             * Email Of the User
             * @type {?String}
             */
            this.email = data.email;
        }
        if('regionCode' in data) {
            /**
             * regionCode Of the User
             * @type {?String}
             */
            this.regionCode = data.regionCode;
        }
        if('phone' in data) {
            /**
             * phone Of the User
             * @type {?String}
             */
            this.phone = data.phone;
        }
    }
    async fetch(){
        let _ = await this.client.api.getProfile(0)
        this._patch(_)
        this.client.users.add(this,true,{id:this.id})
        return this
    }
    async logout(){
        await this.client.api.logoutSession({
            tokenKey: this.client.token
        })
        return this.client.destroy()
    }
}