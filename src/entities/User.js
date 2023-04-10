"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFlags = exports.CUSTOM_USER_FLAG_OFFSET = exports.defaultSettings = exports.User = exports.PrivateUserProjection = exports.PublicUserProjection = exports.PrivateUserEnum = exports.PublicUserEnum = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const BitField_1 = require("../util/BitField");
const Relationship_1 = require("./Relationship");
const ConnectedAccount_1 = require("./ConnectedAccount");
const __1 = require("..");
const _1 = require(".");
var PublicUserEnum;
(function (PublicUserEnum) {
    PublicUserEnum[PublicUserEnum["username"] = 0] = "username";
    PublicUserEnum[PublicUserEnum["discriminator"] = 1] = "discriminator";
    PublicUserEnum[PublicUserEnum["id"] = 2] = "id";
    PublicUserEnum[PublicUserEnum["public_flags"] = 3] = "public_flags";
    PublicUserEnum[PublicUserEnum["avatar"] = 4] = "avatar";
    PublicUserEnum[PublicUserEnum["accent_color"] = 5] = "accent_color";
    PublicUserEnum[PublicUserEnum["banner"] = 6] = "banner";
    PublicUserEnum[PublicUserEnum["bio"] = 7] = "bio";
    PublicUserEnum[PublicUserEnum["bot"] = 8] = "bot";
})(PublicUserEnum = exports.PublicUserEnum || (exports.PublicUserEnum = {}));
var PrivateUserEnum;
(function (PrivateUserEnum) {
    PrivateUserEnum[PrivateUserEnum["flags"] = 0] = "flags";
    PrivateUserEnum[PrivateUserEnum["mfa_enabled"] = 1] = "mfa_enabled";
    PrivateUserEnum[PrivateUserEnum["email"] = 2] = "email";
    PrivateUserEnum[PrivateUserEnum["phone"] = 3] = "phone";
    PrivateUserEnum[PrivateUserEnum["verified"] = 4] = "verified";
    PrivateUserEnum[PrivateUserEnum["nsfw_allowed"] = 5] = "nsfw_allowed";
    PrivateUserEnum[PrivateUserEnum["premium"] = 6] = "premium";
    PrivateUserEnum[PrivateUserEnum["premium_type"] = 7] = "premium_type";
    PrivateUserEnum[PrivateUserEnum["disabled"] = 8] = "disabled";
    PrivateUserEnum[PrivateUserEnum["settings"] = 9] = "settings";
    // locale
})(PrivateUserEnum = exports.PrivateUserEnum || (exports.PrivateUserEnum = {}));
exports.PublicUserProjection = Object.values(PublicUserEnum).filter((x) => typeof x === "string");
exports.PrivateUserProjection = [
    ...exports.PublicUserProjection,
    ...Object.values(PrivateUserEnum).filter((x) => typeof x === "string"),
];
// TODO: add purchased_flags, premium_usage_flags
let User = User_1 = class User extends BaseClass_1.BaseClass {
    username; // username max length 32, min 2 (should be configurable)
    discriminator; // #0001 4 digit long string from #0001 - #9999
    setDiscriminator(val) {
        const number = Number(val);
        if (isNaN(number))
            throw new Error("invalid discriminator");
        if (number <= 0 || number > 10000)
            throw new Error("discriminator must be between 1 and 9999");
        this.discriminator = val.toString().padStart(4, "0");
    }
    avatar; // hash of the user avatar
    accent_color; // banner color of user
    banner; // hash of the user banner
    phone; // phone number of the user
    desktop; // if the user has desktop app installed
    mobile; // if the user has mobile app installed
    premium; // if user bought nitro
    premium_type; // nitro level
    bot; // if user is bot
    bio; // short description of the user (max 190 chars -> should be configurable)
    system; // shouldn't be used, the api sents this field type true, if the generated message comes from a system generated author
    nsfw_allowed; // if the user is older than 18 (resp. Config)
    mfa_enabled; // if multi factor authentication is enabled
    created_at; // registration date
    verified; // if the user is offically verified
    disabled; // if the account is disabled
    deleted; // if the user was deleted
    email; // email of the user
    flags; // UserFlags
    public_flags;
    rights; // Rights
    sessions;
    relationships;
    connected_accounts;
    data;
    fingerprints; // array of fingerprints -> used to prevent multiple accounts
    settings;
    toPublicUser() {
        const user = {};
        exports.PublicUserProjection.forEach((x) => {
            user[x] = this[x];
        });
        return user;
    }
    static async getPublicUser(user_id, opts) {
        return await User_1.findOneOrFail({ id: user_id }, {
            ...opts,
            select: [...exports.PublicUserProjection, ...(opts?.select || [])],
        });
    }
    static async register({ email, username, password, date_of_birth, req, }) {
        // trim special uf8 control characters -> Backspace, Newline, ...
        username = __1.trimSpecial(username);
        // discriminator will be randomly generated
        let discriminator = "";
        let exists;
        // randomly generates a discriminator between 1 and 9999 and checks max five times if it already exists
        // if it all five times already exists, abort with USERNAME_TOO_MANY_USERS error
        // else just continue
        // TODO: is there any better way to generate a random discriminator only once, without checking if it already exists in the database?
        for (let tries = 0; tries < 5; tries++) {
            discriminator = Math.randomIntBetween(1, 9999).toString().padStart(4, "0");
            exists = await User_1.findOne({ where: { discriminator, username: username }, select: ["id"] });
            if (!exists)
                break;
        }
        if (exists) {
            throw __1.FieldErrors({
                username: {
                    code: "USERNAME_TOO_MANY_USERS",
                    message: req.t("auth:register.USERNAME_TOO_MANY_USERS"),
                },
            });
        }
        // TODO: save date_of_birth
        // appearently discord doesn't save the date of birth and just calculate if nsfw is allowed
        // if nsfw_allowed is null/undefined it'll require date_of_birth to set it to true/false
        const language = req.language === "en" ? "en-US" : req.language || "en-US";
        const user = new User_1({
            created_at: new Date(),
            username: username,
            discriminator,
            id: __1.Snowflake.generate(),
            bot: false,
            system: false,
            desktop: false,
            mobile: false,
            premium: true,
            premium_type: 2,
            bio: "",
            mfa_enabled: false,
            verified: true,
            disabled: false,
            deleted: false,
            email: email,
            rights: "0",
            nsfw_allowed: true,
            public_flags: "0",
            flags: "0",
            data: {
                hash: password,
                valid_tokens_since: new Date(),
            },
            settings: { ...exports.defaultSettings, locale: language },
            fingerprints: [],
        });
        await user.save();
        setImmediate(async () => {
            if (__1.Config.get().guild.autoJoin.enabled) {
                for (const guild of __1.Config.get().guild.autoJoin.guilds || []) {
                    await _1.Member.addToGuild(user.id, guild).catch((e) => { });
                }
            }
        });
        return user;
    }
};
__decorate([
    typeorm_1.Column()
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "discriminator", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], User.prototype, "accent_color", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], User.prototype, "banner", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, select: false })
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], User.prototype, "desktop", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], User.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "premium", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "premium_type", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "bot", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "system", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], User.prototype, "nsfw_allowed", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], User.prototype, "mfa_enabled", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], User.prototype, "verified", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "disabled", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "deleted", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, select: false })
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "flags", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "public_flags", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "rights", void 0);
__decorate([
    typeorm_1.OneToMany(() => _1.Session, (session) => session.user)
], User.prototype, "sessions", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "relationship_ids" }),
    typeorm_1.OneToMany(() => Relationship_1.Relationship, (relationship) => relationship.from, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], User.prototype, "relationships", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "connected_account_ids" }),
    typeorm_1.OneToMany(() => ConnectedAccount_1.ConnectedAccount, (account) => account.user, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], User.prototype, "connected_accounts", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", select: false })
], User.prototype, "data", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", select: false })
], User.prototype, "fingerprints", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", select: false })
], User.prototype, "settings", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity("users")
], User);
exports.User = User;
exports.defaultSettings = {
    afk_timeout: 300,
    allow_accessibility_detection: true,
    animate_emoji: true,
    animate_stickers: 0,
    contact_sync_enabled: false,
    convert_emoticons: false,
    custom_status: {
        emoji_id: undefined,
        emoji_name: undefined,
        expires_at: undefined,
        text: undefined,
    },
    default_guilds_restricted: false,
    detect_platform_accounts: true,
    developer_mode: false,
    disable_games_tab: false,
    enable_tts_command: true,
    explicit_content_filter: 0,
    friend_source_flags: { all: true },
    gateway_connected: false,
    gif_auto_play: true,
    guild_folders: [],
    guild_positions: [],
    inline_attachment_media: true,
    inline_embed_media: true,
    locale: "en-US",
    message_display_compact: false,
    native_phone_integration_enabled: true,
    render_embeds: true,
    render_reactions: true,
    restricted_guilds: [],
    show_current_game: true,
    status: "online",
    stream_notifications_enabled: true,
    theme: "dark",
    timezone_offset: 0,
    // timezone_offset: // TODO: timezone from request
};
exports.CUSTOM_USER_FLAG_OFFSET = BigInt(1) << BigInt(32);
class UserFlags extends BitField_1.BitField {
    static FLAGS = {
        DISCORD_EMPLOYEE: BigInt(1) << BigInt(0),
        PARTNERED_SERVER_OWNER: BigInt(1) << BigInt(1),
        HYPESQUAD_EVENTS: BigInt(1) << BigInt(2),
        BUGHUNTER_LEVEL_1: BigInt(1) << BigInt(3),
        MFA_SMS: BigInt(1) << BigInt(4),
        PREMIUM_PROMO_DISMISSED: BigInt(1) << BigInt(5),
        HOUSE_BRAVERY: BigInt(1) << BigInt(6),
        HOUSE_BRILLIANCE: BigInt(1) << BigInt(7),
        HOUSE_BALANCE: BigInt(1) << BigInt(8),
        EARLY_SUPPORTER: BigInt(1) << BigInt(9),
        TEAM_USER: BigInt(1) << BigInt(10),
        TRUST_AND_SAFETY: BigInt(1) << BigInt(11),
        SYSTEM: BigInt(1) << BigInt(12),
        HAS_UNREAD_URGENT_MESSAGES: BigInt(1) << BigInt(13),
        BUGHUNTER_LEVEL_2: BigInt(1) << BigInt(14),
        UNDERAGE_DELETED: BigInt(1) << BigInt(15),
        VERIFIED_BOT: BigInt(1) << BigInt(16),
        EARLY_VERIFIED_BOT_DEVELOPER: BigInt(1) << BigInt(17),
        CERTIFIED_MODERATOR: BigInt(1) << BigInt(18),
        BOT_HTTP_INTERACTIONS: BigInt(1) << BigInt(19),
    };
}
exports.UserFlags = UserFlags;
//# sourceMappingURL=User.js.map