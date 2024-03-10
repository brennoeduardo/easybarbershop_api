import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from "../interfaces";
import User from "../models/User";

export class UserRepository extends User {
    constructor() {
        super(new User()); 
    }
}