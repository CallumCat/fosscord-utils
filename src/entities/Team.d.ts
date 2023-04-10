import { BaseClass } from "./BaseClass";
import { TeamMember } from "./TeamMember";
import { User } from "./User";
export declare class Team extends BaseClass {
    icon?: string;
    members: TeamMember[];
    name: string;
    owner_user_id: string;
    owner_user: User;
}
