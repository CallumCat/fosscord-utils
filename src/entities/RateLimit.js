"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimit = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
let RateLimit = class RateLimit extends BaseClass_1.BaseClass {
    executor_id;
    hits;
    blocked;
    expires_at;
};
__decorate([
    typeorm_1.Column() // no relation as it also
], RateLimit.prototype, "executor_id", void 0);
__decorate([
    typeorm_1.Column()
], RateLimit.prototype, "hits", void 0);
__decorate([
    typeorm_1.Column()
], RateLimit.prototype, "blocked", void 0);
__decorate([
    typeorm_1.Column()
], RateLimit.prototype, "expires_at", void 0);
RateLimit = __decorate([
    typeorm_1.Entity("rate_limits")
], RateLimit);
exports.RateLimit = RateLimit;
//# sourceMappingURL=RateLimit.js.map