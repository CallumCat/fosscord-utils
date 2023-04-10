"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhook = exports.WebhookType = void 0;
const typeorm_1 = require("typeorm");
const Application_1 = require("./Application");
const BaseClass_1 = require("./BaseClass");
const Channel_1 = require("./Channel");
const Guild_1 = require("./Guild");
const User_1 = require("./User");
var WebhookType;
(function (WebhookType) {
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
})(WebhookType = exports.WebhookType || (exports.WebhookType = {}));
let Webhook = class Webhook extends BaseClass_1.BaseClass {
    type;
    name;
    avatar;
    token;
    guild_id;
    guild;
    channel_id;
    channel;
    application_id;
    application;
    user_id;
    user;
    source_guild_id;
    source_guild;
};
__decorate([
    typeorm_1.Column({ type: "int" })
], Webhook.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Webhook.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Webhook.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Webhook.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((webhook) => webhook.guild)
], Webhook.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Webhook.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((webhook) => webhook.channel)
], Webhook.prototype, "channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel, {
        onDelete: "CASCADE",
    })
], Webhook.prototype, "channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((webhook) => webhook.application)
], Webhook.prototype, "application_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "application_id" }),
    typeorm_1.ManyToOne(() => Application_1.Application, {
        onDelete: "CASCADE",
    })
], Webhook.prototype, "application", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((webhook) => webhook.user)
], Webhook.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Webhook.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((webhook) => webhook.guild)
], Webhook.prototype, "source_guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "source_guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Webhook.prototype, "source_guild", void 0);
Webhook = __decorate([
    typeorm_1.Entity("webhooks")
], Webhook);
exports.Webhook = Webhook;
//# sourceMappingURL=Webhook.js.map