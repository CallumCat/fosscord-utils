export interface Activity {
    name: string;
    type: ActivityType;
    url?: string;
    created_at?: number;
    timestamps?: {
        start: number;
        end: number;
    };
    application_id?: string;
    details?: string;
    state?: string;
    emoji?: {
        name: string;
        id?: string;
        animated: boolean;
    };
    party?: {
        id?: string;
        size?: [number];
    };
    assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
    };
    secrets?: {
        join?: string;
        spectate?: string;
        match?: string;
    };
    instance?: boolean;
    flags: string;
}
export declare enum ActivityType {
    GAME = 0,
    STREAMING = 1,
    LISTENING = 2,
    CUSTOM = 4,
    COMPETING = 5
}
