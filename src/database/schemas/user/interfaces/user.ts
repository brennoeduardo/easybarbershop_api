export interface IUser{
    id?: number;
    name: string;
    lastName: string;
    phone: string;
    mail: string;
    password: string;
}

export interface IUserCreationAttributes extends IUser{
}

export interface IUserUpdateAttributes extends IUser{
}