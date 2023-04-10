import { BaseClass } from "./BaseClass";
import { Channel } from "./Channel";
import { Guild } from "./Guild";
import { User } from "./User";
import { Member } from "./Member";
export declare class VoiceState extends BaseClass {
    guild_id: string;
    guild?: Guild;
    channel_id: string;
    channel: Channel;
    user_id: string;
    user: User;
    member: Member;
    session_id: string;
    token: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
    request_to_speak_timestamp?: Date;
}
