import User from "../../../database/schemas/user/models/user";
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from "../../../database/schemas";
import { UserRepository } from "../../../database/schemas/repositories"; 

class UserService {

    private user: UserRepository;

    constructor() {
        this.user = new UserRepository();
    }

    async find(): Promise<IUser[]> {
        return await this.user.findAll();
    }

    async findOne(id: number): Promise<IUser | null> {
        return await this.user.findOne({ where: { id } });
    }

    async create(user: IUserCreationAttributes): Promise<IUser> {
        return await this.user.create(user);
    }

    async delete(id: number): Promise<number> {
        return await this.user.delete({ where: { id } });
    }

    async update(id: number, user: IUserUpdateAttributes): Promise<[number]> {
        return await this.user.update(user, { where: { id } });
    }

}

export default new UserService();