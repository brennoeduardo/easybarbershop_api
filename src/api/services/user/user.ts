import User from "../../../database/schemas/user/models/User";
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from "../../../database/schemas";
import bcrypt from 'bcrypt';
class UserService {

    async find(): Promise<IUser[]> {
        return await User.findAll();
    }

    async findOne(id: number): Promise<IUser | null> {
        return await User.findOne({ where: { id } });
    }

    async create(user: IUserCreationAttributes) {
        if(!user) throw new Error('User data is required');
        if(!user.name) throw new Error('Name is required');
        if(!user.nick) throw new Error('Nick is required');
        if(!user.mail) throw new Error('Mail is required');
        if(!user.password) throw new Error('Password is required');

        const nickExists = await User.findOne({ where: { nick: user.nick } });
        if(nickExists) throw new Error('Nick already exists');

        const mailExist = await User.findOne({ where: { mail: user.mail } });
        if(mailExist) throw new Error('Mail already exists');


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

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