"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMember = exports.TeamMemberState = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const User_1 = require("./User");
var TeamMemberState;
(function (TeamMemberState) {
    TeamMemberState[TeamMemberState["INVITED"] = 1] = "INVITED";
    TeamMemberState[TeamMemberState["ACCEPTED"] = 2] = "ACCEPTED";
})(TeamMemberState = exports.TeamMemberState || (exports.TeamMemberState = {}));
let TeamMember = class TeamMember extends BaseClass_1.BaseClass {
    membership_state;
    permissions;
    team_id;
    team;
    user_id;
    user;
};
__decorate([
    typeorm_1.Column({ type: "int" })
], TeamMember.prototype, "membership_state", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array" })
], TeamMember.prototype, "permissions", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((member) => member.team)
], TeamMember.prototype, "team_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "team_id" }),
    typeorm_1.ManyToOne(() => require("./Team").Team, (team) => team.members, {
        onDelete: "CASCADE",
    })
], TeamMember.prototype, "team", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((member) => member.user)
], TeamMember.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], TeamMember.prototype, "user", void 0);
TeamMember = __decorate([
    typeorm_1.Entity("team_members")
], TeamMember);
exports.TeamMember = TeamMember;
//# sourceMappingURL=TeamMember.js.map