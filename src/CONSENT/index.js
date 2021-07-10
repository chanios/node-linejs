
const TalkService_types = require("./gen-nodejs/TalkService_types")


module.exports = {
    line_server: {
        HOST:"ga2.line.naver.jp",
        SEND_PATH: "/S4",
        RECEIVE_PATH: "/P4"
    },
    thrift: {
        TalkService: require("./gen-nodejs/TalkService"),
        TalkService_types: TalkService_types,
        
        AuthService: require("./gen-nodejs/AuthService"),
        AuthService_types: require("./gen-nodejs/AuthService_types"),
        
        SecondaryQrCodeLogin: require("./gen-nodejs/SecondaryQrCodeLoginService"),
        SecondaryQrCodeLogin_types: require("./gen-nodejs/SecondaryQrCodeLoginService_types"),

        SecondaryQrCodeLoginPermitNoticeService: require("./gen-nodejs/SecondaryQrCodeLoginPermitNoticeService"),
        SecondaryQrCodeLoginPermitNoticeService_types: require("./gen-nodejs/SecondaryQrCodeLoginPermitNoticeService_types")
    },
    headers: {
        "android_lite": {
            "user-agent": "LLA/2.12.0 SKR-H0 9",
            "x-line-application": "ANDROIDLITE\t2.12.0\tAndroid OS\t9;SECONDARY"
        },
        "android": {
            "user-agent": "Line/10.6.2",
            "x-line-application": "ANDROID\t10.6.2\tAndroid OS\t10"
        },
        "ios_ipad": {
            "user-Agent": "Line/10.1.1",
            "x-line-application": "IOSIPAD\t10.1.1\tiPhone 8\t11.2.5"
        },
        "ios": {
            "user-agent": "Line/10.1.1",
            "x-line-application": "IOS\t10.1.1\tiPhone 8\t11.2.5"
        },
        "chrome": {
            "user-agent": "MozilX-Line-Application/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36",
            "x-line-application": "CHROMEOS\t2.3.2\tChrome OS\t1"
        },
        "desktopwin": {
            "user-agent": "Line/6.7.3",
            "x-line-application": "DESKTOPWIN\t6.7.3\tWindows\t10"
        },
        "desktopmac": {
            "user-agent": "Line/6.7.3",
            "x-line-application": "DESKTOPMAC\t6.7.3\tMAC\t10.15"
        }
    }
}