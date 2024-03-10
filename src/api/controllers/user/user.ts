import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user/index'
import { IController } from '../../interfaces/controller';
import { IUserCreationAttributes } from '../../../database/schemas';

class UserController implements IController {

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const data = await UserService.find();

            res.status(200).json({
                success: true,
                message: 'Users found successfully',
                data

            });
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await UserService.findOne(parseInt(req.params.id));

            res.status(200).json({
                success: true,
                message: 'User found successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const payload: IUserCreationAttributes = {
                name: req.body.name,
                nick: req.body.nick,
                mail: req.body.mail,
                password: req.body.password
            }

            const data = await UserService.create(payload);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const payload: IUserCreationAttributes = {
                name: req.body.name,
                nick: req.body.nick,
                mail: req.body.email,
                password: req.body.password
            }

            const data = await UserService.update(parseInt(req.params.id), payload);

            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await UserService.delete(parseInt(req.params.id));

            res.status(204).json({
                success: true,
                message: 'User deleted successfully',
                data
            });

        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            return req.body
        } catch (error) {
            next(error);
        }
    }

}

export default new UserController();