"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rights = void 0;
const BitField_1 = require("./BitField");
require("missing-native-js-functions");
const BitField_2 = require("./BitField");
var HTTPError;
try {
    HTTPError = require("lambert-server").HTTPError;
}
catch (e) {
    HTTPError = Error;
}
// TODO: just like roles for members, users should have privilidges which combine multiple rights into one and make it easy to assign
class Rights extends BitField_1.BitField {
    constructor(bits = 0) {
        super(bits);
        if (this.bitfield & Rights.FLAGS.OPERATOR) {
            this.bitfield = ALL_RIGHTS;
        }
    }
    static FLAGS = {
        OPERATOR: BitField_2.BitFlag(0),
        MANAGE_APPLICATIONS: BitField_2.BitFlag(1),
        MANAGE_GUILDS: BitField_2.BitFlag(2),
        MANAGE_MESSAGES: BitField_2.BitFlag(3),
        MANAGE_RATE_LIMITS: BitField_2.BitFlag(4),
        MANAGE_ROUTING: BitField_2.BitFlag(5),
        MANAGE_TICKETS: BitField_2.BitFlag(6),
        MANAGE_USERS: BitField_2.BitFlag(7),
        ADD_MEMBERS: BitField_2.BitFlag(8),
        BYPASS_RATE_LIMITS: BitField_2.BitFlag(9),
        CREATE_APPLICATIONS: BitField_2.BitFlag(10),
        CREATE_CHANNELS: BitField_2.BitFlag(11),
        CREATE_DMS: BitField_2.BitFlag(12),
        CREATE_DM_GROUPS: BitField_2.BitFlag(13),
        CREATE_GUILDS: BitField_2.BitFlag(14),
        CREATE_INVITES: BitField_2.BitFlag(15),
        CREATE_ROLES: BitField_2.BitFlag(16),
        CREATE_TEMPLATES: BitField_2.BitFlag(17),
        CREATE_WEBHOOKS: BitField_2.BitFlag(18),
        JOIN_GUILDS: BitField_2.BitFlag(19),
        PIN_MESSAGES: BitField_2.BitFlag(20),
        SELF_ADD_REACTIONS: BitField_2.BitFlag(21),
        SELF_DELETE_MESSAGES: BitField_2.BitFlag(22),
        SELF_EDIT_MESSAGES: BitField_2.BitFlag(23),
        SELF_EDIT_NAME: BitField_2.BitFlag(24),
        SEND_MESSAGES: BitField_2.BitFlag(25),
        USE_ACTIVITIES: BitField_2.BitFlag(26),
        USE_VIDEO: BitField_2.BitFlag(27),
        USE_VOICE: BitField_2.BitFlag(28),
        INVITE_USERS: BitField_2.BitFlag(29),
        SELF_DELETE_DISABLE: BitField_2.BitFlag(30),
        DEBTABLE: BitField_2.BitFlag(31),
        CREDITABLE: BitField_2.BitFlag(32) // can receive money from monetisation related features
    };
    any(permission, checkOperator = true) {
        return (checkOperator && super.any(Rights.FLAGS.OPERATOR)) || super.any(permission);
    }
    has(permission, checkOperator = true) {
        return (checkOperator && super.has(Rights.FLAGS.OPERATOR)) || super.has(permission);
    }
    hasThrow(permission) {
        if (this.has(permission))
            return true;
        // @ts-ignore
        throw new HTTPError(`You are missing the following rights ${permission}`, 403);
    }
}
exports.Rights = Rights;
const ALL_RIGHTS = Object.values(Rights.FLAGS).reduce((total, val) => total | val, BigInt(0));
//# sourceMappingURL=Rights.js.map