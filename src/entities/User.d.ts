import { FindOneOptions } from "typeorm";
import { BaseClass } from "./BaseClass";
import { BitField } from "../util/BitField";
import { Relationship } from "./Relationship";
import { ConnectedAccount } from "./ConnectedAccount";
import { Session } from ".";
export declare enum PublicUserEnum {
    username = 0,
    discriminator = 1,
    id = 2,
    public_flags = 3,
    avatar = 4,
    accent_color = 5,
    banner = 6,
    bio = 7,
    bot = 8
}
export declare type PublicUserKeys = keyof typeof PublicUserEnum;
export declare enum PrivateUserEnum {
    flags = 0,
    mfa_enabled = 1,
    email = 2,
    phone = 3,
    verified = 4,
    nsfw_allowed = 5,
    premium = 6,
    premium_type = 7,
    disabled = 8,
    settings = 9
}
export declare type PrivateUserKeys = keyof typeof PrivateUserEnum | PublicUserKeys;
export declare const PublicUserProjection: ("bot" | "username" | "discriminator" | "id" | "public_flags" | "avatar" | "accent_color" | "banner" | "bio")[];
export declare const PrivateUserProjection: PrivateUserKeys[];
export declare type PublicUser = Pick<User, PublicUserKeys>;
export interface UserPublic extends Pick<User, PublicUserKeys> {
}
export interface UserPrivate extends Pick<User, PrivateUserKeys> {
    locale: string;
}
export declare class User extends BaseClass {
    username: string;
    discriminator: string;
    setDiscriminator(val: string): void;
    avatar?: string;
    accent_color?: number;
    banner?: string;
    phone?: string;
    desktop: boolean;
    mobile: boolean;
    premium: boolean;
    premium_type: number;
    bot: boolean;
    bio: string;
    system: boolean;
    nsfw_allowed: boolean;
    mfa_enabled: boolean;
    created_at: Date;
    verified: boolean;
    disabled: boolean;
    deleted: boolean;
    email?: string;
    flags: string;
    public_flags: number;
    rights: string;
    sessions: Session[];
    relationships: Relationship[];
    connected_accounts: ConnectedAccount[];
    data: {
        valid_tokens_since: Date;
        hash?: string;
    };
    fingerprints: string[];
    settings: UserSettings;
    toPublicUser(): PublicUser;
    static getPublicUser(user_id: string, opts?: FindOneOptions<User>): Promise<any>;
    static register({ email, username, password, date_of_birth, req, }: {
        username: string;
        password?: string;
        email?: string;
        date_of_birth?: Date;
        req?: any;
    }): Promise<User>;
}
export declare const defaultSettings: UserSettings;
export interface UserSettings {
    afk_timeout: number;
    allow_accessibility_detection: boolean;
    animate_emoji: boolean;
    animate_stickers: number;
    contact_sync_enabled: boolean;
    convert_emoticons: boolean;
    custom_status: {
        emoji_id?: string;
        emoji_name?: string;
        expires_at?: number;
        text?: string;
    };
    default_guilds_restricted: boolean;
    detect_platform_accounts: boolean;
    developer_mode: boolean;
    disable_games_tab: boolean;
    enable_tts_command: boolean;
    explicit_content_filter: number;
    friend_source_flags: {
        all: boolean;
    };
    gateway_connected: boolean;
    gif_auto_play: boolean;
    guild_folders: {
        color: number;
        guild_ids: string[];
        id: number;
        name: string;
    }[];
    guild_positions: string[];
    inline_attachment_media: boolean;
    inline_embed_media: boolean;
    locale: string;
    message_display_compact: boolean;
    native_phone_integration_enabled: boolean;
    render_embeds: boolean;
    render_reactions: boolean;
    restricted_guilds: string[];
    show_current_game: boolean;
    status: "online" | "offline" | "dnd" | "idle";
    stream_notifications_enabled: boolean;
    theme: "dark" | "white";
    timezone_offset: number;
}
export declare const CUSTOM_USER_FLAG_OFFSET: bigint;
export declare class UserFlags extends BitField {
    static FLAGS: {
        DISCORD_EMPLOYEE: bigint;
        PARTNERED_SERVER_OWNER: bigint;
        HYPESQUAD_EVENTS: bigint;
        BUGHUNTER_LEVEL_1: bigint;
        MFA_SMS: bigint;
        PREMIUM_PROMO_DISMISSED: bigint;
        HOUSE_BRAVERY: bigint;
        HOUSE_BRILLIANCE: bigint;
        HOUSE_BALANCE: bigint;
        EARLY_SUPPORTER: bigint;
        TEAM_USER: bigint;
        TRUST_AND_SAFETY: bigint;
        SYSTEM: bigint;
        HAS_UNREAD_URGENT_MESSAGES: bigint;
        BUGHUNTER_LEVEL_2: bigint;
        UNDERAGE_DELETED: bigint;
        VERIFIED_BOT: bigint;
        EARLY_VERIFIED_BOT_DEVELOPER: bigint;
        CERTIFIED_MODERATOR: bigint;
        BOT_HTTP_INTERACTIONS: bigint;
    };
}
