import { DataTypes, Model } from "sequelize";
import { IServiceBarber } from '../interfaces/serviceBarber'
import easybarbershop from "../../../env";

class ServiceBarber extends Model<IServiceBarber, IServiceBarber> {
    public barber_id!: number;
    public service_id!: number;
}

ServiceBarber.init({
    barber_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize: easybarbershop,
    tableName: "tb_service_barber",
    schema: "barber",
})

export default ServiceBarber;
