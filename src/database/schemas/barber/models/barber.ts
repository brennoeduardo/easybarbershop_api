import { DataTypes, Model } from "sequelize";
import { IBarber, IBarberCreationAttributes } from "../interfaces";
import easybarbershop from "../../../env";
import BarberShop from "./BarberShop";
import Services from "./Services";
import ServiceBarber from "./ServiceBarber";

class Barber extends Model<IBarber, IBarberCreationAttributes> {
    public id!: number;
    public name!: string;
    public phone!: string;
    public barbershop_id!: number;
    public description!: string;
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    barbershop_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: easybarbershop,
    tableName: "tb_barber",
    schema: "barber",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

Barber.belongsTo(BarberShop, { foreignKey: { name: 'barbershop_id', allowNull: false } })
BarberShop.hasMany(Barber, { foreignKey: { name: 'barbershop_id', allowNull: false } })

Barber.belongsToMany(Services, { through: ServiceBarber, foreignKey: 'barber_id' });

export default Barber;
