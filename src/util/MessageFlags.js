"use strict";
// https://github.com/discordjs/discord.js/blob/master/src/util/MessageFlags.js
// Apache License Version 2.0 Copyright 2015 - 2021 Amish Shah
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFlags = void 0;
const BitField_1 = require("./BitField");
class MessageFlags extends BitField_1.BitField {
    static FLAGS = {
        CROSSPOSTED: BigInt(1) << BigInt(0),
        IS_CROSSPOST: BigInt(1) << BigInt(1),
        SUPPRESS_EMBEDS: BigInt(1) << BigInt(2),
        SOURCE_MESSAGE_DELETED: BigInt(1) << BigInt(3),
        URGENT: BigInt(1) << BigInt(4),
    };
}
exports.MessageFlags = MessageFlags;
//# sourceMappingURL=MessageFlags.js.map