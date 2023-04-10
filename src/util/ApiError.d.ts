export declare class ApiError extends Error {
    readonly message: string;
    readonly code: number;
    readonly httpStatus: number;
    readonly defaultParams?: string[] | undefined;
    constructor(message: string, code: number, httpStatus?: number, defaultParams?: string[] | undefined);
    withDefaultParams(): ApiError;
    withParams(...params: (string | number)[]): ApiError;
}
export declare function applyParamsToString(s: string, params: (string | number)[]): string;
