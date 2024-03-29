import { IServiceBarber } from "./serviceBarber";

export interface IService{
    id?: number;
    name: string;
    description?: string;
    price: number;
    duration: number;

    servicesBarber?: IServiceBarber
}

export interface IServiceCreationAttributes extends IService{
}

export interface IServiceUpdateAttributes extends IService{
}