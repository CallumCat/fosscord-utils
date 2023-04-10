import { User } from ".";
import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
export declare class Emoji extends BaseClass {
    animated: boolean;
    available: boolean;
    guild_id: string;
    guild: Guild;
    user_id: string;
    user: User;
    managed: boolean;
    name: string;
    require_colons: boolean;
    roles: string[];
}
