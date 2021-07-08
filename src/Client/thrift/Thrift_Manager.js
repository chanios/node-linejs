const CONSENT = require("../../CONSENT")
const Thrift_Client = require("./Thrift_Client")

module.exports = class Manager {
    
    /**
     * 
     * @param {import("./Client")} client
     */
    constructor(client){
        this.client = client
        this._send = new Thrift_Client(this.client)
        this._receive = new Thrift_Client(this.client)

        this.key = null;
    }
    get token(){
        return this.client.token;
    }
    get api(){
        return this._send._client;
    }
    connect(options={
        host: "",
        headers: {},
        SEND_PATH: "",
        RECEIVE_PATH: "",
        service: null
    }){
        if(options.SEND_PATH) this._send.connect({
            ...options,path:options.SEND_PATH
        })
        if(options.RECEIVE_PATH) this._receive.connect({
            ...options,path:options.RECEIVE_PATH
        })
        return this;
    }
    destroy(){
        //todo: close connection
        return null
    }
}