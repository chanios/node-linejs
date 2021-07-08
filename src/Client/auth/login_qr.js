const CONSENT = require("../../CONSENT")
const { generateKeyPair } = require("curve25519-js")
const { nanoid } = require('nanoid')
const Thrift_Client = require("../thrift/Thrift_Client")
const { CreateQrSessionRequest,CreateQrCodeRequest,CreatePinCodeRequest,QrCodeLoginRequest,VerifyCertificateRequest } =CONSENT.thrift.SecondaryQrCodeLogin_types
const { CheckQrCodeVerifiedRequest,CheckPinCodeVerifiedRequest } = CONSENT.thrift.SecondaryQrCodeLoginPermitNoticeService_types
const QRCode = require('qrcode')
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
    const {public, private} = await generateKeyPair(new Buffer.from(nanoid(32)))

    const secret = Buffer.from(public).toString('base64')
    let url = `${qrCode_URL}?secret=${encodeURIComponent(secret)}&e2eeVersion=1`
    console.log(url)
    QRCode.toString(url,{type:'terminal'}, function (err, url) {
        console.log(url)
        console.log('Now Scan With Your Phone')
    })
    
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
    try {
        await line_sev._client.verifyCertificate(new VerifyCertificateRequest(session))
    } catch (error) {
        
    }
    const pincode = (await line_sev._client.createPinCode(new CreatePinCodeRequest(session))).pinCode
    console.clear()
    console.log('Pin Code :', pincode)
    const pincodeverified = await client_verif._client.checkPinCodeVerified(new CheckPinCodeVerifiedRequest(session))
    console.log('Pin Code Verified :', pincodeverified)
    const qrcodelogin = await line_sev._client.qrCodeLogin(new QrCodeLoginRequest({
        authSessionId: session.authSessionId,
        systemName: 'ALFINO-PCV3',
        autoLoginIsRequired: true
    }))
    console.log(qrcodelogin)
    return qrcodelogin.accessToken// session;
}
/*

self.cl = self.createPrimaryOrSecondary(
    'https://gxx.line.naver.jp/acct/lgn/sq/v1',
    headers = {
        'User-Agent': 'Line/5.21.3',
        'X-Line-Application': 'DESKTOPWIN\t5.21.3\tALFINO-PCV3\t10.0;SECONDARY',
        'x-lal': 'en_id',
        'server': choice(["pool-1","pool-2"])
    },
    service = SecondaryQrCodeLoginService.Client
)
session = self.cl.createSession(CreateQrSessionRequest())
session_id = session.authSessionId
qrcode = self.cl.createQrCode(CreateQrCodeRequest(session_id))
qrCode = qrcode.callbackUrl
private_key = axolotl_curve25519.generatePrivateKey(os.urandom(32))
public_key = axolotl_curve25519.generatePublicKey(private_key)
secret = urllib.parse.quote(base64.b64encode(public_key).decode())
data = f"{qrCode}?secret={secret}&e2eeVersion=1"
self.__defaultCallback(data)
self.client_verif = self.createPrimaryOrSecondary(
    'https://gxx.line.naver.jp/acct/lp/lgn/sq/v1',
    headers={
        'User-Agent': 'Line/5.21.3',
        'X-Line-Application': 'DESKTOPWIN\t5.21.3\tALFINO-PCV3\t10.0;SECONDARY',
        'X-Line-Access': session_id,
        'x-lal': 'en_id',
        'server': choice(["pool-1","pool-2"])
    },
    service=SecondaryQrCodeLoginPermitNoticeService.Client
)
qrverified = self.client_verif.checkQrCodeVerified(CheckQrCodeVerifiedRequest(session_id))
if certificate != None:
    self.certificate = certificate
else:
    try:
        self.cl.verifyCertificate(VerifyCertificateRequest(session.authSessionId, self.certificate))
        return True
    except SecondaryQrCodeException:
        return False
        os.system('clear')
        self.pincode = self.cl.createPinCode(CreatePinCodeRequest(session.authSessionId))
        self.__defaultCallback('Pin Code :', self.pincode.pinCode)
        self.pincodeverified = self.client_verif.checkPinCodeVerified(CheckPinCodeVerifiedRequest(session.authSessionId))
        self.__defaultCallback('Pin Code Verified :', self.pincodeverified)
    qrcodelogin = self.cl.qrCodeLogin(QrCodeLoginRequest(session.authSessionId, 'ALFINO-PCV3', True))
    self.__defaultCallback(f'Qr Code Login : {qrcodelogin.accessToken}\nCRT : {qrcodelogin.certificate}')
    self.headers.update({
        'User-Agent': 'Line/5.21.3',
        'X-Line-Application': 'DESKTOPWIN\t5.21.3\tALFINO-PCV3\t10.0;SECONDARY',
        'X-Line-Access': qrcodelogin.accessToken,
        'x-lal': 'en_id'
    })
    self.certificate = qrcodelogin.certificate
    self.authToken = qrcodelogin.accessToken
 */