import { User } from "./User";
import { BaseClass } from "./BaseClass";
import { Status } from "../interfaces/Status";
import { Activity } from "../interfaces/Activity";
export declare class Session extends BaseClass {
    user_id: string;
    user: User;
    session_id: string;
    activities: Activity[];
    client_info: {
        client: string;
        os: string;
        version: number;
    };
    status: Status;
}
export declare const PrivateSessionProjection: (keyof Session)[];
