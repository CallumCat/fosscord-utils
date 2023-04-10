import { VerifyOptions } from "jsonwebtoken";
export declare const JWTOptions: VerifyOptions;
export declare function checkToken(token: string, jwtSecret: string): Promise<any>;
export declare function generateToken(id: string): Promise<unknown>;
