import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
export declare class Role extends BaseClass {
    guild_id: string;
    guild: Guild;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: string;
    position: number;
    tags?: {
        bot_id?: string;
        integration_id?: string;
        premium_subscriber?: boolean;
    };
}
