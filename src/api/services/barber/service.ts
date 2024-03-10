import Service from "../../../database/schemas/barber/models/services";
import { IService, IServiceCreationAttributes, IServiceUpdateAttributes } from "../../../database/schemas/barber/interfaces";
class Services {

    async find(): Promise<IService[]> {
        return await Service.findAll();
    }

    async findOne(id: number): Promise<IService | null> {
        return await Service.findOne({ where: { id } });
    }

    async create(service: IServiceCreationAttributes): Promise<IService> {
        return await Service.create(service);
    }

    async delete(id: number): Promise<number> {
        return await Service.destroy({ where: { id } });
    }

    async update(id: number, service: IServiceUpdateAttributes): Promise<[number]> {
        return await Service.update(service, { where: { id } });
    }

}

export default new Services();