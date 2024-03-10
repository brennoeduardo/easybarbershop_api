import { Request, Response, NextFunction } from 'express';
import { BarberService } from '../../services/barber/index'
import { IController } from '../../interfaces/controller';
import { IBarberCreationAttributes, IBarberUpdateAttributes } from '../../../database/schemas/barber/interfaces';

class BarberController implements IController {

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const data = await BarberService.find();

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

            const data = await BarberService.findOne(parseInt(req.params.id));

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
            const payload: IBarberCreationAttributes = {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                mail: req.body.email,
                password: req.body.password,
                owner_id: req.body.owner_id,
                avatar: req.body.avatar,
            }

            const data = await BarberService.create(payload);

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

            const payload: IBarberUpdateAttributes = {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                mail: req.body.email,
                password: req.body.password,
                owner_id: req.body.owner_id,
                avatar: req.body.avatar,
            }

            const data = await BarberService.update(parseInt(req.params.id), payload);

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

            const data = await BarberService.delete(parseInt(req.params.id));

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

export default new BarberController();