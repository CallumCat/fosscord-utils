import { BaseClass } from "./BaseClass";
import { User } from "./User";
export declare enum TeamMemberState {
    INVITED = 1,
    ACCEPTED = 2
}
export declare class TeamMember extends BaseClass {
    membership_state: TeamMemberState;
    permissions: string[];
    team_id: string;
    team: import("./Team").Team;
    user_id: string;
    user: User;
}
