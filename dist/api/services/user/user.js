"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../../../database/schemas/repositories");
class UserService {
    constructor() {
        this.user = new repositories_1.UserRepository();
    }
    async find() {
        return await this.user.findAll();
    }
    async findOne(id) {
        return await this.user.findOne({ where: { id } });
    }
    async create(user) {
        return await this.user.create(user);
    }
    async delete(id) {
        return await this.user.delete({ where: { id } });
    }
    async update(id, user) {
        return await this.user.update(user, { where: { id } });
    }
}
exports.default = new UserService();
