import { BaseClass } from "./BaseClass";
import { User } from "./User";
export declare enum RelationshipType {
    outgoing = 4,
    incoming = 3,
    blocked = 2,
    friends = 1
}
export declare class Relationship extends BaseClass {
    from_id: string;
    from: User;
    to_id: string;
    to: User;
    nickname?: string;
    type: RelationshipType;
    toPublicRelationship(): {
        id: string;
        type: RelationshipType;
        nickname: string | undefined;
        user: import("./User").PublicUser;
    };
}
