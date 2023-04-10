import "reflect-metadata";
import { Connection } from "typeorm";
declare var dbConnection: Connection | undefined;
export declare function initDatabase(): Promise<Connection>;
export { dbConnection };
export declare function closeDatabase(): void;
