import { Sequelize } from 'sequelize';



export async function connect(){
    try {
        await easybarbershop.sync()
        await easybarbershop.authenticate().then(() => console.log('Database connected')).catch((err) => console.log(err))
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default easybarbershop;