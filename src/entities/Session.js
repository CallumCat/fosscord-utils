"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateSessionProjection = exports.Session = void 0;
const User_1 = require("./User");
const BaseClass_1 = require("./BaseClass");
const typeorm_1 = require("typeorm");
//TODO we need to remove all sessions on server start because if the server crashes without closing websockets it won't delete them
let Session = class Session extends BaseClass_1.BaseClass {
    user_id;
    user;
    //TODO check, should be 32 char long hex string
    session_id;
    activities;
    // TODO client_status
    client_info;
    status; //TODO enum
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((session) => session.user)
], Session.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Session.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, select: false })
], Session.prototype, "session_id", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", nullable: true })
], Session.prototype, "activities", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", select: false })
], Session.prototype, "client_info", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "varchar" })
], Session.prototype, "status", void 0);
Session = __decorate([
    typeorm_1.Entity("sessions")
], Session);
exports.Session = Session;
exports.PrivateSessionProjection = [
    "user_id",
    "session_id",
    "activities",
    "client_info",
    "status",
];
//# sourceMappingURL=Session.js.map