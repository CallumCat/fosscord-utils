import { Channel, ChannelPermissionOverwrite, Guild, Member, Role } from "../entities";
import { BitField } from "./BitField";
import "missing-native-js-functions";
import { BitFieldResolvable } from "./BitField";
export declare type PermissionResolvable = bigint | number | Permissions | PermissionResolvable[] | PermissionString;
declare type PermissionString = keyof typeof Permissions.FLAGS;
export declare class Permissions extends BitField {
    cache: PermissionCache;
    constructor(bits?: BitFieldResolvable);
    static FLAGS: {
        CREATE_INSTANT_INVITE: bigint;
        KICK_MEMBERS: bigint;
        BAN_MEMBERS: bigint;
        ADMINISTRATOR: bigint;
        MANAGE_CHANNELS: bigint;
        MANAGE_GUILD: bigint;
        ADD_REACTIONS: bigint;
        VIEW_AUDIT_LOG: bigint;
        PRIORITY_SPEAKER: bigint;
        STREAM: bigint;
        VIEW_CHANNEL: bigint;
        SEND_MESSAGES: bigint;
        SEND_TTS_MESSAGES: bigint;
        MANAGE_MESSAGES: bigint;
        EMBED_LINKS: bigint;
        ATTACH_FILES: bigint;
        READ_MESSAGE_HISTORY: bigint;
        MENTION_EVERYONE: bigint;
        USE_EXTERNAL_EMOJIS: bigint;
        VIEW_GUILD_INSIGHTS: bigint;
        CONNECT: bigint;
        SPEAK: bigint;
        MUTE_MEMBERS: bigint;
        DEAFEN_MEMBERS: bigint;
        MOVE_MEMBERS: bigint;
        USE_VAD: bigint;
        CHANGE_NICKNAME: bigint;
        MANAGE_NICKNAMES: bigint;
        MANAGE_ROLES: bigint;
        MANAGE_WEBHOOKS: bigint;
        MANAGE_EMOJIS_AND_STICKERS: bigint;
        USE_APPLICATION_COMMANDS: bigint;
        REQUEST_TO_SPEAK: bigint;
        MANAGE_THREADS: bigint;
        USE_PUBLIC_THREADS: bigint;
        USE_PRIVATE_THREADS: bigint;
        USE_EXTERNAL_STICKERS: bigint;
    };
    any(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
    /**
     * Checks whether the bitfield has a permission, or multiple permissions.
     */
    has(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
    /**
     * Checks whether the bitfield has a permission, or multiple permissions, but throws an Error if user fails to match auth criteria.
     */
    hasThrow(permission: PermissionResolvable): boolean;
    overwriteChannel(overwrites: ChannelPermissionOverwrite[]): Permissions;
    static channelPermission(overwrites: ChannelPermissionOverwrite[], init?: bigint): bigint;
    static rolePermission(roles: Role[]): bigint;
    static finalPermission({ user, guild, channel, }: {
        user: {
            id: string;
            roles: string[];
        };
        guild: {
            roles: Role[];
        };
        channel?: {
            overwrites?: ChannelPermissionOverwrite[];
            recipient_ids?: string[] | null;
            owner_id?: string;
        };
    }): Permissions;
}
export declare type PermissionCache = {
    channel?: Channel | undefined;
    member?: Member | undefined;
    guild?: Guild | undefined;
    roles?: Role[] | undefined;
    user_id?: string;
};
export declare function getPermission(user_id?: string, guild_id?: string, channel_id?: string, opts?: {
    guild_select?: (keyof Guild)[];
    guild_relations?: string[];
    channel_select?: (keyof Channel)[];
    channel_relations?: string[];
    member_select?: (keyof Member)[];
    member_relations?: string[];
}): Promise<Permissions>;
export {};
