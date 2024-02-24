import { Model, FindOptions, CountOptions, CreateOptions, BulkCreateOptions, UpdateOptions, DestroyOptions, UpsertOptions, FindOrCreateOptions, Attributes } from 'sequelize';
import { Entity, EntityAttributes, EntityCreationAttributes } from './entity';
import { MakeNullishOptional } from 'sequelize/lib/utils';

export interface IRepository<
    M extends Entity, 
    A extends EntityAttributes, 
    C extends EntityCreationAttributes<A>
> {
    findAll(options?: FindOptions<A>): Promise<M[]>;
    findById(id: number, options?: FindOptions<A>): Promise<M | null>;
    findOne(options?: FindOptions<A>): Promise<M | null>;
    findOrCreate(options?: FindOrCreateOptions<A, FindOrCreateOptions<C>>): Promise<[M, boolean]>;
    findAndCountAll(options?: FindOptions<A>): Promise<{rows: M[], count: number}>;
    count(options?: CountOptions): Promise<number>;
    create(data: CreateOptions<C>, options?: CreateOptions<A>): Promise<M>;
    bulkCreate(data: BulkCreateOptions<C>[], options?: BulkCreateOptions<A>): Promise<M[]>;
    update(data: Partial<A>, options: UpdateOptions<A>): Promise<[number]>;
    updateAndReturn(data: Partial<A>, options: UpdateOptions<A>): Promise<[number, M[]]>;
    updateById(id: number, data: Partial<A>, options?: UpdateOptions<A>): Promise<[number]>;
    updateAndReturnById(id: number, data: Partial<A>, options: UpdateOptions<A>): Promise<[number, M | null]>;
    delete(options: DestroyOptions<A>): Promise<number>; 
    deleteById(id: number, options: DestroyOptions<A>): Promise<number>;

}