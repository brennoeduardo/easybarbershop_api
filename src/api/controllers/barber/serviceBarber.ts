import { Request, Response, NextFunction } from 'express';
import { ServiceBarberService } from '../../services/barber/index'
import { IServiceBarber } from '../../../database/schemas/barber/interfaces';

class ServiceBarberController {

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const data = await ServiceBarberService.find();

            res.status(200).json({
                success: true,
                message: 'Services found successfully',
                data

            });
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const payload: IServiceBarber = {
                barber_id: req.body.barber_id,
                service_id: req.body.service_id,
            }

            const data = await ServiceBarberService.create(payload);

            res.status(201).json({
                success: true,
                message: 'Barber created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

}

export default new ServiceBarberController();