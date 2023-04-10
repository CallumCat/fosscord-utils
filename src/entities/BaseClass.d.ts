import "reflect-metadata";
import { BaseEntity, FindConditions } from "typeorm";
import "missing-native-js-functions";
export declare class BaseClassWithoutId extends BaseEntity {
    constructor(props?: any);
    private get construct();
    private get metadata();
    assign(props?: any): void;
    toJSON(): any;
    static increment<T extends BaseClass>(conditions: FindConditions<T>, propertyPath: string, value: number | string): any;
    static decrement<T extends BaseClass>(conditions: FindConditions<T>, propertyPath: string, value: number | string): any;
}
export declare const PrimaryIdColumn: any;
export declare class BaseClass extends BaseClassWithoutId {
    id: string;
    assign(props?: any): this;
}
