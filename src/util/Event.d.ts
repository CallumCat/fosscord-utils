/// <reference types="node" />
import { Channel } from "amqplib";
import EventEmitter from "events";
import { Event } from "../interfaces";
export declare const events: EventEmitter;
export declare function emitEvent(payload: Omit<Event, "created_at">): Promise<void>;
export declare function initEvent(): Promise<void>;
export interface EventOpts extends Event {
    acknowledge?: Function;
    channel?: Channel;
    cancel: Function;
}
export interface ListenEventOpts {
    channel?: Channel;
    acknowledge?: boolean;
}
export interface ProcessEvent {
    type: "event";
    event: Event;
    id: string;
}
export declare function listenEvent(event: string, callback: (event: EventOpts) => any, opts?: ListenEventOpts): Promise<() => void>;
