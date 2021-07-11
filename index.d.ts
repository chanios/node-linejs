import { ChatType, ContactType, MIDType, OpType, ContentType, ServiceCode, AppExtensionType } from "./enum";
import login_qr from "./src/Client/auth/login_qr";
import Thrift_Manager from "./src/Client/thrift/Thrift_Manager";
import Chat_InviteManager from "./src/Managers/InviteManager";
import MessageMananger from "./src/Managers/MessageManager";
import Base from "./src/structures/Base";
import Chat_Invite from "./src/structures/Chat_Invite";
import BaseCollection from '@discordjs/collection';
export type ClientOptions = {
    keepalive: Number,
    debug: Boolean
};
export class Client extends EventEmitter {
    constructor (options: ClientOptions): this
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
    on(event: "raw", listener: (op: keyof typeof OpType,data: any) => any): this;

    once(event: "raw", listener: (op: keyof typeof OpType,data: any) => any): this;
}

export class Base_User extends Base {
    public channel: TextBaseChannel;

    public id: String;
    public createdTime: Date;
    public displayName: ?String;
    public phoneticName: ?String;
    public pictureStatus: ?String;
    public picturePath: ?String;
    public musicProfile: ?String;
    public videoProfile: ?String;
    public avatarProfile: ?any;
    public statusMessageContentMetadata: ?Object.<string,string>;
}
export class User extends Base_User {
    public type: keyof typeof ContactType;
    public relation: Object;
    public pictureStatus: Object;
    public thumbnailUrl: ?String;
    public statusMessage: ?String;
    public displayNameOverridden: Object;
    public capableVoiceCall: Boolean;
    public capableVideoCall: Boolean;
    public capableMyhome: Boolean;
    public capableBuddy: Boolean;
    public attributes: any;
    public settings: any;
    public recommendParams: String;
    public friendRequestStatus: String;
    public phone: ?String;
    
    /**
     * Send Message to this user
     * @param {String} text 
     * @param {?Object} options 
     */
     public send(text, options={}): Promise<Message>
     public unblock(): Promise<void>;
     public block(): Promise<void>;
}
export type UserResolvable = User | Base_User | Client_User | String;
export type TextChannel = GroupChannel | TextBaseChannel
export class Client_User extends User {
    public phone: ?String;
    public email: ?String;
    public regionCode: ?String;

    /**
     * Destroy Client token
     * @param {String} text 
     * @param {?Object} options 
     */
    public logout(): Promise<void>;
}
export class Group_Member extends Base {
    public readonly user: User;
    public readonly joined_date: Date;
    public readonly group: GroupChannel;

    public id: String;
    public groupID: ?String;
    public timestamp: ?Number;
}

export class Channel extends Base {
    public id: String;
    public notificationDisabled: Boolean;
    public type: keyof typeof ChatType;
    public extra: Extra;
}

export class TextBaseChannel extends Channel {
    public messages: MessageMananger;
    public createdTime: Date;
    public favoriteTimestamp: Date;
    public name: String;
    public picturePath: ?String;
    public extra: ?Any;
    
    /**
     * Send Message to this Channel
     * @param {String} text 
     * @param {?Object} options 
     */
     public send(text, options={}): Promise<Message>
}
export class GroupChannel extends TextBaseChannel {
    public readonly user: User;
    public readonly joined_date: Date;
    public readonly group: GroupChannel;

    public picturePath: String;
    public extra: {
        groupExtra: {
            memberMids: String[]
        }
    };
    public fetch(): Promise<void>;
    public leave(): Promise<void>;
    public invite(users: UserResolvable[]): Promise<void>;
}
export class Message extends Base {
    public deleted: Boolean;
    public readonly author: User;
    public readonly channel: TextChannel;
    public readonly content: String;

    public id: String;
    public text: String;
    public toType: keyof typeof MIDType;
    public deliveredTime: Date;
    public location: Location;
    public hasContent: Boolean;
    public contentType: keyof typeof ContentType;
    public contentMetadata: ?Object.<string,string>;
    public contentPreview: String;
    public sessionId: Number;
    public chunks: ?String[];
    public relatedMessageId: String;
    public messageRelationType: ?String[];
    public readCount: Number;
    public relatedMessageServiceCode: keyof typeof ServiceCode;
    public appExtensionType: keyof typeof AppExtensionType;
    public _from: String;
    public deleted: Boolean;
    
    /**
     * Unsend Message from channel
     */
    public unsend(): Promise<this>;
}

export type ChannelResolvable = Channel | String;

export abstract class BaseManager {
    public constructor(client: Client);
    public readonly client: Client;
}

export type GroupResolvable = GroupChannel | Group_Member | String;
  
export abstract class DataManager<K, Holds, R> extends BaseManager {
    public constructor(client: Client, holds: Constructable<Holds>);
    public readonly holds: Constructable<Holds>;
    public readonly cache: BaseCollection<K, Holds>;
    public resolve(resolvable: Holds): Holds;
    public resolve(resolvable: R): Holds | null;
    public resolveId(resolvable: Holds): K;
    public resolveId(resolvable: R): K | null;
    public valueOf(): BaseCollection<K, Holds>;
}

export abstract class CachedManager<K, Holds, R> extends DataManager<K, Holds, R> {
    public constructor(client: Client, holds: Constructable<Holds>);
    private _add(data: unknown, cache?: boolean, { id, extras }?: { id: K; extras: unknown[] }): Holds;
}

export class ChannelManager extends CachedManager<String, Channel, ChannelResolvable> {
    public constructor(client: Client, iterable: Iterable<unknown>);
    public fetch(id: String, options?: {}): Promise<Channel | TextChannel | null>;
}

export class UserManager extends CachedManager<String, User, UserResolvable> {
    public constructor(client: Client, iterable: Iterable<unknown>);
    public fetch(id: String, options?: {}): Promise<User | null>;
}
export class GroupChannelManager extends CachedManager<String, GroupChannel, GroupResolvable> {
    public constructor(client: Client, iterable: Iterable<unknown>);
    public create(name: String, options?: {
        picturePath: ?String,
        targetUserMids: [String],
        type: keyof typeof ChatType
       }): Promise<GroupChannel | null>;
    public fetch(id: String, options?: {}): Promise<GroupChannel | null>;
}
export class MessageMananger extends CachedManager<String, Message, MessageResolvable> {
    public constructor(client: Client, iterable: Iterable<unknown>);
}
export { login_qr }