import { DataTypes, Model } from "sequelize";
import { IBarberShop, IBarberShopCreationAttributes } from "../interfaces";
import easybarbershop from "../../../env";

class BarberShop extends Model<IBarberShop, IBarberShopCreationAttributes> {
    public id!: number;
    public name!: string;
    public phone!: string;
    public address!: string;
    public description!: string;
    public openingHours!: JSON;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

BarberShop.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    openingHours: {
        type: DataTypes.JSONB,
        allowNull: false
    }
}, {
    sequelize: easybarbershop,
    tableName: "tb_barbershop",
    schema: "barber",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

export default BarberShop;
