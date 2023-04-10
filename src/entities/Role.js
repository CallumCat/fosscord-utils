"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const Guild_1 = require("./Guild");
let Role = class Role extends BaseClass_1.BaseClass {
    guild_id;
    guild;
    color;
    hoist;
    managed;
    mentionable;
    name;
    permissions;
    position;
    tags;
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((role) => role.guild)
], Role.prototype, "guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild, {
        onDelete: "CASCADE",
    })
], Role.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "color", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "hoist", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "managed", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "mentionable", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "name", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "permissions", void 0);
__decorate([
    typeorm_1.Column()
], Role.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", nullable: true })
], Role.prototype, "tags", void 0);
Role = __decorate([
    typeorm_1.Entity("roles")
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map