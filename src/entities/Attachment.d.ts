import { BaseClass } from "./BaseClass";
export declare class Attachment extends BaseClass {
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    content_type?: string;
    message_id: string;
    message: import("./Message").Message;
    onDelete(): Promise<any>;
}
