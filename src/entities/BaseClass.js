"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClass = exports.PrimaryIdColumn = exports.BaseClassWithoutId = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Snowflake_1 = require("../util/Snowflake");
require("missing-native-js-functions");
class BaseClassWithoutId extends typeorm_1.BaseEntity {
    constructor(props) {
        super();
        this.assign(props);
    }
    get construct() {
        return this.constructor;
    }
    get metadata() {
        return this.construct.getRepository().metadata;
    }
    assign(props = {}) {
        delete props.opts;
        delete props.props;
        const properties = new Set(this.metadata.columns
            .map((x) => x.propertyName)
            .concat(this.metadata.relations.map((x) => x.propertyName)));
        // will not include relational properties
        for (const key in props) {
            if (!properties.has(key))
                continue;
            // @ts-ignore
            const setter = this[`set${key.capitalize()}`]; // use setter function if it exists
            if (setter) {
                setter.call(this, props[key]);
            }
            else {
                // @ts-ignore
                this[key] = props[key];
            }
        }
    }
    toJSON() {
        return Object.fromEntries(this.metadata.columns // @ts-ignore
            .map((x) => [x.propertyName, this[x.propertyName]]) // @ts-ignore
            .concat(this.metadata.relations.map((x) => [x.propertyName, this[x.propertyName]])));
    }
    static increment(conditions, propertyPath, value) {
        const repository = this.getRepository();
        return repository.increment(conditions, propertyPath, value);
    }
    static decrement(conditions, propertyPath, value) {
        const repository = this.getRepository();
        return repository.decrement(conditions, propertyPath, value);
    }
}
exports.BaseClassWithoutId = BaseClassWithoutId;
exports.PrimaryIdColumn = process.env.DATABASE?.startsWith("mongodb") ? typeorm_1.ObjectIdColumn : typeorm_1.PrimaryColumn;
class BaseClass extends BaseClassWithoutId {
    id;
    assign(props = {}) {
        super.assign(props);
        if (!this.id)
            this.id = Snowflake_1.Snowflake.generate();
        return this;
    }
}
__decorate([
    exports.PrimaryIdColumn()
], BaseClass.prototype, "id", void 0);
exports.BaseClass = BaseClass;
//# sourceMappingURL=BaseClass.js.map