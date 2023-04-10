"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relationship = exports.RelationshipType = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const User_1 = require("./User");
var RelationshipType;
(function (RelationshipType) {
    RelationshipType[RelationshipType["outgoing"] = 4] = "outgoing";
    RelationshipType[RelationshipType["incoming"] = 3] = "incoming";
    RelationshipType[RelationshipType["blocked"] = 2] = "blocked";
    RelationshipType[RelationshipType["friends"] = 1] = "friends";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
let Relationship = class Relationship extends BaseClass_1.BaseClass {
    from_id;
    from;
    to_id;
    to;
    nickname;
    type;
    toPublicRelationship() {
        return {
            id: this.to?.id || this.to_id,
            type: this.type,
            nickname: this.nickname,
            user: this.to?.toPublicUser(),
        };
    }
};
__decorate([
    typeorm_1.Column({}),
    typeorm_1.RelationId((relationship) => relationship.from)
], Relationship.prototype, "from_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "from_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Relationship.prototype, "from", void 0);
__decorate([
    typeorm_1.Column({}),
    typeorm_1.RelationId((relationship) => relationship.to)
], Relationship.prototype, "to_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "to_id" }),
    typeorm_1.ManyToOne(() => User_1.User, {
        onDelete: "CASCADE",
    })
], Relationship.prototype, "to", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Relationship.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({ type: "int" })
], Relationship.prototype, "type", void 0);
Relationship = __decorate([
    typeorm_1.Entity("relationships"),
    typeorm_1.Index(["from_id", "to_id"], { unique: true })
], Relationship);
exports.Relationship = Relationship;
//# sourceMappingURL=Relationship.js.map