import { User } from "../entities";
export declare class MinimalPublicUserDTO {
    avatar?: string | null;
    discriminator: string;
    id: string;
    public_flags: number;
    username: string;
    constructor(user: User);
}
