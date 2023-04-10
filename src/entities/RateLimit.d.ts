import { BaseClass } from "./BaseClass";
export declare class RateLimit extends BaseClass {
    executor_id: string;
    hits: number;
    blocked: boolean;
    expires_at: Date;
}
