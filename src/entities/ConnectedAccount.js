"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedAccount = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const User_1 = require("./User");
let ConnectedAccount = class ConnectedAccount extends BaseClass_1.BaseClass {
    user_id;
    user;
    access_token;
    friend_sync;
    name;
    revoked;
    show_activity;
    type;
    verifie;
    visibility;
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((account) => account.user)
], ConnectedAccount.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], ConnectedAccount.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], ConnectedAccount.prototype, "access_token", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], ConnectedAccount.prototype, "friend_sync", void 0);
__decorate([
    typeorm_1.Column()
], ConnectedAccount.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], ConnectedAccount.prototype, "revoked", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], ConnectedAccount.prototype, "show_activity", void 0);
__decorate([
    typeorm_1.Column()
], ConnectedAccount.prototype, "type", void 0);
__decorate([
    typeorm_1.Column()
], ConnectedAccount.prototype, "verifie", void 0);
__decorate([
    typeorm_1.Column({ select: false })
], ConnectedAccount.prototype, "visibility", void 0);
ConnectedAccount = __decorate([
    typeorm_1.Entity("connected_accounts")
], ConnectedAccount);
exports.ConnectedAccount = ConnectedAccount;
//# sourceMappingURL=ConnectedAccount.js.map