import { Sequelize, DataTypes } from "sequelize";
import { Entity } from "../../../core/class/Entity";
import { IUser, IUserCreationAttributes } from "../interfaces/user";

class User extends Entity<IUser, IUserCreationAttributes> implements IUser {
    public declare nick: string;
    public declare nome: string;
    public declare email: string;
    public declare password: string;

    static instantiate(DB: Sequelize): void {
        User.initialize<User, IUserCreationAttributes>({
            schema: 'user',
            tableName: 'tb_user',
            name: {
                plural: 'users',
                singular: 'user'
            },
            fields: {
                nick: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
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

export default User;
