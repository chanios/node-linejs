const events = require("events")

const { OpType } = require("../CONSENT/gen-nodejs/TalkService_types");
const login_user_pass = require("./auth/login_user_pass");
const CONSENT = require("../CONSENT");
const login_qr = require("./auth/login_qr");

const Client_User = require("../structures/User/Client_User");

const ChannelManager = require("../Managers/ChannelManager");
const UserManager = require("../Managers/UserManager");
const GroupChannelManager = require("../Managers/GroupChannelManager");

const Thrift_Manager = require("./thrift/Thrift_Manager");
const Chat_InviteManager = require("../Managers/InviteManager");
const { string_of_enum } = require("../util/Util");

class Client extends events {
    constructor(options={}){
        super()
        if(!options.keepalive) options.keepalive = 1000*100
        if(!options.debug) options.debug = false
        this.options = options

        this.debug = options.debug
        this.token = null;
        this.transport = new Thrift_Manager(this);
        this.users = new UserManager(this)
        this.channels = new ChannelManager(this)
        this.invites = new Chat_InviteManager(this)
        this.groups = new GroupChannelManager(this)
        this.intervals = [];

        this._destroy = false
        this.localRev = -1
        this.globalRev = 0
        this.individualRev = 0
    }
    get api(){
        return this.transport.api
    }
    async login_qr(){
        return (await login_qr()).accessToken
    }
    async login(username,password){
        if (!username && !password) {
            try {
                return this.login(await this.login_qr())
            } catch (error) {
                throw new Error("LOGIN_QR_FAIL")
            }
        } else if(username&&!password){//maybe token?
            this.token = username

            await this.init_session()

            return this
        } else if(username&&password){
            let token = await this.login_user_pass(username,password)
            if(!token) throw new Error("EMAIL_OR_PASSWORD_INVALID")
            this.token = token
            await this.init_session()

            return this
        }
        return this;
    }
    async login_user_pass(username,password){
        return login_user_pass(username,password)
    }
    async init_session(){
        await this.transport.connect({
            host: CONSENT.line_server.HOST,
            headers: CONSENT.headers["desktopwin"],
            SEND_PATH: CONSENT.line_server.SEND_PATH,
            RECEIVE_PATH: CONSENT.line_server.RECEIVE_PATH,
            service: CONSENT.thrift.TalkService
        });

        let tasks =  await Promise.all([new Client_User(this).fetch(),this.users.fetch(),this.groups.fetch(),this.invites.fetch()])
        this.user = tasks[0]
        this.intervals.push(setInterval(() => {
            this.user.send('node-linejs(chanios) keepalive')
        }, this.options.keepalive))
        this.polling()
        this.emit("ready")
    }
    async polling(){
        while (true) {
            if(this._destroy) break;
            await this.poll()
        }
    }
    async poll(){
        let ops = await this.transport._receive._client.fetchOps(this.localRev,10,this.globalRev,this.individualRev)
        for (let i = 0; i < ops.length; i++) {
            let op = ops[i]
            if(op.revision == -1 && op.param2){
                this.globalRev = parseInt(op.param2.split("\x1e")[0])
            }
            if(op.revision == -1 && op.param1){
                this.individualRev = parseInt(op.param1.split("\x1e")[0])
            }
            if(this.localRev>=op.revision) return
            this.localRev = Math.max(op.revision, this.localRev)
            let optype = string_of_enum(OpType,op.type)
            try {
                this.emit('raw',optype,op)
                require("./actions/"+optype)(this, op);
            } catch (error) {
                if(this.debug) console.log(`OP ${optype} Not Found`,op)
            }
        }
    }
    async destroy(){
        //TODO: Close this.transpot
        this._destroy = true
        this.transpot.destroy()
        this.intervals.forEach(_=>clearInterval(_))
    }
}
module.exports = Client