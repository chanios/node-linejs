const { login_qr } = require("../")
login_qr().then(session_info => {
    console.log("your access token: " + session_info.accessToken)
})