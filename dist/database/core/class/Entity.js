"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const sequelize_1 = require("sequelize");
/** Default base class for all entities. */
class Entity extends sequelize_1.Model {
    static instantiate(DB) { }
    static initialize(options, sequelize) {
        var _a, _b;
        const entity = this;
        // Construindo os atributos do modelo
        const modelAttributes = {};
        if (options.includeId) {
            modelAttributes.id = {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            };
        }
        if (options.timestamps) {
            modelAttributes.created_at = {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.Sequelize.literal('NOW()')
            };
            modelAttributes.updated_at = {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.Sequelize.literal('NOW()')
            };
        }
        const mergedAttributes = Object.assign({}, modelAttributes, options.fields);
        entity.init(mergedAttributes, {
            sequelize,
            ...(options.name && { name: { plural: options.name.plural, singular: options.name.singular } }),
            ...(options.schema && { schema: options.schema }),
            tableName: options.tableName,
            timestamps: (_a = options.timestamps) !== null && _a !== void 0 ? _a : false,
            underscored: (_b = options.underscored) !== null && _b !== void 0 ? _b : false,
            indexes: options.indexes,
            defaultScope: options.defaultScope,
        });
    }
    static associate() { }
    static setScopes() { }
    static setHooks() { }
}
exports.Entity = Entity;
