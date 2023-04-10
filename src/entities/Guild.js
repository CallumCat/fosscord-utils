"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Guild_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = exports.PublicGuildRelations = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const Ban_1 = require("./Ban");
const BaseClass_1 = require("./BaseClass");
const Channel_1 = require("./Channel");
const Emoji_1 = require("./Emoji");
const Invite_1 = require("./Invite");
const Member_1 = require("./Member");
const Role_1 = require("./Role");
const Sticker_1 = require("./Sticker");
const Template_1 = require("./Template");
const User_1 = require("./User");
const VoiceState_1 = require("./VoiceState");
const Webhook_1 = require("./Webhook");
// TODO: application_command_count, application_command_counts: {1: 0, 2: 0, 3: 0}
// TODO: guild_scheduled_events
// TODO: stage_instances
// TODO: threads
// TODO: categories:
// [{
// 	"id": 16,
// 	"name": {
// 		"default": "Anime & Manga",
// 		"localizations": {
// 			"de": "Anime & Manga",
// 			"fr": "Anim\u00e9s et mangas",
// 			"ru": "\u0410\u043d\u0438\u043c\u0435 \u0438 \u043c\u0430\u043d\u0433\u0430"
// 		}
// 	},
// 	"is_primary": false
// }]
// TODO:
//  primary_category :{
// 	id: 1,
// 	name: {
// 		default: "Gaming",
// 		localizations: { de: "Gaming", fr: "Gaming", ru: "\u0418\u0433\u0440\u044b" },
// 		is_primary: true,
// 	},
// };
// TODO:
// "keywords": [
// 		"Genshin Impact",
// 		"Paimon",
// 		"Honkai Impact",
// 		"ARPG",
// 		"Open-World",
// 		"Waifu",
// 		"Anime",
// 		"Genshin",
// 		"miHoYo",
// 		"Gacha"
// 	],
exports.PublicGuildRelations = [
    "channels",
    "emojis",
    "members",
    "roles",
    "stickers",
    "voice_states",
    "members.user",
];
let Guild = Guild_1 = class Guild extends BaseClass_1.BaseClass {
    afk_channel_id;
    afk_channel;
    afk_timeout;
    // * commented out -> use owner instead
    // application id of the guild creator if it is bot-created
    // @Column({ nullable: true })
    // application?: string;
    bans;
    banner;
    default_message_notifications;
    description;
    discovery_splash;
    explicit_content_filter;
    features; //TODO use enum
    //TODO: https://discord.com/developers/docs/resources/guild#guild-object-guild-features
    icon;
    large;
    max_members; // e.g. default 100.000
    max_presences;
    max_video_channel_users; // ? default: 25, is this max 25 streaming or watching
    member_count;
    presence_count; // users online
    members;
    roles;
    channels;
    template_id;
    template;
    emojis;
    stickers;
    invites;
    voice_states;
    webhooks;
    mfa_level;
    name;
    owner_id;
    owner;
    preferred_locale; // only community guilds can choose this
    premium_subscription_count;
    premium_tier; // nitro boost level
    public_updates_channel_id;
    public_updates_channel;
    rules_channel_id;
    rules_channel;
    region;
    splash;
    system_channel_id;
    system_channel;
    system_channel_flags;
    unavailable;
    verification_level;
    welcome_screen;
    widget_channel_id;
    widget_channel;
    widget_enabled;
    nsfw_level;
    nsfw;
    static async createGuild(body) {
        const guild_id = __1.Snowflake.generate();
        const guild = await new Guild_1({
            name: body.name || "Fosscord",
            icon: await __1.handleFile(`/icons/${guild_id}`, body.icon),
            region: __1.Config.get().regions.default,
            owner_id: body.owner_id,
            afk_timeout: 300,
            default_message_notifications: 0,
            explicit_content_filter: 0,
            features: [],
            id: guild_id,
            max_members: 250000,
            max_presences: 250000,
            max_video_channel_users: 25,
            presence_count: 0,
            member_count: 0,
            mfa_level: 0,
            preferred_locale: "en-US",
            premium_subscription_count: 0,
            premium_tier: 0,
            system_channel_flags: 0,
            unavailable: false,
            nsfw: false,
            nsfw_level: 0,
            verification_level: 0,
            welcome_screen: {
                enabled: false,
                description: "No description",
                welcome_channels: [],
            },
            widget_enabled: false,
        }).save();
        // we have to create the role _after_ the guild because else we would get a "SQLITE_CONSTRAINT: FOREIGN KEY constraint failed" error
        await new Role_1.Role({
            id: guild_id,
            guild_id: guild_id,
            color: 0,
            hoist: false,
            managed: false,
            mentionable: false,
            name: "@everyone",
            permissions: String("2251804225"),
            position: 0,
        }).save();
        if (!body.channels || !body.channels.length)
            body.channels = [{ id: "01", type: 0, name: "general" }];
        const ids = new Map();
        body.channels.forEach((x) => {
            if (x.id) {
                ids.set(x.id, __1.Snowflake.generate());
            }
        });
        for (const channel of body.channels?.sort((a, b) => (a.parent_id ? 1 : -1))) {
            var id = ids.get(channel.id) || __1.Snowflake.generate();
            // TODO: should we abort if parent_id is a category? (to disallow sub category channels)
            var parent_id = ids.get(channel.parent_id);
            await Channel_1.Channel.createChannel({ ...channel, guild_id, id, parent_id }, body.owner_id, {
                keepId: true,
                skipExistsCheck: true,
                skipPermissionCheck: true,
                skipEventEmit: true,
            });
        }
        return guild;
    }
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.afk_channel)
], Guild.prototype, "afk_channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "afk_channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel)
], Guild.prototype, "afk_channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "afk_timeout", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "ban_ids" }),
    typeorm_1.OneToMany(() => Ban_1.Ban, (ban) => ban.guild, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Guild.prototype, "bans", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "banner", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "default_message_notifications", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "discovery_splash", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "explicit_content_filter", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array" })
], Guild.prototype, "features", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "large", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "max_members", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "max_presences", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "max_video_channel_users", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "member_count", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "presence_count", void 0);
__decorate([
    typeorm_1.OneToMany(() => Member_1.Member, (member) => member.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "members", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "role_ids" }),
    typeorm_1.OneToMany(() => Role_1.Role, (role) => role.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "roles", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "channel_ids" }),
    typeorm_1.OneToMany(() => Channel_1.Channel, (channel) => channel.guild, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Guild.prototype, "channels", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.template)
], Guild.prototype, "template_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "template_id", referencedColumnName: "id" }),
    typeorm_1.ManyToOne(() => Template_1.Template)
], Guild.prototype, "template", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "emoji_ids" }),
    typeorm_1.OneToMany(() => Emoji_1.Emoji, (emoji) => emoji.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "emojis", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "sticker_ids" }),
    typeorm_1.OneToMany(() => Sticker_1.Sticker, (sticker) => sticker.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "stickers", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "invite_ids" }),
    typeorm_1.OneToMany(() => Invite_1.Invite, (invite) => invite.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "invites", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "voice_state_ids" }),
    typeorm_1.OneToMany(() => VoiceState_1.VoiceState, (voicestate) => voicestate.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "voice_states", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "webhook_ids" }),
    typeorm_1.OneToMany(() => Webhook_1.Webhook, (webhook) => webhook.guild, {
        cascade: true,
        orphanedRowAction: "delete",
        onDelete: "CASCADE",
    })
], Guild.prototype, "webhooks", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "mfa_level", void 0);
__decorate([
    typeorm_1.Column()
], Guild.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.owner)
], Guild.prototype, "owner_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "owner_id", referencedColumnName: "id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Guild.prototype, "owner", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "preferred_locale", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "premium_subscription_count", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "premium_tier", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.public_updates_channel)
], Guild.prototype, "public_updates_channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "public_updates_channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel)
], Guild.prototype, "public_updates_channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.rules_channel)
], Guild.prototype, "rules_channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "rules_channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel)
], Guild.prototype, "rules_channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "region", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "splash", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.system_channel)
], Guild.prototype, "system_channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "system_channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel)
], Guild.prototype, "system_channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "system_channel_flags", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "unavailable", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "verification_level", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json" })
], Guild.prototype, "welcome_screen", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((guild) => guild.widget_channel)
], Guild.prototype, "widget_channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "widget_channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel)
], Guild.prototype, "widget_channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "widget_enabled", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "nsfw_level", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Guild.prototype, "nsfw", void 0);
Guild = Guild_1 = __decorate([
    typeorm_1.Entity("guilds")
], Guild);
exports.Guild = Guild;
//# sourceMappingURL=Guild.js.map