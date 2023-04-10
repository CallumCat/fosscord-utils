"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
require("missing-native-js-functions");
const Config_1 = require("../entities/Config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// TODO: yaml instead of json
const overridePath = path_1.default.join(process.cwd(), "config.json");
var config;
var pairs;
// TODO: use events to inform about config updates
// Config keys are separated with _
exports.Config = {
    init: async function init() {
        if (config)
            return config;
        pairs = await Config_1.ConfigEntity.find();
        config = pairsToConfig(pairs);
        config = (config || {}).merge(Config_1.DefaultConfigOptions);
        try {
            const overrideConfig = JSON.parse(fs_1.default.readFileSync(overridePath, { encoding: "utf8" }));
            config = overrideConfig.merge(config);
        }
        catch (error) {
            fs_1.default.writeFileSync(overridePath, JSON.stringify(config, null, 4));
        }
        return this.set(config);
    },
    get: function get() {
        return config;
    },
    set: function set(val) {
        if (!config || !val)
            return;
        config = val.merge(config);
        return applyConfig(config);
    },
};
function applyConfig(val) {
    async function apply(obj, key = "") {
        if (typeof obj === "object" && obj !== null)
            return Promise.all(Object.keys(obj).map((k) => apply(obj[k], key ? `${key}_${k}` : k)));
        let pair = pairs.find((x) => x.key === key);
        if (!pair)
            pair = new Config_1.ConfigEntity();
        pair.key = key;
        pair.value = obj;
        return pair.save();
    }
    fs_1.default.writeFileSync(overridePath, JSON.stringify(val, null, 4));
    return apply(val);
}
function pairsToConfig(pairs) {
    var value = {};
    pairs.forEach((p) => {
        const keys = p.key.split("_");
        let obj = value;
        let prev = "";
        let prevObj = obj;
        let i = 0;
        for (const key of keys) {
            if (!isNaN(Number(key)) && !prevObj[prev]?.length)
                prevObj[prev] = obj = [];
            if (i++ === keys.length - 1)
                obj[key] = p.value;
            else if (!obj[key])
                obj[key] = {};
            prev = key;
            prevObj = obj;
            obj = obj[key];
        }
    });
    return value;
}
//# sourceMappingURL=Config.js.map