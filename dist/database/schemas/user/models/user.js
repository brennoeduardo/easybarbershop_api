"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Entity_1 = require("../../../core/class/Entity");
class User extends Entity_1.Entity {
    static instantiate(DB) {
        User.initialize({
            schema: 'user',
            tableName: 'tb_user',
            name: {
                plural: 'users',
                singular: 'user'
            },
            fields: {
                nick: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                nome: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                }
            },
            timestamps: true,
        }, DB);
        User.associate();
        User.beforeSync(() => {
            console.log('before create');
        });
    }
}
exports.default = User;
