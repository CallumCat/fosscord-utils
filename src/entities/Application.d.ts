import { BaseClass } from "./BaseClass";
import { Guild } from "./Guild";
import { Team } from "./Team";
import { User } from "./User";
export declare class Application extends BaseClass {
    name: string;
    icon?: string;
    description: string;
    rpc_origins?: string[];
    bot_public: boolean;
    bot_require_code_grant: boolean;
    terms_of_service_url?: string;
    privacy_policy_url?: string;
    owner?: User;
    summary?: string;
    verify_key: string;
    team?: Team;
    guild: Guild;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string;
    flags: string;
}
export interface ApplicationCommand {
    id: string;
    application_id: string;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
}
export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}
export interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}
export declare enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8
}
export interface ApplicationCommandInteractionData {
    id: string;
    name: string;
    options?: ApplicationCommandInteractionDataOption[];
}
export interface ApplicationCommandInteractionDataOption {
    name: string;
    value?: any;
    options?: ApplicationCommandInteractionDataOption[];
}
