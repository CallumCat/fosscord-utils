import { ApiError } from "./ApiError";
export declare const WSCodes: {
    1000: string;
    4004: string;
    4010: string;
    4011: string;
    4013: string;
    4014: string;
};
/**
 * The current status of the client. Here are the available statuses:
 * * READY: 0
 * * CONNECTING: 1
 * * RECONNECTING: 2
 * * IDLE: 3
 * * NEARLY: 4
 * * DISCONNECTED: 5
 * * WAITING_FOR_GUILDS: 6
 * * IDENTIFYING: 7
 * * RESUMING: 8
 * @typedef {number} Status
 */
export declare const WsStatus: {
    READY: number;
    CONNECTING: number;
    RECONNECTING: number;
    IDLE: number;
    NEARLY: number;
    DISCONNECTED: number;
    WAITING_FOR_GUILDS: number;
    IDENTIFYING: number;
    RESUMING: number;
};
/**
 * The current status of a voice connection. Here are the available statuses:
 * * CONNECTED: 0
 * * CONNECTING: 1
 * * AUTHENTICATING: 2
 * * RECONNECTING: 3
 * * DISCONNECTED: 4
 * @typedef {number} VoiceStatus
 */
export declare const VoiceStatus: {
    CONNECTED: number;
    CONNECTING: number;
    AUTHENTICATING: number;
    RECONNECTING: number;
    DISCONNECTED: number;
};
export declare const OPCodes: {
    DISPATCH: number;
    HEARTBEAT: number;
    IDENTIFY: number;
    STATUS_UPDATE: number;
    VOICE_STATE_UPDATE: number;
    VOICE_GUILD_PING: number;
    RESUME: number;
    RECONNECT: number;
    REQUEST_GUILD_MEMBERS: number;
    INVALID_SESSION: number;
    HELLO: number;
    HEARTBEAT_ACK: number;
};
export declare const VoiceOPCodes: {
    IDENTIFY: number;
    SELECT_PROTOCOL: number;
    READY: number;
    HEARTBEAT: number;
    SESSION_DESCRIPTION: number;
    SPEAKING: number;
    HELLO: number;
    CLIENT_CONNECT: number;
    CLIENT_DISCONNECT: number;
};
export declare const Events: {
    RATE_LIMIT: string;
    CLIENT_READY: string;
    GUILD_CREATE: string;
    GUILD_DELETE: string;
    GUILD_UPDATE: string;
    GUILD_UNAVAILABLE: string;
    GUILD_AVAILABLE: string;
    GUILD_MEMBER_ADD: string;
    GUILD_MEMBER_REMOVE: string;
    GUILD_MEMBER_UPDATE: string;
    GUILD_MEMBER_AVAILABLE: string;
    GUILD_MEMBER_SPEAKING: string;
    GUILD_MEMBERS_CHUNK: string;
    GUILD_INTEGRATIONS_UPDATE: string;
    GUILD_ROLE_CREATE: string;
    GUILD_ROLE_DELETE: string;
    INVITE_CREATE: string;
    INVITE_DELETE: string;
    GUILD_ROLE_UPDATE: string;
    GUILD_EMOJI_CREATE: string;
    GUILD_EMOJI_DELETE: string;
    GUILD_EMOJI_UPDATE: string;
    GUILD_BAN_ADD: string;
    GUILD_BAN_REMOVE: string;
    CHANNEL_CREATE: string;
    CHANNEL_DELETE: string;
    CHANNEL_UPDATE: string;
    CHANNEL_PINS_UPDATE: string;
    MESSAGE_CREATE: string;
    MESSAGE_DELETE: string;
    MESSAGE_UPDATE: string;
    MESSAGE_BULK_DELETE: string;
    MESSAGE_REACTION_ADD: string;
    MESSAGE_REACTION_REMOVE: string;
    MESSAGE_REACTION_REMOVE_ALL: string;
    MESSAGE_REACTION_REMOVE_EMOJI: string;
    USER_UPDATE: string;
    PRESENCE_UPDATE: string;
    VOICE_SERVER_UPDATE: string;
    VOICE_STATE_UPDATE: string;
    VOICE_BROADCAST_SUBSCRIBE: string;
    VOICE_BROADCAST_UNSUBSCRIBE: string;
    TYPING_START: string;
    TYPING_STOP: string;
    WEBHOOKS_UPDATE: string;
    ERROR: string;
    WARN: string;
    DEBUG: string;
    SHARD_DISCONNECT: string;
    SHARD_ERROR: string;
    SHARD_RECONNECTING: string;
    SHARD_READY: string;
    SHARD_RESUME: string;
    INVALIDATED: string;
    RAW: string;
};
export declare const ShardEvents: {
    CLOSE: string;
    DESTROYED: string;
    INVALID_SESSION: string;
    READY: string;
    RESUMED: string;
    ALL_READY: string;
};
/**
 * The type of Structure allowed to be a partial:
 * * USER
 * * CHANNEL (only affects DMChannels)
 * * GUILD_MEMBER
 * * MESSAGE
 * * REACTION
 * <warn>Partials require you to put checks in place when handling data, read the Partials topic listed in the
 * sidebar for more information.</warn>
 * @typedef {string} PartialType
 */
