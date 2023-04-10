"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerPack = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const BaseClass_1 = require("./BaseClass");
let StickerPack = class StickerPack extends BaseClass_1.BaseClass {
    name;
    description;
    banner_asset_id;
    stickers;
    // sku_id: string
    cover_sticker_id;
    cover_sticker;
};
__decorate([
    typeorm_1.Column()
], StickerPack.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], StickerPack.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], StickerPack.prototype, "banner_asset_id", void 0);
__decorate([
    typeorm_1.OneToMany(() => _1.Sticker, (sticker) => sticker.pack, {
        cascade: true,
        orphanedRowAction: "delete",
    })
], StickerPack.prototype, "stickers", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.RelationId((pack) => pack.cover_sticker)
], StickerPack.prototype, "cover_sticker_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => _1.Sticker, { nullable: true }),
    typeorm_1.JoinColumn()
], StickerPack.prototype, "cover_sticker", void 0);
StickerPack = __decorate([
    typeorm_1.Entity("sticker_packs")
], StickerPack);
exports.StickerPack = StickerPack;
//# sourceMappingURL=StickerPack.js.map