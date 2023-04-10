"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCommandOptionType = exports.Application = void 0;
const typeorm_1 = require("typeorm");
const BaseClass_1 = require("./BaseClass");
const Guild_1 = require("./Guild");
const Team_1 = require("./Team");
const User_1 = require("./User");
let Application = class Application extends BaseClass_1.BaseClass {
    name;
    icon;
    description;
    rpc_origins;
    bot_public;
    bot_require_code_grant;
    terms_of_service_url;
    privacy_policy_url;
    owner;
    summary;
    verify_key;
    team;
    guild; // if this application is a game sold, this field will be the guild to which it has been linked
    primary_sku_id; // if this application is a game sold, this field will be the id of the "Game SKU" that is created,
    slug; // if this application is a game sold, this field will be the URL slug that links to the store page
    cover_image; // the application's default rich presence invite cover image hash
    flags; // the application's public flags
};
__decorate([
    typeorm_1.Column()
], Application.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column()
], Application.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", nullable: true })
], Application.prototype, "rpc_origins", void 0);
__decorate([
    typeorm_1.Column()
], Application.prototype, "bot_public", void 0);
__decorate([
    typeorm_1.Column()
], Application.prototype, "bot_require_code_grant", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "terms_of_service_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "privacy_policy_url", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "owner_id" }),
    typeorm_1.ManyToOne(() => User_1.User)
], Application.prototype, "owner", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "summary", void 0);
__decorate([
    typeorm_1.Column()
], Application.prototype, "verify_key", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "team_id" }),
    typeorm_1.ManyToOne(() => Team_1.Team, {
        onDelete: "CASCADE",
    })
], Application.prototype, "team", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "guild_id" }),
    typeorm_1.ManyToOne(() => Guild_1.Guild)
], Application.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "primary_sku_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Application.prototype, "cover_image", void 0);
__decorate([
    typeorm_1.Column()
], Application.prototype, "flags", void 0);
Application = __decorate([
    typeorm_1.Entity("applications")
], Application);
exports.Application = Application;
var ApplicationCommandOptionType;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionType[ApplicationCommandOptionType["STRING"] = 3] = "STRING";
    ApplicationCommandOptionType[ApplicationCommandOptionType["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionType[ApplicationCommandOptionType["USER"] = 6] = "USER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionType[ApplicationCommandOptionType["ROLE"] = 8] = "ROLE";
})(ApplicationCommandOptionType = exports.ApplicationCommandOptionType || (exports.ApplicationCommandOptionType = {}));
//# sourceMappingURL=Application.js.map