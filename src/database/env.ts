import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

const easybarbershop = new Sequelize({
    host: config().parsed?.DB_HOST,
    database: config().parsed?.DB_NAME,
    username: config().parsed?.DB_USER,
    password: config().parsed?.DB_PASS,
    dialect: 'postgres',
    define: {
        timestamps: true
    },
    logging: false,
})

export async function connect() {
    try {
        await easybarbershop.sync({ alter: true });
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default easybarbershop;