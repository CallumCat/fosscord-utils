import { BaseClass } from "./BaseClass";
export declare class Recipient extends BaseClass {
    channel_id: string;
    channel: import("./Channel").Channel;
    user_id: string;
    user: import("./User").User;
    closed: boolean;
}
