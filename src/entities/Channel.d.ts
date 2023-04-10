import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
import { User } from "./User";
import { Recipient } from "./Recipient";
import { Message } from "./Message";
import { ReadState } from "./ReadState";
import { Invite } from "./Invite";
import { VoiceState } from "./VoiceState";
import { Webhook } from "./Webhook";
import { DmChannelDTO } from "../dtos";
export declare enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_STORE = 6,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13
}
export declare class Channel extends BaseClass {
    created_at: Date;
    name?: string;
    icon?: string | null;
    type: ChannelType;
    recipients?: Recipient[];
    last_message_id: string;
    guild_id?: string;
    guild: Guild;
    parent_id: string;
    parent?: Channel;
    owner_id: string;
    owner: User;
    last_pin_timestamp?: number;
    default_auto_archive_duration?: number;
    position?: number;
    permission_overwrites?: ChannelPermissionOverwrite[];
    video_quality_mode?: number;
    bitrate?: number;
    user_limit?: number;
    nsfw?: boolean;
    rate_limit_per_user?: number;
    topic?: string;
    invites?: Invite[];
    messages?: Message[];
    voice_states?: VoiceState[];
    read_states?: ReadState[];
    webhooks?: Webhook[];
    static createChannel(channel: Partial<Channel>, user_id?: string, opts?: {
        keepId?: boolean;
        skipExistsCheck?: boolean;
        skipPermissionCheck?: boolean;
        skipEventEmit?: boolean;
    }): Promise<Partial<Channel>>;
    static createDMChannel(recipients: string[], creator_user_id: string, name?: string): Promise<DmChannelDTO>;
    static removeRecipientFromChannel(channel: Channel, user_id: string): Promise<void>;
    static deleteChannel(channel: Channel): Promise<void>;
    isDm(): boolean;
}
export interface ChannelPermissionOverwrite {
    allow: string;
    deny: string;
    id: string;
    type: ChannelPermissionOverwriteType;
}
export declare enum ChannelPermissionOverwriteType {
    role = 0,
    member = 1
}
