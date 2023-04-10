import { BaseClass } from "./BaseClass";
import { Channel } from "./Channel";
import { User } from "./User";
export declare class ReadState extends BaseClass {
    channel_id: string;
    channel: Channel;
    user_id: string;
    user: User;
    last_message_id: string;
    last_pin_timestamp?: Date;
    mention_count: number;
    manual: boolean;
}
