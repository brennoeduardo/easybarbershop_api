import { DataTypes, Model } from "sequelize";
import { IUser, IUserCreationAttributes } from "../interfaces/user";
import easybarbershop from "../../../env";

class User extends Model<IUser, IUserCreationAttributes> {
    public id!: number;
    public mail!: string;
    public phone!: string;
    public name!: string;
    public lastName!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: easybarbershop,
    tableName: "tb_user",
    schema: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

export default User;
