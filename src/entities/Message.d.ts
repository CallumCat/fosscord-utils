import { User } from "./User";
import { Member } from "./Member";
import { Role } from "./Role";
import { Channel } from "./Channel";
import { InteractionType } from "../interfaces/Interaction";
import { Application } from "./Application";
import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
import { Webhook } from "./Webhook";
import { Sticker } from "./Sticker";
import { Attachment } from "./Attachment";
export declare enum MessageType {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    GUILD_MEMBER_JOIN = 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    REPLY = 19,
    APPLICATION_COMMAND = 20
}
export declare class Message extends BaseClass {
    channel_id: string;
    channel: Channel;
    guild_id?: string;
    guild?: Guild;
    author_id: string;
    author?: User;
    member_id: string;
    member?: Member;
    webhook_id: string;
    webhook?: Webhook;
    application_id: string;
    application?: Application;
    content?: string;
    timestamp: Date;
    edited_timestamp?: Date;
    tts?: boolean;
    mention_everyone?: boolean;
    mentions: User[];
    mention_roles: Role[];
    mention_channels: Channel[];
    sticker_items?: Sticker[];
    attachments?: Attachment[];
    embeds: Embed[];
    reactions: Reaction[];
    nonce?: string;
    pinned?: boolean;
    type: MessageType;
    activity?: {
        type: number;
        party_id: string;
    };
    flags?: string;
    message_reference?: {
        message_id: string;
        channel_id?: string;
        guild_id?: string;
    };
    referenced_message?: Message;
    interaction?: {
        id: string;
        type: InteractionType;
        name: string;
        user_id: string;
    };
    components?: MessageComponent[];
}
export interface MessageComponent {
    type: number;
    style?: number;
    label?: string;
    emoji?: PartialEmoji;
    custom_id?: string;
    url?: string;
    disabled?: boolean;
    components: MessageComponent[];
}
export declare enum MessageComponentType {
    ActionRow = 1,
    Button = 2
}
export interface Embed {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: {
        text: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    image?: EmbedImage;
    thumbnail?: EmbedImage;
    video?: EmbedImage;
    provider?: {
        name?: string;
        url?: string;
    };
    author?: {
        name?: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
}
export declare enum EmbedType {
    rich = "rich",
    image = "image",
    video = "video",
    gifv = "gifv",
    article = "article",
    link = "link"
}
export interface EmbedImage {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}
export interface Reaction {
    count: number;
    emoji: PartialEmoji;
    user_ids: string[];
}
export interface PartialEmoji {
    id?: string;
    name: string;
    animated?: boolean;
}
export interface AllowedMentions {
    parse?: ("users" | "roles" | "everyone")[];
    roles?: string[];
    users?: string[];
    replied_user?: boolean;
}