export declare const PartialTypes: any;
/**
 * The type of a websocket message event, e.g. `MESSAGE_CREATE`. Here are the available events:
 * * READY
 * * RESUMED
 * * GUILD_CREATE
 * * GUILD_DELETE
 * * GUILD_UPDATE
 * * INVITE_CREATE
 * * INVITE_DELETE
 * * GUILD_MEMBER_ADD
 * * GUILD_MEMBER_REMOVE
 * * GUILD_MEMBER_UPDATE
 * * GUILD_MEMBERS_CHUNK
 * * GUILD_INTEGRATIONS_UPDATE
 * * GUILD_ROLE_CREATE
 * * GUILD_ROLE_DELETE
 * * GUILD_ROLE_UPDATE
 * * GUILD_BAN_ADD
 * * GUILD_BAN_REMOVE
 * * GUILD_EMOJIS_UPDATE
 * * CHANNEL_CREATE
 * * CHANNEL_DELETE
 * * CHANNEL_UPDATE
 * * CHANNEL_PINS_UPDATE
 * * MESSAGE_CREATE
 * * MESSAGE_DELETE
 * * MESSAGE_UPDATE
 * * MESSAGE_DELETE_BULK
 * * MESSAGE_REACTION_ADD
 * * MESSAGE_REACTION_REMOVE
 * * MESSAGE_REACTION_REMOVE_ALL
 * * MESSAGE_REACTION_REMOVE_EMOJI
 * * USER_UPDATE
 * * PRESENCE_UPDATE
 * * TYPING_START
 * * VOICE_STATE_UPDATE
 * * VOICE_SERVER_UPDATE
 * * WEBHOOKS_UPDATE
 * @typedef {string} WSEventType
 */
export declare const WSEvents: any;
/**
 * The type of a message, e.g. `DEFAULT`. Here are the available types:
 * * DEFAULT
 * * RECIPIENT_ADD
 * * RECIPIENT_REMOVE
 * * CALL
 * * CHANNEL_NAME_CHANGE
 * * CHANNEL_ICON_CHANGE
 * * PINS_ADD
 * * GUILD_MEMBER_JOIN
 * * USER_PREMIUM_GUILD_SUBSCRIPTION
 * * USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1
 * * USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2
 * * USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3
 * * CHANNEL_FOLLOW_ADD
 * * GUILD_DISCOVERY_DISQUALIFIED
 * * GUILD_DISCOVERY_REQUALIFIED
 * * REPLY
 * @typedef {string} MessageType
 */
export declare const MessageTypes: (string | null)[];
/**
 * The types of messages that are `System`. The available types are `MessageTypes` excluding:
 * * DEFAULT
 * * REPLY
 * @typedef {string} SystemMessageType
 */
