"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.dbConnection = exports.initDatabase = void 0;
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Models = __importStar(require("../entities"));
const Migration_1 = require("../entities/Migration");
const nanocolors_1 = require("nanocolors");
// UUID extension option is only supported with postgres
// We want to generate all id's with Snowflakes that's why we have our own BaseEntity class
var promise;
var dbConnection;
exports.dbConnection = dbConnection;
let dbConnectionString = process.env.DATABASE || path_1.default.join(process.cwd(), "database.db");
function initDatabase() {
    if (promise)
        return promise; // prevent initalizing multiple times
    const type = dbConnectionString.includes("://") ? dbConnectionString.split(":")[0]?.replace("+srv", "") : "sqlite";
    const isSqlite = type.includes("sqlite");
    console.log(`[Database] ${nanocolors_1.yellow(`connecting to ${type} db`)}`);
    // @ts-ignore
    promise = typeorm_1.createConnection({
        type,
        url: isSqlite ? undefined : dbConnectionString,
        database: isSqlite ? dbConnectionString : undefined,
        // @ts-ignore
        entities: Object.values(Models).filter((x) => x.constructor.name !== "Object" && x.name),
        synchronize: type !== "mongodb",
        logging: false,
        cache: {
            duration: 1000 * 3, // cache all find queries for 3 seconds
        },
        bigNumberStrings: false,
        supportBigNumbers: true,
        name: "default",
        migrations: [path_1.default.join(__dirname, "..", "migrations", "*.js")],
    });
    promise.then(async (connection) => {
        exports.dbConnection = dbConnection = connection;
        // run migrations, and if it is a new fresh database, set it to the last migration
        if (connection.migrations.length) {
            if (!(await Migration_1.Migration.findOne({}))) {
                let i = 0;
                await Migration_1.Migration.insert(connection.migrations.map((x) => ({
                    id: i++,
                    name: x.name,
                    timestamp: Date.now(),
                })));
            }
        }
        await connection.runMigrations();
        console.log(`[Database] ${nanocolors_1.green("connected")}`);
    });
    return promise;
}
exports.initDatabase = initDatabase;
function closeDatabase() {
    dbConnection?.close();
}
exports.closeDatabase = closeDatabase;
//# sourceMappingURL=Database.js.map