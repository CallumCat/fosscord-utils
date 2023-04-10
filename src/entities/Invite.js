"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Invite_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invite = exports.PublicInviteRelation = void 0;
const typeorm_1 = require("typeorm");
const Member_1 = require("./Member");
const BaseClass_1 = require("./BaseClass");
const Channel_1 = require("./Channel");
const Guild_1 = require("./Guild");
const User_1 = require("./User");
exports.PublicInviteRelation = ["inviter", "guild", "channel"];
let Invite = Invite_1 = class Invite extends BaseClass_1.BaseClassWithoutId {
    code;
    temporary;
    uses;
    max_uses;
    max_age;
    created_at;
    expires_at;
    guild_id;
    guild;
    channel_id;
    channel;
    inviter_id;
    inviter;
    target_user_id;
    target_user; // could be used for "User specific invites" https://github.com/fosscord/fosscord/issues/62
    target_user_type;
    vanity_url;
    static async joinGuild(user_id, code) {
        const invite = await Invite_1.findOneOrFail({ code });
        if (invite.uses++ >= invite.max_uses && invite.max_uses !== 0)
            await Invite_1.delete({ code });
        else
            await invite.save();
        await Member_1.Member.addToGuild(user_id, invite.guild_id);
        return invite;
    }
};
__decorate([
    typeorm_1.PrimaryColumn()
], Invite.prototype, "code", void 0);
__decorate([
    typeorm_1.Column()
], Invite.prototype, "temporary", void 0);
__decorate([
    typeorm_1.Column()
], Invite.prototype, "uses", void 0);
__decorate([
    typeorm_1.Column()
], Invite.prototype, "max_uses", void 0);
__decorate([
    typeorm_1.Column()
], Invite.prototype, "max_age", void 0);
__decorate([
    typeorm_1.Column()
], Invite.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column()
], Invite.prototype, "expires_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((invite) => invite.guild)
], Invite.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Invite.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((invite) => invite.channel)
], Invite.prototype, "channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel, {
        onDelete: "CASCADE",
    })
], Invite.prototype, "channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((invite) => invite.inviter)
], Invite.prototype, "inviter_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "inviter_id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Invite.prototype, "inviter", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((invite) => invite.target_user)
], Invite.prototype, "target_user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "target_user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Invite.prototype, "target_user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Invite.prototype, "target_user_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Invite.prototype, "vanity_url", void 0);
Invite = Invite_1 = __decorate([
    typeorm_1.Entity("invites")
], Invite);
exports.Invite = Invite;
//# sourceMappingURL=Invite.js.map