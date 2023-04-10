"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const TeamMember_1 = require("./TeamMember");
const User_1 = require("./User");
let Team = class Team extends BaseClass_1.BaseClass {
    icon;
    members;
    name;
    owner_user_id;
    owner_user;
};
__decorate([
    typeorm_1.Column({ nullable: true })
], Team.prototype, "icon", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "member_ids" }),
    typeorm_1.OneToMany(() => TeamMember_1.TeamMember, (member) => member.team, {
        orphanedRowAction: "delete",
    })
], Team.prototype, "members", void 0);
__decorate([
    typeorm_1.Column()
], Team.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((team) => team.owner_user)
], Team.prototype, "owner_user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "owner_user_id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Team.prototype, "owner_user", void 0);
Team = __decorate([
    typeorm_1.Entity("teams")
], Team);
exports.Team = Team;
//# sourceMappingURL=Team.js.map