export declare const SystemMessageTypes: (string | null)[];
/**
 * <info>Bots cannot set a `CUSTOM_STATUS`, it is only for custom statuses received from users</info>
 * The type of an activity of a users presence, e.g. `PLAYING`. Here are the available types:
 * * PLAYING
 * * STREAMING
 * * LISTENING
 * * WATCHING
 * * CUSTOM_STATUS
 * * COMPETING
 * @typedef {string} ActivityType
 */
export declare const ActivityTypes: string[];
export declare const ChannelTypes: {
    TEXT: number;
    DM: number;
    VOICE: number;
    GROUP: number;
    CATEGORY: number;
    NEWS: number;
    STORE: number;
};
export declare const ClientApplicationAssetTypes: {
    SMALL: number;
    BIG: number;
};
export declare const Colors: {
    DEFAULT: number;
    WHITE: number;
    AQUA: number;
    GREEN: number;
    BLUE: number;
    YELLOW: number;
    PURPLE: number;
    LUMINOUS_VIVID_PINK: number;
    GOLD: number;
    ORANGE: number;
    RED: number;
    GREY: number;
    NAVY: number;
    DARK_AQUA: number;
    DARK_GREEN: number;
    DARK_BLUE: number;
    DARK_PURPLE: number;
    DARK_VIVID_PINK: number;
    DARK_GOLD: number;
    DARK_ORANGE: number;
    DARK_RED: number;
    DARK_GREY: number;
    DARKER_GREY: number;
    LIGHT_GREY: number;
    DARK_NAVY: number;
    BLURPLE: number;
    GREYPLE: number;
    DARK_BUT_NOT_BLACK: number;
    NOT_QUITE_BLACK: number;
};
/**
 * The value set for the explicit content filter levels for a guild:
 * * DISABLED
 * * MEMBERS_WITHOUT_ROLES
 * * ALL_MEMBERS
 * @typedef {string} ExplicitContentFilterLevel
 */
export declare const ExplicitContentFilterLevels: string[];
/**
 * The value set for the verification levels for a guild:
 * * NONE
 * * LOW
 * * MEDIUM
 * * HIGH
 * * VERY_HIGH
 * @typedef {string} VerificationLevel
 */
