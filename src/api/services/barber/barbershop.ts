import BarberShop from "../../../database/schemas/barber/models/BarberShop"
import { IBarberShop, IBarberShopCreationAttributes, IBarberShopUpdateAttributes } from "../../../database/schemas/barber/interfaces";
class BarberShopService {

    async find(): Promise<IBarberShop[]> {
        return await BarberShop.findAll();
    }

    async findOne(id: number): Promise<IBarberShop | null> {
        return await BarberShop.findOne({ where: { id } });
    }

    async create(barbershop: IBarberShopCreationAttributes): Promise<IBarberShop> {
        return await BarberShop.create(barbershop);
    }

    async delete(id: number): Promise<number> {
        return await BarberShop.destroy({ where: { id } });
    }

    async update(id: number, barber: IBarberShopUpdateAttributes): Promise<[number]> {
        return await BarberShop.update(barber, { where: { id } });
    }

}

export default new BarberShopService();