import "missing-native-js-functions";
import { ConfigValue } from "../entities/Config";
export declare const Config: {
    init: () => Promise<any>;
    get: () => ConfigValue;
    set: (val: Partial<ConfigValue>) => Promise<any> | undefined;
};
