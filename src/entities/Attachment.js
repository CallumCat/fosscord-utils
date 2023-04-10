"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
const typeorm_1 = require("typeorm");
const url_1 = require("url");
const cdn_1 = require("../util/cdn");
const BaseClass_1 = require("./BaseClass");
let Attachment = class Attachment extends BaseClass_1.BaseClass {
    filename; // name of file attached
    size; // size of file in bytes
    url; // source url of file
    proxy_url; // a proxied url of file
    height; // height of file (if image)
    width; // width of file (if image)
    content_type;
    message_id;
    message;
    onDelete() {
        return cdn_1.deleteFile(new url_1.URL(this.url).pathname);
    }
};
__decorate([
    typeorm_1.Column()
], Attachment.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column()
], Attachment.prototype, "size", void 0);
__decorate([
    typeorm_1.Column()
], Attachment.prototype, "url", void 0);
__decorate([
    typeorm_1.Column()
], Attachment.prototype, "proxy_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Attachment.prototype, "height", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Attachment.prototype, "width", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Attachment.prototype, "content_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((attachment) => attachment.message)
], Attachment.prototype, "message_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "message_id" }),
    typeorm_1.ManyToOne(() => require("./Message").Message, (message) => message.attachments, {
        onDelete: "CASCADE",
    })
], Attachment.prototype, "message", void 0);
__decorate([
    typeorm_1.BeforeRemove()
], Attachment.prototype, "onDelete", null);
Attachment = __decorate([
    typeorm_1.Entity("attachments")
], Attachment);
exports.Attachment = Attachment;
//# sourceMappingURL=Attachment.js.map