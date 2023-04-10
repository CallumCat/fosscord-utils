"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.checkToken = exports.JWTOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = require("./Config");
const entities_1 = require("../entities");
exports.JWTOptions = { algorithms: ["HS256"] };
function checkToken(token, jwtSecret) {
    return new Promise((res, rej) => {
        token = token.replace("Bot ", ""); // TODO: proper bot support
        jsonwebtoken_1.default.verify(token, jwtSecret, exports.JWTOptions, async (err, decoded) => {
            if (err || !decoded)
                return rej("Invalid Token");
            const user = await entities_1.User.findOne({ id: decoded.id }, { select: ["data", "bot", "disabled", "deleted", "rights"] });
            if (!user)
                return rej("Invalid Token");
            // we need to round it to seconds as it saved as seconds in jwt iat and valid_tokens_since is stored in milliseconds
            if (decoded.iat * 1000 < new Date(user.data.valid_tokens_since).setSeconds(0, 0))
                return rej("Invalid Token");
            if (user.disabled)
                return rej("User disabled");
            if (user.deleted)
                return rej("User not found");
            return res({ decoded, user });
        });
    });
}
exports.checkToken = checkToken;
async function generateToken(id) {
    const iat = Math.floor(Date.now() / 1000);
    const algorithm = "HS256";
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.sign({ id: id, iat }, Config_1.Config.get().security.jwtSecret, {
            algorithm,
        }, (err, token) => {
            if (err)
                return rej(err);
            return res(token);
        });
    });
}
exports.generateToken = generateToken;
//# sourceMappingURL=Token.js.map