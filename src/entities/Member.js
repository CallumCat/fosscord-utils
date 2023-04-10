"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Member_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicMemberProjection = exports.Member = exports.MemberPrivateProjection = void 0;
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
const Guild_1 = require("./Guild");
const util_1 = require("../util");
const lambert_server_1 = require("lambert-server");
const Role_1 = require("./Role");
const BaseClass_1 = require("./BaseClass");
const _1 = require(".");
const Constants_1 = require("../util/Constants");
exports.MemberPrivateProjection = [
    "id",
    "guild",
    "guild_id",
    "deaf",
    "joined_at",
    "last_message_id",
    "mute",
    "nick",
    "pending",
    "premium_since",
    "roles",
    "settings",
    "user",
];
let Member = Member_1 = class Member extends BaseClass_1.BaseClassWithoutId {
    index;
    id;
    user;
    guild_id;
    guild;
    nick;
    roles;
    joined_at;
    premium_since;
    deaf;
    mute;
    pending;
    settings;
    last_message_id;
    // TODO: update
    // @Column({ type: "simple-json" })
    // read_state: ReadState;
    static async IsInGuildOrFail(user_id, guild_id) {
        if (await Member_1.count({ id: user_id, guild: { id: guild_id } }))
            return true;
        throw new lambert_server_1.HTTPError("You are not member of this guild", 403);
    }
    static async removeFromGuild(user_id, guild_id) {
        const guild = await Guild_1.Guild.findOneOrFail({ select: ["owner_id"], where: { id: guild_id } });
        if (guild.owner_id === user_id)
            throw new Error("The owner cannot be removed of the guild");
        const member = await Member_1.findOneOrFail({ where: { id: user_id, guild_id }, relations: ["user"] });
        // use promise all to execute all promises at the same time -> save time
        return Promise.all([
            Member_1.delete({
                id: user_id,
                guild_id,
            }),
            Guild_1.Guild.decrement({ id: guild_id }, "member_count", -1),
            util_1.emitEvent({
                event: "GUILD_DELETE",
                data: {
                    id: guild_id,
                },
                user_id: user_id,
            }),
            util_1.emitEvent({
                event: "GUILD_MEMBER_REMOVE",
                data: { guild_id, user: member.user },
                guild_id,
            }),
        ]);
    }
    static async addRole(user_id, guild_id, role_id) {
        const [member, role] = await Promise.all([
            // @ts-ignore
            Member_1.findOneOrFail({
                where: { id: user_id, guild_id },
                relations: ["user", "roles"],
                select: ["index", "roles.id"],
            }),
            Role_1.Role.findOneOrFail({ where: { id: role_id, guild_id }, select: ["id"] }),
        ]);
        member.roles.push(new Role_1.Role({ id: role_id }));
        await Promise.all([
            member.save(),
            util_1.emitEvent({
                event: "GUILD_MEMBER_UPDATE",
                data: {
                    guild_id,
                    user: member.user,
                    roles: member.roles.map((x) => x.id),
                },
                guild_id,
            }),
        ]);
    }
    static async removeRole(user_id, guild_id, role_id) {
        const [member] = await Promise.all([
            // @ts-ignore
            Member_1.findOneOrFail({
                where: { id: user_id, guild_id },
                relations: ["user", "roles"],
                select: ["roles.id", "index"],
            }),
            await Role_1.Role.findOneOrFail({ id: role_id, guild_id }),
        ]);
        member.roles = member.roles.filter((x) => x.id == role_id);
        await Promise.all([
            member.save(),
            util_1.emitEvent({
                event: "GUILD_MEMBER_UPDATE",
                data: {
                    guild_id,
                    user: member.user,
                    roles: member.roles.map((x) => x.id),
                },
                guild_id,
            }),
        ]);
    }
    static async changeNickname(user_id, guild_id, nickname) {
        const member = await Member_1.findOneOrFail({
            where: {
                id: user_id,
                guild_id,
            },
            relations: ["user"],
        });
        member.nick = nickname;
        await Promise.all([
            member.save(),
            util_1.emitEvent({
                event: "GUILD_MEMBER_UPDATE",
                data: {
                    guild_id,
                    user: member.user,
                    nick: nickname,
                },
                guild_id,
            }),
        ]);
    }
    static async addToGuild(user_id, guild_id) {
        const user = await User_1.User.getPublicUser(user_id);
        const isBanned = await _1.Ban.count({ where: { guild_id, user_id } });
        if (isBanned) {
            throw Constants_1.DiscordApiErrors.USER_BANNED;
        }
        const { maxGuilds } = util_1.Config.get().limits.user;
        const guild_count = await Member_1.count({ id: user_id });
        if (guild_count >= maxGuilds) {
            throw new lambert_server_1.HTTPError(`You are at the ${maxGuilds} server limit.`, 403);
        }
        const guild = await Guild_1.Guild.findOneOrFail({
            where: {
                id: guild_id,
            },
            relations: _1.PublicGuildRelations,
        });
        if (await Member_1.count({ id: user.id, guild: { id: guild_id } }))
            throw new lambert_server_1.HTTPError("You are already a member of this guild", 400);
        const member = {
            id: user_id,
            guild_id,
            nick: undefined,
            roles: [guild_id],
            joined_at: new Date(),
            premium_since: undefined,
            deaf: false,
            mute: false,
            pending: false,
        };
        await Promise.all([
            new Member_1({
                ...member,
                roles: [new Role_1.Role({ id: guild_id })],
                // read_state: {},
                settings: {
                    channel_overrides: [],
                    message_notifications: 0,
                    mobile_push: true,
                    muted: false,
                    suppress_everyone: false,
                    suppress_roles: false,
                    version: 0,
                },
                // Member.save is needed because else the roles relations wouldn't be updated
            }).save(),
            Guild_1.Guild.increment({ id: guild_id }, "member_count", 1),
            util_1.emitEvent({
                event: "GUILD_MEMBER_ADD",
                data: {
                    ...member,
                    user,
                    guild_id,
                },
                guild_id,
            }),
            util_1.emitEvent({
                event: "GUILD_CREATE",
                data: {
                    ...guild,
                    members: [...guild.members, { ...member, user }],
                    member_count: (guild.member_count || 0) + 1,
                    guild_hashes: {},
                    guild_scheduled_events: [],
                    joined_at: member.joined_at,
                    presences: [],
                    stage_instances: [],
                    threads: [],
                },
                user_id,
            }),
        ]);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Member.prototype, "index", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.RelationId((member) => member.user)
], Member.prototype, "id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Member.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.RelationId((member) => member.guild)
], Member.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Member.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Member.prototype, "nick", void 0);
__decorate([
    typeorm_1.JoinTable({
        name: "member_roles",
        joinColumn: { name: "index", referencedColumnName: "index" },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id",
        },
    }),
    typeorm_1.ManyToMany(() => Role_1.Role, { cascade: true })
], Member.prototype, "roles", void 0);
__decorate([
    typeorm_1.Column()
], Member.prototype, "joined_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Member.prototype, "premium_since", void 0);
__decorate([
    typeorm_1.Column()
], Member.prototype, "deaf", void 0);
__decorate([
    typeorm_1.Column()
], Member.prototype, "mute", void 0);
__decorate([
    typeorm_1.Column()
], Member.prototype, "pending", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", select: false })
], Member.prototype, "settings", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Member.prototype, "last_message_id", void 0);
Member = Member_1 = __decorate([
    typeorm_1.Entity("members"),
    typeorm_1.Index(["id", "guild_id"], { unique: true })
], Member);
exports.Member = Member;
exports.PublicMemberProjection = [
    "id",
    "guild_id",
    "nick",
    "roles",
    "joined_at",
    "pending",
    "deaf",
    "mute",
    "premium_since",
];
//# sourceMappingURL=Member.js.map