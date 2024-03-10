import User from "../../../database/schemas/user/models/User";
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from "../../../database/schemas";
class UserService {

    async find(): Promise<IUser[]> {
        return await User.findAll();
    }

    async findOne(id: number): Promise<IUser | null> {
        return await User.findOne({ where: { id } });
    }

    async create(user: IUserCreationAttributes): Promise<IUser> {
        return await User.create(user);
    }

    async delete(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }

    async update(id: number, user: IUserUpdateAttributes): Promise<[number]> {
        return await User.update(user, { where: { id } });
    }

}

export default new UserService();