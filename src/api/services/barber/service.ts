import Service from "../../../database/schemas/barber/models/Services";
import { IService, IServiceBarber, IServiceCreationAttributes, IServiceUpdateAttributes } from "../../../database/schemas/barber/interfaces";
import { ServiceBarber } from "../../../database/schemas";
import Services from "../../../database/schemas/barber/models/Services";
class ServicesService {

    async find(): Promise<Service[]> {
        return await Service.findAll();
    }

    async findOne(barber_id: number): Promise<any> {
        return await Services.findOne({
            include: [
                {
                    model: ServiceBarber,
                    where: { barber_id }
                }
            ]
        });
    }

    async create(service: IServiceCreationAttributes): Promise<Service> {
        return await Services.create(service);
    }

    async delete(id: number): Promise<number> {
        return await Service.destroy({ where: { id } });
    }

    async update(id: number, service: IServiceUpdateAttributes): Promise<[number]> {
        return await Service.update(service, { where: { id } });
    }

}

export default new ServicesService();