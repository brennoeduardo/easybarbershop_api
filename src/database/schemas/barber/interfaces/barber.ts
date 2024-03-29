export interface IBarber{
    id?: number;
    name: string;
    phone: string;
    description: string,
    barbershop_id?: number
}

export interface IBarberCreationAttributes extends IBarber{
}

export interface IBarberUpdateAttributes extends IBarber{
}