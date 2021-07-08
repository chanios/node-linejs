const thrift = require('thrift');

class Thrift_Client {
    /**
     * 
     * @param {import("./Thrift_Manager")} Manager 
     */
    constructor(Manager){
        if(Manager) this.manager = Manager;
        this._connection = null;
        this._client = null;
    }
    connect(options = {}){
        if(!options.headers) options.headers = {}

        if(!options.https) options.https = true
        if(!options.transport) options.transport = thrift.TBufferedTransport
        if(!options.protocol) options.protocol = thrift.TCompactProtocol

        if(this.manager) options.headers["x-line-access"] = this.manager.token
        if(!this._connection) this._connection = thrift.createHttpConnection(options.host, 443, options);
        this._client = thrift.createHttpClient(options.service,this._connection)
        return this;
    }
}

module.exports = Thrift_Client