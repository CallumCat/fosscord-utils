"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ban = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const Guild_1 = require("./Guild");
const User_1 = require("./User");
let Ban = class Ban extends BaseClass_1.BaseClass {
    user_id;
    user;
    guild_id;
    guild;
    executor_id;
    executor;
    ip;
    reason;
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((ban) => ban.user)
], Ban.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Ban.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((ban) => ban.guild)
], Ban.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Ban.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((ban) => ban.executor)
], Ban.prototype, "executor_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "executor_id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Ban.prototype, "executor", void 0);
__decorate([
    typeorm_1.Column()
], Ban.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Ban.prototype, "reason", void 0);
Ban = __decorate([
    typeorm_1.Entity("bans")
], Ban);
exports.Ban = Ban;
//# sourceMappingURL=Ban.js.map