export interface IBarber{
    id?: number;
    name: string;
    mail: string;
    password: string;
    address: string;
    phone: string;
    avatar?: string;
    owner_id: number;
}

export interface IBarberCreationAttributes extends IBarber{
}

export interface IBarberUpdateAttributes extends IBarber{
}