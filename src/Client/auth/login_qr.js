const CONSENT = require("../../CONSENT")
const { generateKeyPair } = require("curve25519-js")
const { nanoid } = require('nanoid')
const Thrift_Client = require("../thrift/Thrift_Client")
const { CreateQrSessionRequest,CreateQrCodeRequest,CreatePinCodeRequest,QrCodeLoginRequest,VerifyCertificateRequest } =CONSENT.thrift.SecondaryQrCodeLogin_types
const { CheckQrCodeVerifiedRequest,CheckPinCodeVerifiedRequest } = CONSENT.thrift.SecondaryQrCodeLoginPermitNoticeService_types
const QRCode = require('qrcode')
const gen_qr = require('util').promisify(QRCode.toString)
/**
 * 
 * @return {Promise<{
 *   certificate: String,
 *   accessToken: String,
 *   lastBindTimestamp: Buffer,
 *   metaData: {
 *       encryptedKeyChain: String,
 *       hashKeyChain: String,
 *       errorCode: String,
 *       keyId: String,
 *       publicKey: String,
 *       e2eeVersion: String
 *   }
 *   }>}
 **/
module.exports = async()=>{
    let line_sev = await new Thrift_Client().connect({
        host: 'gxx.line.naver.jp',
        path: '/acct/lgn/sq/v1',
        headers: {
            'User-Agent': 'Line/6.7.3',
            'X-Line-Application': 'DESKTOPWIN\t6.7.3\tALFINO-PCV3\t10.0;SECONDARY',
            'x-lal': 'en_id',
            'server': 'pool-3'
        },
        service: CONSENT.thrift.SecondaryQrCodeLogin
    })
    const session = await line_sev._client.createSession(CreateQrSessionRequest())
    const qrCode_URL = (await line_sev._client.createQrCode(new CreateQrCodeRequest(session))).callbackUrl
    const { public } = await generateKeyPair(new Buffer.from(nanoid(32)))

    const secret = Buffer.from(public).toString('base64')
    let url = `${qrCode_URL}?secret=${encodeURIComponent(secret)}&e2eeVersion=1`

    console.log(await gen_qr(url,{type:'terminal'}))
    console.log('Now Scan With Your Phone')

    let client_verif = await new Thrift_Client().connect({
        host: 'gxx.line.naver.jp',
        path: '/acct/lp/lgn/sq/v1',
        headers: {
            'User-Agent': 'Line/6.7.3',
            'X-Line-Application': 'DESKTOPWIN\t6.7.3\tALFINO-PCV3\t10.0;SECONDARY',
            'X-Line-Access': session.authSessionId,
            'x-lal': 'en_id',
            'server': 'pool-3'
        },
        service: CONSENT.thrift.SecondaryQrCodeLoginPermitNoticeService
    })
 
    await client_verif._client.checkQrCodeVerified(new CheckQrCodeVerifiedRequest(session))
    await line_sev._client.verifyCertificate(new VerifyCertificateRequest(session)).catch(()=>{})
    const pincode = (await line_sev._client.createPinCode(new CreatePinCodeRequest(session))).pinCode
    console.clear()
    console.log('Pin Code :', pincode)
    await client_verif._client.checkPinCodeVerified(new CheckPinCodeVerifiedRequest(session))
    const qrcodelogin = await line_sev._client.qrCodeLogin(new QrCodeLoginRequest({
        authSessionId: session.authSessionId,
        systemName: 'ALFINO-PCV3',
        autoLoginIsRequired: true
    }))
    return qrcodelogin
}