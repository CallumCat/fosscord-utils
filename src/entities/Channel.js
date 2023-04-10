"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Channel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelPermissionOverwriteType = exports.Channel = exports.ChannelType = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const Guild_1 = require("./Guild");
const User_1 = require("./User");
const lambert_server_1 = require("lambert-server");
const util_1 = require("../util");
const Recipient_1 = require("./Recipient");
const Message_1 = require("./Message");
const ReadState_1 = require("./ReadState");
const Invite_1 = require("./Invite");
const VoiceState_1 = require("./VoiceState");
const Webhook_1 = require("./Webhook");
const dtos_1 = require("../dtos");
var ChannelType;
(function (ChannelType) {
    ChannelType[ChannelType["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelType[ChannelType["DM"] = 1] = "DM";
    ChannelType[ChannelType["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelType[ChannelType["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelType[ChannelType["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelType[ChannelType["GUILD_NEWS"] = 5] = "GUILD_NEWS";
    ChannelType[ChannelType["GUILD_STORE"] = 6] = "GUILD_STORE";
    // TODO: what are channel types between 7-9?
    ChannelType[ChannelType["GUILD_NEWS_THREAD"] = 10] = "GUILD_NEWS_THREAD";
    ChannelType[ChannelType["GUILD_PUBLIC_THREAD"] = 11] = "GUILD_PUBLIC_THREAD";
    ChannelType[ChannelType["GUILD_PRIVATE_THREAD"] = 12] = "GUILD_PRIVATE_THREAD";
    ChannelType[ChannelType["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
let Channel = Channel_1 = class Channel extends BaseClass_1.BaseClass {
    created_at;
    name;
    icon;
    type;
    recipients;
    last_message_id;
    guild_id;
    guild;
    parent_id;
    parent;
    // only for group dms
    owner_id;
    owner;
    last_pin_timestamp;
    default_auto_archive_duration;
    position;
    permission_overwrites;
    video_quality_mode;
    bitrate;
    user_limit;
    nsfw;
    rate_limit_per_user;
    topic;
    invites;
    messages;
    voice_states;
    read_states;
    webhooks;
    // TODO: DM channel
    static async createChannel(channel, user_id = "0", opts) {
        if (!opts?.skipPermissionCheck) {
            // Always check if user has permission first
            const permissions = await util_1.getPermission(user_id, channel.guild_id);
            permissions.hasThrow("MANAGE_CHANNELS");
        }
        switch (channel.type) {
            case ChannelType.GUILD_TEXT:
            case ChannelType.GUILD_VOICE:
                if (channel.parent_id && !opts?.skipExistsCheck) {
                    const exists = await Channel_1.findOneOrFail({ id: channel.parent_id });
                    if (!exists)
                        throw new lambert_server_1.HTTPError("Parent id channel doesn't exist", 400);
                    if (exists.guild_id !== channel.guild_id)
                        throw new lambert_server_1.HTTPError("The category channel needs to be in the guild");
                }
                break;
            case ChannelType.GUILD_CATEGORY:
                break;
            case ChannelType.DM:
            case ChannelType.GROUP_DM:
                throw new lambert_server_1.HTTPError("You can't create a dm channel in a guild");
            // TODO: check if guild is community server
            case ChannelType.GUILD_STORE:
            case ChannelType.GUILD_NEWS:
            default:
                throw new lambert_server_1.HTTPError("Not yet supported");
        }
        if (!channel.permission_overwrites)
            channel.permission_overwrites = [];
        // TODO: auto generate position
        channel = {
            ...channel,
            ...(!opts?.keepId && { id: util_1.Snowflake.generate() }),
            created_at: new Date(),
            position: channel.position || 0,
        };
        await Promise.all([
            new Channel_1(channel).save(),
            !opts?.skipEventEmit
                ? util_1.emitEvent({
                    event: "CHANNEL_CREATE",
                    data: channel,
                    guild_id: channel.guild_id,
                })
                : Promise.resolve(),
        ]);
        return channel;
    }
    static async createDMChannel(recipients, creator_user_id, name) {
        recipients = recipients.unique().filter((x) => x !== creator_user_id);
        const otherRecipientsUsers = await User_1.User.find({ where: recipients.map((x) => ({ id: x })), select: ["id"] });
        // TODO: check config for max number of recipients
        if (otherRecipientsUsers.length !== recipients.length) {
            throw new lambert_server_1.HTTPError("Recipient/s not found");
        }
        const type = recipients.length === 1 ? ChannelType.DM : ChannelType.GROUP_DM;
        let channel = null;
        const channelRecipients = [...recipients, creator_user_id];
        const userRecipients = await Recipient_1.Recipient.find({
            where: { user_id: creator_user_id },
            relations: ["channel", "channel.recipients"],
        });
        for (let ur of userRecipients) {
            let re = ur.channel.recipients.map((r) => r.user_id);
            if (re.length === channelRecipients.length) {
                if (util_1.containsAll(re, channelRecipients)) {
                    if (channel == null) {
                        channel = ur.channel;
                        await ur.assign({ closed: false }).save();
                    }
                }
            }
        }
        if (channel == null) {
            name = util_1.trimSpecial(name);
            channel = await new Channel_1({
                name,
                type,
                owner_id: type === ChannelType.DM ? undefined : creator_user_id,
                created_at: new Date(),
                last_message_id: null,
                recipients: channelRecipients.map((x) => new Recipient_1.Recipient({ user_id: x, closed: !(type === ChannelType.GROUP_DM || x === creator_user_id) })),
            }).save();
        }
        const channel_dto = await dtos_1.DmChannelDTO.from(channel);
        if (type === ChannelType.GROUP_DM) {
            for (let recipient of channel.recipients) {
                await util_1.emitEvent({
                    event: "CHANNEL_CREATE",
                    data: channel_dto.excludedRecipients([recipient.user_id]),
                    user_id: recipient.user_id,
                });
            }
        }
        else {
            await util_1.emitEvent({ event: "CHANNEL_CREATE", data: channel_dto, user_id: creator_user_id });
        }
        return channel_dto.excludedRecipients([creator_user_id]);
    }
    static async removeRecipientFromChannel(channel, user_id) {
        await Recipient_1.Recipient.delete({ channel_id: channel.id, user_id: user_id });
        channel.recipients = channel.recipients?.filter((r) => r.user_id !== user_id);
        if (channel.recipients?.length === 0) {
            await Channel_1.deleteChannel(channel);
            await util_1.emitEvent({
                event: "CHANNEL_DELETE",
                data: await dtos_1.DmChannelDTO.from(channel, [user_id]),
                user_id: user_id,
            });
            return;
        }
        await util_1.emitEvent({
            event: "CHANNEL_DELETE",
            data: await dtos_1.DmChannelDTO.from(channel, [user_id]),
            user_id: user_id,
        });
        //If the owner leave we make the first recipient in the list the new owner
        if (channel.owner_id === user_id) {
            channel.owner_id = channel.recipients.find((r) => r.user_id !== user_id).user_id; //Is there a criteria to choose the new owner?
            await util_1.emitEvent({
                event: "CHANNEL_UPDATE",
                data: await dtos_1.DmChannelDTO.from(channel, [user_id]),
                channel_id: channel.id,
            });
        }
        await channel.save();
        await util_1.emitEvent({
            event: "CHANNEL_RECIPIENT_REMOVE",
            data: {
                channel_id: channel.id,
                user: await User_1.User.findOneOrFail({ where: { id: user_id }, select: User_1.PublicUserProjection }),
            },
            channel_id: channel.id,
        });
    }
    static async deleteChannel(channel) {
        await Message_1.Message.delete({ channel_id: channel.id }); //TODO we should also delete the attachments from the cdn but to do that we need to move cdn.ts in util
        //TODO before deleting the channel we should check and delete other relations
        await Channel_1.delete({ id: channel.id });
    }
    isDm() {
        return this.type === ChannelType.DM || this.type === ChannelType.GROUP_DM;
    }
};
__decorate([
    typeorm_1.Column()
], Channel.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true })
], Channel.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column({ type: "int" })
], Channel.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany(() => Recipient_1.Recipient, (recipient) => recipient.channel, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Channel.prototype, "recipients", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "last_message_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((channel) => channel.guild)
], Channel.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Channel.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((channel) => channel.parent)
], Channel.prototype, "parent_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "parent_id" }),
    typeorm_1.ManyToOne(() => Channel_1)
], Channel.prototype, "parent", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((channel) => channel.owner)
], Channel.prototype, "owner_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "owner_id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Channel.prototype, "owner", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "last_pin_timestamp", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "default_auto_archive_duration", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", nullable: true })
], Channel.prototype, "permission_overwrites", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "video_quality_mode", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "bitrate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "user_limit", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "nsfw", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "rate_limit_per_user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Channel.prototype, "topic", void 0);
__decorate([
    typeorm_1.OneToMany(() => Invite_1.Invite, (invite) => invite.channel, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Channel.prototype, "invites", void 0);
__decorate([
    typeorm_1.OneToMany(() => Message_1.Message, (message) => message.channel, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Channel.prototype, "messages", void 0);
__decorate([
    typeorm_1.OneToMany(() => VoiceState_1.VoiceState, (voice_state) => voice_state.channel, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Channel.prototype, "voice_states", void 0);
__decorate([
    typeorm_1.OneToMany(() => ReadState_1.ReadState, (read_state) => read_state.channel, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Channel.prototype, "read_states", void 0);
__decorate([
    typeorm_1.OneToMany(() => Webhook_1.Webhook, (webhook) => webhook.channel, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], Channel.prototype, "webhooks", void 0);
Channel = Channel_1 = __decorate([
    typeorm_1.Entity("channels")
], Channel);
exports.Channel = Channel;
var ChannelPermissionOverwriteType;
(function (ChannelPermissionOverwriteType) {
    ChannelPermissionOverwriteType[ChannelPermissionOverwriteType["role"] = 0] = "role";
    ChannelPermissionOverwriteType[ChannelPermissionOverwriteType["member"] = 1] = "member";
})(ChannelPermissionOverwriteType = exports.ChannelPermissionOverwriteType || (exports.ChannelPermissionOverwriteType = {}));
//# sourceMappingURL=Channel.js.map