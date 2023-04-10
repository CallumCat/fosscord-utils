import { PublicUser, User } from "./User";
import { Guild } from "./Guild";
import { Role } from "./Role";
import { BaseClassWithoutId } from "./BaseClass";
export declare const MemberPrivateProjection: (keyof Member)[];
export declare class Member extends BaseClassWithoutId {
    index: string;
    id: string;
    user: User;
    guild_id: string;
    guild: Guild;
    nick?: string;
    roles: Role[];
    joined_at: Date;
    premium_since?: number;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    settings: UserGuildSettings;
    last_message_id?: string;
    static IsInGuildOrFail(user_id: string, guild_id: string): Promise<boolean>;
    static removeFromGuild(user_id: string, guild_id: string): Promise<[any, any, void, void]>;
    static addRole(user_id: string, guild_id: string, role_id: string): Promise<void>;
    static removeRole(user_id: string, guild_id: string, role_id: string): Promise<void>;
    static changeNickname(user_id: string, guild_id: string, nickname: string): Promise<void>;
    static addToGuild(user_id: string, guild_id: string): Promise<void>;
}
export interface UserGuildSettings {
    channel_overrides: {
        channel_id: string;
        message_notifications: number;
        mute_config: MuteConfig;
        muted: boolean;
    }[];
    message_notifications: number;
    mobile_push: boolean;
    mute_config: MuteConfig;
    muted: boolean;
    suppress_everyone: boolean;
    suppress_roles: boolean;
    version: number;
}
export interface MuteConfig {
    end_time: number;
    selected_time_window: number;
}
export declare type PublicMemberKeys = "id" | "guild_id" | "nick" | "roles" | "joined_at" | "pending" | "deaf" | "mute" | "premium_since";
export declare const PublicMemberProjection: PublicMemberKeys[];
export declare type PublicMember = Pick<Member, Omit<PublicMemberKeys, "roles">> & {
    user: PublicUser;
    roles: string[];
};
