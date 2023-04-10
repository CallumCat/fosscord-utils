import { MinimalPublicUserDTO } from "./UserDTO";
import { Channel } from "../entities";
export declare class DmChannelDTO {
    icon: string | null;
    id: string;
    last_message_id: string | null;
    name: string | null;
    origin_channel_id: string | null;
    owner_id?: string;
    recipients: MinimalPublicUserDTO[];
    type: number;
    static from(channel: Channel, excluded_recipients?: string[], origin_channel_id?: string): Promise<DmChannelDTO>;
    excludedRecipients(excluded_recipients: string[]): DmChannelDTO;
}
