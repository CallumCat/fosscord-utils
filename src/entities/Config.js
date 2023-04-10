"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfigOptions = exports.ConfigEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const crypto_1 = __importDefault(require("crypto"));
const Snowflake_1 = require("../util/Snowflake");
let ConfigEntity = class ConfigEntity extends BaseClass_1.BaseClassWithoutId {
    key;
    value;
};
__decorate([
    BaseClass_1.PrimaryIdColumn()
], ConfigEntity.prototype, "key", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", nullable: true })
], ConfigEntity.prototype, "value", void 0);
ConfigEntity = __decorate([
    typeorm_1.Entity("config")
], ConfigEntity);
exports.ConfigEntity = ConfigEntity;
exports.DefaultConfigOptions = {
    gateway: {
        endpointClient: null,
        endpointPrivate: null,
        endpointPublic: null,
    },
    cdn: {
        endpointClient: null,
        endpointPrivate: null,
        endpointPublic: null,
    },
    general: {
        instanceId: Snowflake_1.Snowflake.generate(),
    },
    limits: {
        user: {
            maxGuilds: 100,
            maxUsername: 32,
            maxFriends: 1000,
        },
        guild: {
            maxRoles: 250,
            maxEmojis: 50,
            maxMembers: 250000,
            maxChannels: 500,
            maxChannelsInCategory: 50,
            hideOfflineMember: 1000,
        },
        message: {
            maxCharacters: 2000,
            maxTTSCharacters: 200,
            maxReactions: 20,
            maxAttachmentSize: 8388608,
            maxBulkDelete: 100,
        },
        channel: {
            maxPins: 50,
            maxTopic: 1024,
            maxWebhooks: 10,
        },
        rate: {
            disabled: true,
            ip: {
                count: 500,
                window: 5,
            },
            global: {
                count: 20,
                window: 5,
                bot: 250,
            },
            error: {
                count: 10,
                window: 5,
            },
            routes: {
                guild: {
                    count: 5,
                    window: 5,
                },
                webhook: {
                    count: 10,
                    window: 5,
                },
                channel: {
                    count: 10,
                    window: 5,
                },
                auth: {
                    login: {
                        count: 5,
                        window: 60,
                    },
                    register: {
                        count: 2,
                        window: 60 * 60 * 12,
                    },
                },
            },
        },
    },
    security: {
        autoUpdate: true,
        requestSignature: crypto_1.default.randomBytes(32).toString("base64"),
        jwtSecret: crypto_1.default.randomBytes(256).toString("base64"),
        forwadedFor: null,
        // forwadedFor: "X-Forwarded-For" // nginx/reverse proxy
        // forwadedFor: "CF-Connecting-IP" // cloudflare:
        captcha: {
            enabled: false,
            service: null,
            sitekey: null,
            secret: null,
        },
        ipdataApiKey: "eca677b284b3bac29eb72f5e496aa9047f26543605efe99ff2ce35c9",
    },
    login: {
        requireCaptcha: false,
    },
    register: {
        email: {
            required: false,
            allowlist: false,
            blocklist: true,
            domains: [], // TODO: efficiently save domain blocklist in database
            // domains: fs.readFileSync(__dirname + "/blockedEmailDomains.txt", { encoding: "utf8" }).split("\n"),
        },
        dateOfBirth: {
            required: false,
            minimum: 13,
        },
        disabled: false,
        requireInvite: false,
        guestsRequireInvite: true,
        requireCaptcha: true,
        allowNewRegistration: true,
        allowMultipleAccounts: true,
        blockProxies: true,
        password: {
            required: false,
            minLength: 8,
            minNumbers: 2,
            minUpperCase: 2,
            minSymbols: 0,
        },
    },
    regions: {
        default: "fosscord",
        useDefaultAsOptimal: true,
        available: [
            {
                id: "fosscord",
                name: "Fosscord",
                endpoint: "127.0.0.1:3004",
                vip: false,
                custom: false,
                deprecated: false,
            },
        ],
    },
    guild: {
        showAllGuildsInDiscovery: false,
        autoJoin: {
            enabled: true,
            canLeave: true,
            guilds: [],
        },
    },
    gif: {
        enabled: true,
        provider: "tenor",
        apiKey: "LIVDSRZULELA",
    },
    rabbitmq: {
        host: null,
    },
    kafka: {
        brokers: null,
    },
};
//# sourceMappingURL=Config.js.map