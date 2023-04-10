"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceState = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const Channel_1 = require("./Channel");
const Guild_1 = require("./Guild");
const User_1 = require("./User");
//https://gist.github.com/vassjozsef/e482c65df6ee1facaace8b3c9ff66145#file-voice_state-ex
let VoiceState = class VoiceState extends BaseClass_1.BaseClass {
    guild_id;
    guild;
    channel_id;
    channel;
    user_id;
    user;
    // @JoinColumn([{ name: "user_id", referencedColumnName: "id" },{ name: "guild_id", referencedColumnName: "guild_id" }])
    // @ManyToOne(() => Member, {
    // 	onDelete: "CASCADE",
    // })
    //TODO find a way to make it work without breaking Guild.voice_states
    member;
    session_id;
    token;
    deaf;
    mute;
    self_deaf;
    self_mute;
    self_stream;
    self_video;
    suppress; // whether this user is muted by the current user
    request_to_speak_timestamp;
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((voice_state) => voice_state.guild)
], VoiceState.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], VoiceState.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((voice_state) => voice_state.channel)
], VoiceState.prototype, "channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "channel_id" }),
    typeorm_1.ManyToOne(() => Channel_1.Channel, {
        onDelete: "CASCADE",
    })
], VoiceState.prototype, "channel", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((voice_state) => voice_state.user)
], VoiceState.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], VoiceState.prototype, "user", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "session_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], VoiceState.prototype, "token", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "deaf", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "mute", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "self_deaf", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "self_mute", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], VoiceState.prototype, "self_stream", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "self_video", void 0);
__decorate([
    typeorm_1.Column()
], VoiceState.prototype, "suppress", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null })
], VoiceState.prototype, "request_to_speak_timestamp", void 0);
VoiceState = __decorate([
    typeorm_1.Entity("voice_states")
], VoiceState);
exports.VoiceState = VoiceState;
//# sourceMappingURL=VoiceState.js.map