"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
let Recipient = class Recipient extends BaseClass_1.BaseClass {
    channel_id;
    channel;
    user_id;
    user;
    closed;
};
__decorate([
    typeorm_1.Column(),
    typeorm_1.RelationId((recipient) => recipient.channel)
], Recipient.prototype, "channel_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "channel_id" }),
    typeorm_1.ManyToOne(() => require("./Channel").Channel, {
        onDelete: "CASCADE",
    })
], Recipient.prototype, "channel", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.RelationId((recipient) => recipient.user)
], Recipient.prototype, "user_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => require("./User").User, {
        onDelete: "CASCADE",
    })
], Recipient.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ default: false })
], Recipient.prototype, "closed", void 0);
Recipient = __decorate([
    typeorm_1.Entity("recipients")
], Recipient);
exports.Recipient = Recipient;
//# sourceMappingURL=Recipient.js.map