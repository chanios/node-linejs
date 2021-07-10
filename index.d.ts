import login_qr from "./src/Client/auth/login_qr";
import Thrift_Manager from "./src/Client/thrift/Thrift_Manager";
import ChannelManager from "./src/Managers/ChannelManager";
import GroupChannelManager from "./src/Managers/GroupChannelManager";
import Chat_InviteManager from "./src/Managers/InviteManager";
import UserManager from "./src/Managers/UserManager";
import GroupChannel from "./src/structures/Channel/GroupChannel";
import Chat_Invite from "./src/structures/Chat_Invite";
import Message from "./src/structures/Message/Message";
import Client_User from "./src/structures/User/Client_User";
import User from "./src/structures/User/User";

export class Client extends EventEmitter {
    constructor (options: Object): this
    token: String

    user: Client_User
    
    users: UserManager
    groups: GroupChannelManager
    channels: ChannelManager
    invites: Chat_InviteManager

    transport: Thrift_Manager
    api: Record<string,(...any) => Promise<any>> = {};
/**
 * @example
 * // Login With Qrcode
 * client.login();
 * 
 * // Login With AccessToken
 * client.login('token');
 */
    login(token: ?String): this
/**
 * Destroy This Client
 */
    destroy(): this
/**
 * When Client Has Ready
 */
    on(event: "ready", listener: () => any): this;

    once(event: "ready", listener: () => any): this;
/**
 * When Send/Receive Message
 */
    on(event: "message", listener: (message: Message) => any): this;

    once(event: "message", listener: (message: Message) => any): this;
/**
 * When Someone Invite Client
 */
    on(event: "chat_invite", listener: (invite: Chat_Invite) => any): this;

    once(event: "chat_invite", listener: (invite: Chat_Invite) => any): this;
/**
 * When Someone Cancel Invite Client
 */
     on(event: "chat_invite_cancel", listener: (invite: Chat_Invite) => any): this;

     once(event: "chat_invite_cancel", listener: (invite: Chat_Invite) => any): this;
    
/**
 * When Client Join Chat
 */
    on(event: "chat_join", listener: (channel: GroupChannel) => any): this;

    once(event: "chat_join", listener: (channel: GroupChannel) => any): this;
/**
 * When Client Leave Chat
 */
    on(event: "chat_leave", listener: (channel: GroupChannel) => any): this;

    once(event: "chat_leave", listener: (channel: GroupChannel) => any): this;
/**
 * When Message Unsend
 */
    on(event: "message_unsend", listener: (message: Message) => any): this;

    once(event: "message_unsend", listener: (message: Message) => any): this;
/**
 * When Message Read By Some User
 */
    on(event: "message_read", listener: (message: Message,user: User) => any): this;

    once(event: "message_read", listener: (message: Message,user: User) => any): this;
/**
 * Raw Message From Line FetchOps
 */
    on(event: "raw", listener: (op: String,data: any) => any): this;

    once(event: "raw", listener: (op: String,data: any) => any): this;
}

export { login_qr }