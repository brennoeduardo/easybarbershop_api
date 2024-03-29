import { Request, Response, NextFunction } from 'express';
import { BarberShopService } from '../../services/barber/index'
import { IController } from '../../interfaces/controller';
import { IBarberCreationAttributes, IBarberShopCreationAttributes, IBarberShopUpdateAttributes, IBarberUpdateAttributes } from '../../../database/schemas/barber/interfaces';

class BarberShopController implements IController {

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const data = await BarberShopService.find();

            res.status(200).json({
                success: true,
                message: 'Barbers found successfully',
                data

            });
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await BarberShopService.findOne(parseInt(req.params.id));

            res.status(200).json({
                success: true,
                message: 'Barber found successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const payload: IBarberShopCreationAttributes = {
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                openingHours: req.body.openingHours,
                description: req.body.description,
            }

            const data = await BarberShopService.create(payload);

            res.status(201).json({
                success: true,
                message: 'Barber created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const payload: IBarberShopUpdateAttributes = {
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                openingHours: req.body.openingHours,
                description: req.body.description,
            }

            const data = await BarberShopService.update(parseInt(req.params.id), payload);

            res.status(200).json({
                success: true,
                message: 'Barber updated successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await BarberShopService.delete(parseInt(req.params.id));

            res.status(204).json({
                success: true,
                message: 'Barber deleted successfully',
                data
            });

        } catch (error) {
            next(error);
        }
    }

}

export default new BarberShopController();