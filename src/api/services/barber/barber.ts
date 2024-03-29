import Barber from "../../../database/schemas/barber/models/Barber"
import { IBarber, IBarberCreationAttributes, IBarberUpdateAttributes } from "../../../database/schemas/barber/interfaces";
class BarberService {

    async find(): Promise<IBarber[]> {
        return await Barber.findAll();
    }

    async findOne(id: number): Promise<IBarber | null> {
        return await Barber.findOne({ where: { id } });
    }

    async create(barber: IBarberCreationAttributes): Promise<IBarber> {
        return await Barber.create(barber);
    }

    async delete(id: number): Promise<number> {
        return await Barber.destroy({ where: { id } });
    }

    async update(id: number, barber: IBarberUpdateAttributes): Promise<[number]> {
        return await Barber.update(barber, { where: { id } });
    }

}

export default new BarberService();