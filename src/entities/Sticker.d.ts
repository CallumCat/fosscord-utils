import { User } from "./User";
import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
export declare enum StickerType {
    STANDARD = 1,
    GUILD = 2
}
export declare enum StickerFormatType {
    GIF = 0,
    PNG = 1,
    APNG = 2,
    LOTTIE = 3
}
export declare class Sticker extends BaseClass {
    name: string;
    description?: string;
    available?: boolean;
    tags?: string;
    pack_id?: string;
    pack: import("./StickerPack").StickerPack;
    guild_id?: string;
    guild?: Guild;
    user_id?: string;
    user?: User;
    type: StickerType;
    format_type: StickerFormatType;
}
