/* const NodeRSA = require('node-rsa');
const CONSENT = require("../../CONSENT");
const Thrift_Manager = require("../thrift/Thrift_Manager")

const { IdentityProvider } = CONSENT.thrift.TalkService_types

module.exports = async(username,password)=>{






    let tauth = new Thrift_Manager();

    await tauth.connect({
        host: CONSENT.line_server.HOST,
        headers : {
            ...CONSENT.headers["ios_ipad"],
            "x-line-access": null
        },
        SEND_PATH: CONSENT.line_server.SEND_PATH,
        RECEIVE_PATH: CONSENT.line_server.RECEIVE_PATH,
        service: CONSENT.thrift.TalkService
    })

    let provider = IdentityProvider.LINE
    let rsa_key = await tauth.api.getRSAKeyInfo(provider)
    tauth.destroy()

    
    let transport = new Thrift_Manager();

    await transport.connect({
        host: CONSENT.line_server.HOST,
        headers : {
            ...CONSENT.headers["ios_ipad"],
            "x-line-access": null
        },
        SEND_PATH: "/api/v4p/rs",
        service: CONSENT.thrift.AuthService
    })
    
    let msg = (
        String.fromCharCode(rsa_key.sessionKey.length) + rsa_key.sessionKey +
        String.fromCharCode(username.length) + username +
        String.fromCharCode(password.length) + password
    )
    const key = NodeRSA({n:rsa_key.nvalue,e:rsa_key.evalue},"components")

    let loginreq = {
        'identityProvider': provider,
        'identifier': rsa_key.keynm,
        'password': await key.encrypt(msg,'hex'),
        'keepLoggedIn': true,
        'accessLocation': '8.8.8.8',
        'systemName': 'LRTT',
        'certificate': '',
        'e2eeVersion': 0
    }
    console.log(loginreq)
    let detail = await transport.api.loginZ(0,loginreq)
    
    console.log(detail)
    transport.destroy();
    return detail;
}*/