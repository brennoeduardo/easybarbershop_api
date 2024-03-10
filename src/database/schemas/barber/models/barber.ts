import { DataTypes, Model } from "sequelize";
import { IBarber, IBarberCreationAttributes } from "../interfaces";
import easybarbershop from "../../../env";
import ServiceBarber from "./serviceBarber";
import Services from "../models/services";

class Barber extends Model<IBarber, IBarberCreationAttributes> {
    public id!: number;
    public name!: string;
    public mail!: string;
    public password!: string;
    public address!: string;
    public phone!: string;
    public avatar!: string;
    public owner_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Barber.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
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
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: easybarbershop,
    tableName: "tb_barber",
    schema: "barber",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

export default Barber;
