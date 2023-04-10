import { Application } from "./Application";
import { BaseClass } from "./BaseClass";
import { Channel } from "./Channel";
import { Guild } from "./Guild";
import { User } from "./User";
export declare enum WebhookType {
    Incoming = 1,
    ChannelFollower = 2
}
export declare class Webhook extends BaseClass {
    type: WebhookType;
    name?: string;
    avatar?: string;
    token?: string;
    guild_id: string;
    guild: Guild;
    channel_id: string;
    channel: Channel;
    application_id: string;
    application: Application;
    user_id: string;
    user: User;
    source_guild_id: string;
    source_guild: Guild;
}
