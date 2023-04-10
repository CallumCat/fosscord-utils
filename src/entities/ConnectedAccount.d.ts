import { BaseClass } from "./BaseClass";
import { User } from "./User";
export interface PublicConnectedAccount extends Pick<ConnectedAccount, "name" | "type" | "verifie"> {
}
export declare class ConnectedAccount extends BaseClass {
    user_id: string;
    user: User;
    access_token: string;
    friend_sync: boolean;
    name: string;
    revoked: boolean;
    show_activity: boolean;
    type: string;
    verifie: boolean;
    visibility: number;
}
