import { Request, Response, NextFunction } from "express";
import User from "../../../database/schemas/user/models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

export default async function AuthLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const { mail, password }: { mail: string, password: string } = req.body;

        if (!mail || !password) {
            return res.status(400).json({
                success: false,
                message: 'E-mail e senha são obrigatórios'
            });
        }

        const user = await User.findOne({ where: { mail } });

        if (!user) {
            return res.json({
                success: false,
                message: 'Usuario não encontrado, forneça credenciais válidas'
            });
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            return res.json({
                success: false,
                message: 'E-mail ou senha incorreta, forneça credenciais válidas'
            });
        }

        const secret = config().parsed?.SECRET || "";

        const token = jwt.sign({ user_id: user.id, mail: user.mail, name: user.name, lastName: user.lastName, phone: user.phone }, secret, { expiresIn: '30d' });

        return res.json({
            token,
            success: true,
            message: 'Login realizado com sucesso',
        }); 

    } catch (error) {
        next(error);
        console.log(error);
    }
}

export async function AuthCheck(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is required'
        });
    }

    const secret = config().parsed?.SECRET || "";

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            });
        }

        req.body.user = decoded;
        next();
    });
}
