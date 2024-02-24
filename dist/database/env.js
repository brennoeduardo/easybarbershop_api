"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const sequelize_1 = require("sequelize");
const easybarbershop = new sequelize_1.Sequelize({
    host: 'localhost',
    database: 'easybarbershop',
    username: 'postgres',
    password: '1917',
    dialect: 'postgres',
    logging: console.log,
    define: {
        timestamps: true
    }
});
async function connect() {
    try {
        await easybarbershop.sync();
        await easybarbershop.authenticate().then(() => console.log('Database connected')).catch((err) => console.log(err));
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
exports.connect = connect;
exports.default = easybarbershop;
