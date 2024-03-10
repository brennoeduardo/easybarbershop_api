export interface IUser{
    id?: number;
    nick: string;
    name: string;
    mail: string;
    password: string;
}

export interface IUserCreationAttributes extends IUser{
}

export interface IUserUpdateAttributes extends IUser{
}