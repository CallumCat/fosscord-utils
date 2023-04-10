import "missing-native-js-functions";
export declare function FieldErrors(fields: Record<string, {
    code?: string;
    message: string;
}>): FieldError;
export declare class FieldError extends Error {
    code: string | number;
    message: string;
    errors?: any;
    constructor(code: string | number, message: string, errors?: any);
}
