export interface IService{
    id?: number;
    name: string;
    description?: string;
    price: number;
    duration: number;
}

export interface IServiceCreationAttributes extends IService{
}

export interface IServiceUpdateAttributes extends IService{
}