export declare const VerificationLevels: string[];
/**
 * An error encountered while performing an API request. Here are the potential errors:
 * * GENERAL_ERROR
 * * UNKNOWN_ACCOUNT
 * * UNKNOWN_APPLICATION
 * * UNKNOWN_CHANNEL
 * * UNKNOWN_GUILD
 * * UNKNOWN_INTEGRATION
 * * UNKNOWN_INVITE
 * * UNKNOWN_MEMBER
 * * UNKNOWN_MESSAGE
 * * UNKNOWN_OVERWRITE
 * * UNKNOWN_PROVIDER
 * * UNKNOWN_ROLE
 * * UNKNOWN_TOKEN
 * * UNKNOWN_USER
 * * UNKNOWN_EMOJI
 * * UNKNOWN_WEBHOOK
 * * UNKNOWN_WEBHOOK_SERVICE
 * * UNKNOWN_SESSION
 * * UNKNOWN_BAN
 * * UNKNOWN_SKU
 * * UNKNOWN_STORE_LISTING
 * * UNKNOWN_ENTITLEMENT
 * * UNKNOWN_BUILD
 * * UNKNOWN_LOBBY
 * * UNKNOWN_BRANCH
 * * UNKNOWN_STORE_DIRECTORY_LAYOUT
 * * UNKNOWN_REDISTRIBUTABLE
 * * UNKNOWN_GIFT_CODE
 * * UNKNOWN_STREAM
 * * UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN
 * * UNKNOWN_GUILD_TEMPLATE
 * * UNKNOWN_DISCOVERABLE_SERVER_CATEGORY
 * * UNKNOWN_STICKER
 * * UNKNOWN_INTERACTION
 * * UNKNOWN_APPLICATION_COMMAND
 * * UNKNOWN_APPLICATION_COMMAND_PERMISSIONS
 * * UNKNOWN_STAGE_INSTANCE
 * * UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM
 * * UNKNOWN_GUILD_WELCOME_SCREEN
 * * UNKNOWN_GUILD_SCHEDULED_EVENT
 * * UNKNOWN_GUILD_SCHEDULED_EVENT_USER
 * * BOT_PROHIBITED_ENDPOINT
 * * BOT_ONLY_ENDPOINT
 * * EXPLICIT_CONTENT_CANNOT_BE_SENT_TO_RECIPIENT
 * * ACTION_NOT_AUTHORIZED_ON_APPLICATION
 * * SLOWMODE_RATE_LIMIT
 * * ONLY_OWNER
 * * ANNOUNCEMENT_RATE_LIMITS
 * * CHANNEL_WRITE_RATELIMIT
 * * WORDS_NOT_ALLOWED
 * * GUILD_PREMIUM_LEVEL_TOO_LOW
 * * MAXIMUM_GUILDS
 * * MAXIMUM_FRIENDS
 * * MAXIMUM_PINS
 * * MAXIMUM_NUMBER_OF_RECIPIENTS_REACHED
 * * MAXIMUM_ROLES
 * * MAXIMUM_WEBHOOKS
 * * MAXIMUM_NUMBER_OF_EMOJIS_REACHED
 * * MAXIMUM_REACTIONS
 * * MAXIMUM_CHANNELS
 * * MAXIMUM_ATTACHMENTS
 * * MAXIMUM_INVITES
 * * MAXIMUM_ANIMATED_EMOJIS
 * * MAXIMUM_SERVER_MEMBERS
 * * MAXIMUM_SERVER_CATEGORIES
 * * GUILD_ALREADY_HAS_TEMPLATE
 * * MAXIMUM_THREAD_PARTICIPANTS
 * * MAXIMUM_BANS_FOR_NON_GUILD_MEMBERS
 * * MAXIMUM_BANS_FETCHES
 * * MAXIMUM_STICKERS
 * * MAXIMUM_PRUNE_REQUESTS
 * * UNAUTHORIZED
 * * ACCOUNT_VERIFICATION_REQUIRED
 * * OPENING_DIRECT_MESSAGES_TOO_FAST
 * * REQUEST_ENTITY_TOO_LARGE
 * * FEATURE_TEMPORARILY_DISABLED
 * * USER_BANNED
 * * TARGET_USER_IS_NOT_CONNECTED_TO_VOICE
 * * ALREADY_CROSSPOSTED
 * * APPLICATION_COMMAND_ALREADY_EXISTS
 * * MISSING_ACCESS
 * * INVALID_ACCOUNT_TYPE
 * * CANNOT_EXECUTE_ON_DM
 * * EMBED_DISABLED
 * * CANNOT_EDIT_MESSAGE_BY_OTHER
 * * CANNOT_SEND_EMPTY_MESSAGE
 * * CANNOT_MESSAGE_USER
 * * CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL
 * * CHANNEL_VERIFICATION_LEVEL_TOO_HIGH
 * * OAUTH2_APPLICATION_BOT_ABSENT
 * * MAXIMUM_OAUTH2_APPLICATIONS
 * * INVALID_OAUTH_STATE
 * * MISSING_PERMISSIONS
 * * INVALID_AUTHENTICATION_TOKEN
 * * NOTE_TOO_LONG
 * * INVALID_BULK_DELETE_QUANTITY
 * * CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL
 * * INVALID_OR_TAKEN_INVITE_CODE
 * * CANNOT_EXECUTE_ON_SYSTEM_MESSAGE
 * * CANNOT_EXECUTE_ON_THIS_CHANNEL_TYPE
 * * INVALID_OAUTH_TOKEN
 * * MISSING_REQUIRED_OAUTH2_SCOPE
 * * INVALID_WEBHOOK_TOKEN_PROVIDED
 * * INVALID_ROLE
 * * INVALID_RECIPIENT
 * * BULK_DELETE_MESSAGE_TOO_OLD
 * * INVALID_FORM_BODY
 * * INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT
 * * INVALID_API_VERSION
 * * FILE_EXCEEDS_MAXIMUM_SIZE
 * * INVALID_FILE_UPLOADED
 * * CANNOT_SELF_REDEEM_GIFT
 * * PAYMENT_SOURCE_REQUIRED
 * * CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL
 * * INVALID_STICKER_SENT
 * * CANNOT_EDIT_ARCHIVED_THREAD
 * * INVALID_THREAD_NOTIFICATION_SETTINGS
 * * BEFORE_EARLIER_THAN_THREAD_CREATION_DATE
 * * SERVER_NOT_AVAILABLE_IN_YOUR_LOCATION
 * * SERVER_NEEDS_MONETIZATION_ENABLED
 * * TWO_FACTOR_REQUIRED
 * * NO_USERS_WITH_DISCORDTAG_EXIST
 * * REACTION_BLOCKED
 * * RESOURCE_OVERLOADED
 * * STAGE_ALREADY_OPEN
 * * THREAD_ALREADY_CREATED_FOR_THIS_MESSAGE
 * * THREAD_IS_LOCKED
 * * MAXIMUM_NUMBER_OF_ACTIVE_THREADS
 * * MAXIMUM_NUMBER_OF_ACTIVE_ANNOUNCEMENT_THREADS
 * * INVALID_JSON_FOR_UPLOADED_LOTTIE_FILE
 * * LOTTIES_CANNOT_CONTAIN_RASTERIZED_IMAGES
 * * STICKER_MAXIMUM_FRAMERATE
 * * STICKER_MAXIMUM_FRAME_COUNT
 * * LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS
 * * STICKER_FRAME_RATE_TOO_SMALL_OR_TOO_LARGE
 * * STICKER_ANIMATION_DURATION_MAXIMUM
 * * UNKNOWN_VOICE_STATE
 * @typedef {string} APIError
 */
