module.exports = {
    login_qr: require("./src/Client/auth/login_qr"),

    Client: require("./src/Client/Client"),
    User: require("./src/structures/User/User"),
    Group_Member: require("./src/structures/User/Group_Member"),
    Channel: require("./src/structures/Channel/Channel"),
    Message: require("./src/structures/Message/Message")
}