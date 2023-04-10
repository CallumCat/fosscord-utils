import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
import { User } from "./User";
export declare class Template extends BaseClass {
    code: string;
    name: string;
    description?: string;
    usage_count?: number;
    creator_id: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
    source_guild_id: string;
    source_guild: Guild;
    serialized_source_guild: Guild;
}
