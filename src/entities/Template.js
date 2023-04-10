"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const Guild_1 = require("./Guild");
const User_1 = require("./User");
let Template = class Template extends BaseClass_1.BaseClass {
    code;
    name;
    description;
    usage_count;
    creator_id;
    creator;
    created_at;
    updated_at;
    source_guild_id;
    source_guild;
    serialized_source_guild;
};
__decorate([
    typeorm_1.Column({ unique: true })
], Template.prototype, "code", void 0);
__decorate([
    typeorm_1.Column()
], Template.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Template.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Template.prototype, "usage_count", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((template) => template.creator)
], Template.prototype, "creator_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "creator_id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Template.prototype, "creator", void 0);
__decorate([
    typeorm_1.Column()
], Template.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column()
], Template.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((template) => template.source_guild)
], Template.prototype, "source_guild_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "source_guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild)
], Template.prototype, "source_guild", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json" })
], Template.prototype, "serialized_source_guild", void 0);
Template = __decorate([
    typeorm_1.Entity("templates")
], Template);
exports.Template = Template;
//# sourceMappingURL=Template.js.map