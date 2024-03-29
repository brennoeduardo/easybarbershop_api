export interface IBarberShop {
    id?: number;
    name: string;
    phone: string;
    address: string;
    description: string;
    openingHours: JSON;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBarberShopCreationAttributes extends IBarberShop{
}

export interface IBarberShopUpdateAttributes extends IBarberShop{
}