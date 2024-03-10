import { DataTypes, Model } from "sequelize";
import { IService, IServiceCreationAttributes } from "../interfaces";
import easybarbershop from "../../../env";
import Barber from "./barber";
import ServiceBarber from "./serviceBarber";

class Services extends Model<IService, IServiceCreationAttributes> {
    public id!: number;
    public name!: string;
    public price!: number;
    public duration!: number;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Services.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize: easybarbershop,
        tableName: "tb_service",
        schema: "barber",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

Barber.belongsToMany(Services, { foreignKey: { name: 'barber_id', allowNull: false }, through: ServiceBarber });
Services.belongsToMany(Barber, { foreignKey: { name: 'service_id', allowNull: false }, through: ServiceBarber });

export default Services;
