"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../services/user/index");
class UserController {
    async find(req, res, next) {
        try {
            const data = await index_1.UserService.find();
            res.status(200).json({
                success: true,
                message: 'Users found successfully',
                data
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findOne(req, res, next) {
        try {
            const data = await index_1.UserService.findOne(parseInt(req.params.id));
            res.status(200).json({
                success: true,
                message: 'User found successfully',
                data
            });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const payload = {
                nome: req.body.name,
                nick: req.body.nick,
                email: req.body.email,
                password: req.body.password
            };
            const data = await index_1.UserService.create(payload);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                nome: req.body.name,
                nick: req.body.nick,
                email: req.body.email,
                password: req.body.password
            };
            const data = await index_1.UserService.update(parseInt(req.params.id), payload);
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data
            });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const data = await index_1.UserService.delete(parseInt(req.params.id));
            res.status(204).json({
                success: true,
                message: 'User deleted successfully',
                data
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController();
