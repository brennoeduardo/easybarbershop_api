import { Request, Response, NextFunction } from 'express';
import { Services } from '../../services/barber/index'
import { IController } from '../../interfaces/controller';
import { IService, IServiceUpdateAttributes } from '../../../database/schemas/barber/interfaces';

class ServiceController implements IController {

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const data = await Services.find();

            res.status(200).json({
                success: true,
                message: 'Services found successfully',
                data

            });
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await Services.findOne(parseInt(req.params.id));

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
            const payload: IService = {
                duration: req.body.duration,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            }

            const data = await Services.create(payload);

            res.status(201).json({
                success: true,
                message: 'Services created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const payload: IServiceUpdateAttributes = {
                duration: req.body.duration,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            }

            const data = await Services.update(parseInt(req.params.id), payload);

            res.status(200).json({
                success: true,
                message: 'Services updated successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await Services.delete(parseInt(req.params.id));

            res.status(204).json({
                success: true,
                message: 'Services deleted successfully',
                data
            });

        } catch (error) {
            next(error);
        }
    }

}

export default new ServiceController();