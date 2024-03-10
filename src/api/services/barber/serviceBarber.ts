import ServiceBarber from "../../../database/schemas/barber/models/serviceBarber";
import { IServiceBarber, IServiceBarberCreationAttributes, IServiceBarberUpdateAttributes } from "../../../database/schemas/barber/interfaces";
class UserServiceBarber {

    async find(): Promise<IServiceBarber[]> {
        return await ServiceBarber.findAll();
    }

    async create(service: IServiceBarberCreationAttributes): Promise<IServiceBarber> {
        return await ServiceBarber.create(service);
    }

}

export default new UserServiceBarber();