export declare const DiscordApiErrors: {
    GENERAL_ERROR: ApiError;
    UNKNOWN_ACCOUNT: ApiError;
    UNKNOWN_APPLICATION: ApiError;
    UNKNOWN_CHANNEL: ApiError;
    UNKNOWN_GUILD: ApiError;
    UNKNOWN_INTEGRATION: ApiError;
    UNKNOWN_INVITE: ApiError;
    UNKNOWN_MEMBER: ApiError;
    UNKNOWN_MESSAGE: ApiError;
    UNKNOWN_OVERWRITE: ApiError;
    UNKNOWN_PROVIDER: ApiError;
    UNKNOWN_ROLE: ApiError;
    UNKNOWN_TOKEN: ApiError;
    UNKNOWN_USER: ApiError;
    UNKNOWN_EMOJI: ApiError;
    UNKNOWN_WEBHOOK: ApiError;
    UNKNOWN_WEBHOOK_SERVICE: ApiError;
    UNKNOWN_SESSION: ApiError;
    UNKNOWN_BAN: ApiError;
    UNKNOWN_SKU: ApiError;
    UNKNOWN_STORE_LISTING: ApiError;
    UNKNOWN_ENTITLEMENT: ApiError;
    UNKNOWN_BUILD: ApiError;
    UNKNOWN_LOBBY: ApiError;
    UNKNOWN_BRANCH: ApiError;
    UNKNOWN_STORE_DIRECTORY_LAYOUT: ApiError;
    UNKNOWN_REDISTRIBUTABLE: ApiError;
    UNKNOWN_GIFT_CODE: ApiError;
    UNKNOWN_STREAM: ApiError;
    UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN: ApiError;
    UNKNOWN_GUILD_TEMPLATE: ApiError;
    UNKNOWN_DISCOVERABLE_SERVER_CATEGORY: ApiError;
    UNKNOWN_STICKER: ApiError;
    UNKNOWN_INTERACTION: ApiError;
    UNKNOWN_APPLICATION_COMMAND: ApiError;
    UNKNOWN_APPLICATION_COMMAND_PERMISSIONS: ApiError;
    UNKNOWN_STAGE_INSTANCE: ApiError;
    UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM: ApiError;
    UNKNOWN_GUILD_WELCOME_SCREEN: ApiError;
    UNKNOWN_GUILD_SCHEDULED_EVENT: ApiError;
    UNKNOWN_GUILD_SCHEDULED_EVENT_USER: ApiError;
    BOT_PROHIBITED_ENDPOINT: ApiError;
    BOT_ONLY_ENDPOINT: ApiError;
    EXPLICIT_CONTENT_CANNOT_BE_SENT_TO_RECIPIENT: ApiError;
    ACTION_NOT_AUTHORIZED_ON_APPLICATION: ApiError;
    SLOWMODE_RATE_LIMIT: ApiError;
    ONLY_OWNER: ApiError;
    ANNOUNCEMENT_RATE_LIMITS: ApiError;
    CHANNEL_WRITE_RATELIMIT: ApiError;
    WORDS_NOT_ALLOWED: ApiError;
    GUILD_PREMIUM_LEVEL_TOO_LOW: ApiError;
    MAXIMUM_GUILDS: ApiError;
    MAXIMUM_FRIENDS: ApiError;
    MAXIMUM_PINS: ApiError;
    MAXIMUM_NUMBER_OF_RECIPIENTS_REACHED: ApiError;
    MAXIMUM_ROLES: ApiError;
    MAXIMUM_WEBHOOKS: ApiError;
    MAXIMUM_NUMBER_OF_EMOJIS_REACHED: ApiError;
    MAXIMUM_REACTIONS: ApiError;
    MAXIMUM_CHANNELS: ApiError;
    MAXIMUM_ATTACHMENTS: ApiError;
    MAXIMUM_INVITES: ApiError;
    MAXIMUM_ANIMATED_EMOJIS: ApiError;
    MAXIMUM_SERVER_MEMBERS: ApiError;
    MAXIMUM_SERVER_CATEGORIES: ApiError;
    GUILD_ALREADY_HAS_TEMPLATE: ApiError;
    MAXIMUM_THREAD_PARTICIPANTS: ApiError;
    MAXIMUM_BANS_FOR_NON_GUILD_MEMBERS: ApiError;
    MAXIMUM_BANS_FETCHES: ApiError;
    MAXIMUM_STICKERS: ApiError;
    MAXIMUM_PRUNE_REQUESTS: ApiError;
    UNAUTHORIZED: ApiError;
    ACCOUNT_VERIFICATION_REQUIRED: ApiError;
    OPENING_DIRECT_MESSAGES_TOO_FAST: ApiError;
    REQUEST_ENTITY_TOO_LARGE: ApiError;
    FEATURE_TEMPORARILY_DISABLED: ApiError;
    USER_BANNED: ApiError;
    TARGET_USER_IS_NOT_CONNECTED_TO_VOICE: ApiError;
    ALREADY_CROSSPOSTED: ApiError;
    APPLICATION_COMMAND_ALREADY_EXISTS: ApiError;
    MISSING_ACCESS: ApiError;
    INVALID_ACCOUNT_TYPE: ApiError;
    CANNOT_EXECUTE_ON_DM: ApiError;
    EMBED_DISABLED: ApiError;
    CANNOT_EDIT_MESSAGE_BY_OTHER: ApiError;
    CANNOT_SEND_EMPTY_MESSAGE: ApiError;
    CANNOT_MESSAGE_USER: ApiError;
    CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: ApiError;
    CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: ApiError;
    OAUTH2_APPLICATION_BOT_ABSENT: ApiError;
    MAXIMUM_OAUTH2_APPLICATIONS: ApiError;
    INVALID_OAUTH_STATE: ApiError;
    MISSING_PERMISSIONS: ApiError;
    INVALID_AUTHENTICATION_TOKEN: ApiError;
    NOTE_TOO_LONG: ApiError;
    INVALID_BULK_DELETE_QUANTITY: ApiError;
    CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: ApiError;
    INVALID_OR_TAKEN_INVITE_CODE: ApiError;
    CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: ApiError;
    CANNOT_EXECUTE_ON_THIS_CHANNEL_TYPE: ApiError;
    INVALID_OAUTH_TOKEN: ApiError;
    MISSING_REQUIRED_OAUTH2_SCOPE: ApiError;
    INVALID_WEBHOOK_TOKEN_PROVIDED: ApiError;
    INVALID_ROLE: ApiError;
    INVALID_RECIPIENT: ApiError;
    BULK_DELETE_MESSAGE_TOO_OLD: ApiError;
    INVALID_FORM_BODY: ApiError;
    INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: ApiError;
    INVALID_API_VERSION: ApiError;
    FILE_EXCEEDS_MAXIMUM_SIZE: ApiError;
    INVALID_FILE_UPLOADED: ApiError;
    CANNOT_SELF_REDEEM_GIFT: ApiError;
    PAYMENT_SOURCE_REQUIRED: ApiError;
    CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL: ApiError;
    INVALID_STICKER_SENT: ApiError;
    CANNOT_EDIT_ARCHIVED_THREAD: ApiError;
    INVALID_THREAD_NOTIFICATION_SETTINGS: ApiError;
    BEFORE_EARLIER_THAN_THREAD_CREATION_DATE: ApiError;
    SERVER_NOT_AVAILABLE_IN_YOUR_LOCATION: ApiError;
    SERVER_NEEDS_MONETIZATION_ENABLED: ApiError;
    TWO_FACTOR_REQUIRED: ApiError;
    NO_USERS_WITH_DISCORDTAG_EXIST: ApiError;
    REACTION_BLOCKED: ApiError;
    RESOURCE_OVERLOADED: ApiError;
    STAGE_ALREADY_OPEN: ApiError;
    THREAD_ALREADY_CREATED_FOR_THIS_MESSAGE: ApiError;
    THREAD_IS_LOCKED: ApiError;
    MAXIMUM_NUMBER_OF_ACTIVE_THREADS: ApiError;
    MAXIMUM_NUMBER_OF_ACTIVE_ANNOUNCEMENT_THREADS: ApiError;
    INVALID_JSON_FOR_UPLOADED_LOTTIE_FILE: ApiError;
    LOTTIES_CANNOT_CONTAIN_RASTERIZED_IMAGES: ApiError;
    STICKER_MAXIMUM_FRAMERATE: ApiError;
    STICKER_MAXIMUM_FRAME_COUNT: ApiError;
    LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS: ApiError;
    STICKER_FRAME_RATE_TOO_SMALL_OR_TOO_LARGE: ApiError;
    STICKER_ANIMATION_DURATION_MAXIMUM: ApiError;
    UNKNOWN_VOICE_STATE: ApiError;
};
/**
 * An error encountered while performing an API request (Fosscord only). Here are the potential errors:
 */
export declare const FosscordApiErrors: {
    MISSING_RIGHTS: ApiError;
};
/**
 * The value set for a guild's default message notifications, e.g. `ALL`. Here are the available types:
 * * ALL
 * * MENTIONS
 * @typedef {string} DefaultMessageNotifications
 */
export declare const DefaultMessageNotifications: string[];
/**
 * The value set for a team members's membership state:
 * * INVITED
 * * ACCEPTED
 * @typedef {string} MembershipStates
 */
export declare const MembershipStates: (string | null)[];
/**
 * The value set for a webhook's type:
 * * Incoming
 * * Channel Follower
 * @typedef {string} WebhookTypes
 */
export declare const WebhookTypes: (string | null)[];
