import { Sticker } from ".";
import { BaseClass } from "./BaseClass";
export declare class StickerPack extends BaseClass {
    name: string;
    description?: string;
    banner_asset_id?: string;
    stickers: Sticker[];
    cover_sticker_id?: string;
    cover_sticker?: Sticker;
}
