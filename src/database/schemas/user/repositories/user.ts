import { BaseRepository } from "../../../core/class/Repository";
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from "../interfaces";
import User from "../models/user";

export class UserRepository extends BaseRepository<User, IUserCreationAttributes, IUserUpdateAttributes> {
    constructor() {
        super(User);
    }
}