import { EntityAttributes } from '../../../core/interfaces/entity';

export interface IUser extends EntityAttributes {
    nick: string;
    nome: string;
    email: string;
    password: string;
}

export interface IUserCreationAttributes extends IUser{
}

export interface IUserUpdateAttributes extends IUser{
}