export interface IServiceBarber{
    barber_id: number;
    service_id: number;
}

export interface IServiceBarberCreationAttributes extends IServiceBarber{
}

export interface IServiceBarberUpdateAttributes extends IServiceBarber{
}