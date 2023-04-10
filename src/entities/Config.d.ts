import { BaseClassWithoutId } from "./BaseClass";
export declare class ConfigEntity extends BaseClassWithoutId {
    key: string;
    value: number | boolean | null | string | undefined;
}
export interface RateLimitOptions {
    bot?: number;
    count: number;
    window: number;
    onyIp?: boolean;
}
export interface Region {
    id: string;
    name: string;
    endpoint: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    vip: boolean;
    custom: boolean;
    deprecated: boolean;
}
export interface KafkaBroker {
    ip: string;
    port: number;
}
export interface ConfigValue {
    gateway: {
        endpointClient: string | null;
        endpointPrivate: string | null;
        endpointPublic: string | null;
    };
    cdn: {
        endpointClient: string | null;
        endpointPublic: string | null;
        endpointPrivate: string | null;
    };
    general: {
        instanceId: string;
    };
    limits: {
        user: {
            maxGuilds: number;
            maxUsername: number;
            maxFriends: number;
        };
        guild: {
            maxRoles: number;
            maxEmojis: number;
            maxMembers: number;
            maxChannels: number;
            maxChannelsInCategory: number;
            hideOfflineMember: number;
        };
        message: {
            maxCharacters: number;
            maxTTSCharacters: number;
            maxReactions: number;
            maxAttachmentSize: number;
            maxBulkDelete: number;
        };
        channel: {
            maxPins: number;
            maxTopic: number;
            maxWebhooks: number;
        };
        rate: {
            disabled: boolean;
            ip: Omit<RateLimitOptions, "bot_count">;
            global: RateLimitOptions;
            error: RateLimitOptions;
            routes: {
                guild: RateLimitOptions;
                webhook: RateLimitOptions;
                channel: RateLimitOptions;
                auth: {
                    login: RateLimitOptions;
                    register: RateLimitOptions;
                };
            };
        };
    };
    security: {
        autoUpdate: boolean | number;
        requestSignature: string;
        jwtSecret: string;
        forwadedFor: string | null;
        captcha: {
            enabled: boolean;
            service: "recaptcha" | "hcaptcha" | null;
            sitekey: string | null;
            secret: string | null;
        };
        ipdataApiKey: string | null;
    };
    login: {
        requireCaptcha: boolean;
    };
    register: {
        email: {
            required: boolean;
            allowlist: boolean;
            blocklist: boolean;
            domains: string[];
        };
        dateOfBirth: {
            required: boolean;
            minimum: number;
        };
        disabled: boolean;
        requireCaptcha: boolean;
        requireInvite: boolean;
        guestsRequireInvite: boolean;
        allowNewRegistration: boolean;
        allowMultipleAccounts: boolean;
        blockProxies: boolean;
        password: {
            required: boolean;
            minLength: number;
            minNumbers: number;
            minUpperCase: number;
            minSymbols: number;
        };
    };
    regions: {
        default: string;
        useDefaultAsOptimal: boolean;
        available: Region[];
    };
    guild: {
        showAllGuildsInDiscovery: boolean;
        autoJoin: {
            enabled: boolean;
            guilds: string[];
            canLeave: boolean;
        };
    };
    gif: {
        enabled: boolean;
        provider: "tenor";
        apiKey?: string;
    };
    rabbitmq: {
        host: string | null;
    };
    kafka: {
        brokers: KafkaBroker[] | null;
    };
}
export declare const DefaultConfigOptions: ConfigValue;
