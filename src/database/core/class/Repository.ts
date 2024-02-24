import { Entity } from "./Entity";
import { MakeNullishOptional } from "sequelize/types/utils";
import { BulkCreateDataOptions, CreateDataOptions, UpdateDataOptions } from "../interfaces/options";
import { ModelStatic, FindOptions, FindOrCreateOptions, BulkCreateOptions, UpsertOptions, UpdateOptions, WhereOptions, DestroyOptions, AggregateOptions } from "sequelize";
import { EntityAttributes, EntityCreationAttributes, IRepository } from "../interfaces";

/** Default base repository for all entities. */
export abstract class BaseRepository<
  T extends Entity<A, C>,
  A extends EntityAttributes,
  C extends EntityCreationAttributes<A>
> 
implements IRepository<T, A, C> {

    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }
    updateById(id: number, data: Partial<A>, options?: UpdateOptions<A> | undefined): Promise<[number]> {
        throw new Error("Method not implemented.");
    }
    updateAndReturnById(id: number, data: Partial<A>, options: UpdateOptions<A>): Promise<[number, T | null]> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number, options: DestroyOptions<A>): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public unscoped(): BaseRepository<T, A, C> {
        const unscopedModel = this.model.unscoped();

        const scopedRepository = this.constructor as any;
        const newInstance = new scopedRepository(unscopedModel);
        newInstance.model = unscopedModel;

        return newInstance
    }
    public scope(name: string): BaseRepository<T, A, C> {
        const scopedModel = this.model.scope(name);

        const scopedRepository = this.constructor as any;
        const newInstance = new scopedRepository(scopedModel);
        newInstance.model = scopedModel;

        return newInstance
    }

    public async aggregate(field: '*' | keyof A, aggr_func: string, options?: AggregateOptions< T[], A | undefined >): Promise<T[]> {
        return await this.model.aggregate(field, aggr_func, options)
    }

    public async findAll(options?: FindOptions<A>): Promise<T[]> {
        return await this.model.findAll(options || {});
    }

    public async findById(id: number | string, options?: FindOptions<A>): Promise<T | null> {
        return await this.model.findByPk(id, options);
    }

    public async findOne(options: FindOptions<A>): Promise<T | null> {
        if (!options.where) throw new Error("Where condition is required");
        return await this.model.findOne(options);
    }

    public async findOrCreate(options: FindOrCreateOptions<A, MakeNullishOptional<C>>): Promise<[T, boolean]> {
        if (!options.where) throw new Error("Where condition is required");
        return await this.model.findOrCreate(options) as [T, boolean];
    }

    public async findAndCountAll(options?: FindOptions<A>): Promise<{rows: T[], count: number}> {
        return await this.model.findAndCountAll(options);
    }

    public async count(options?: FindOptions): Promise<number> {
        return await this.model.count(options);
    }

    public async create(data: MakeNullishOptional<C>, options?: CreateDataOptions<A>): Promise<T> {
       return await this.model.create(data, options) as T;
    }

    public async bulkCreate(data: MakeNullishOptional<C>[], options?: BulkCreateDataOptions<A>): Promise<T[]> {
        return await this.model.bulkCreate(data, options) as T[];
    }

    public async recursiveBulkCreate(data: MakeNullishOptional<C>[], options?: BulkCreateOptions<A>): Promise<T[]> {
        return await this.model.bulkCreate(data, options);
    }

    public async upsert(data: MakeNullishOptional<C>, options?: UpsertOptions<A>): Promise<T> {
        const [model] = await this.model.upsert(data, options);
        return model;
    }

    public async bulkUpsert(data: MakeNullishOptional<C>[], options?: UpsertOptions<A>): Promise<T[]> {
        let entries = []
        for (let item of data) {
            const [model] = await this.model.upsert(item, options);
            entries.push(model.toJSON());
        }
        return entries;
    }

    public async update(data: Partial<A>, options: Omit<UpdateDataOptions<A>, 'returning'>): Promise<[number]> {
        const [affectedCount] = await this.model.update(data, { ...options, returning: true, where: options.where });
        return [affectedCount];
    }

    public async updateAndReturn(data: Partial<A>, options: Omit<UpdateDataOptions<A>, 'returning'>): Promise<[number, T[]]> {
        return await this.model.update(data, { ...options, returning: true, where: options.where });
    }
    
    // public async updateById(id: number, data: Partial<A>, options?: Omit<UpdateDataOptions<A>, 'returning' | 'where'>): Promise<number> {
    //     const whereClause: WhereOptions<A> = { id } as WhereOptions<A>;
    //     return await this.update(data, { where: whereClause, ...options });
    // }

    // public async updateAndReturnById(id: number , data: Partial<A>, options?: Omit<UpdateDataOptions<A>, 'returning' | 'where'>): Promise<[number, T | null]> {
    //     const whereClause: WhereOptions<A> = { id } as WhereOptions<A>;
    //     const [count, m] = await this.updateAndReturn(data, {...options, where: whereClause})
    //     return [count, count > 0 ? m[0] : null]
    // }

    public async delete(options: DestroyOptions<A>): Promise<number> {
        if (!options.where) throw new Error("Where condition is required");
        return await this.model.destroy(options) as number;
    }

    // public async deleteById(id: number, options?: DestroyOptions<A>): Promise<number> {
    //     const whereClause: WhereOptions<A> = { id } as WhereOptions<A>;
    //     return await this.delete({ where: whereClause, ...options });
    // }

    // public async toggle(id: number, options?: Omit<UpdateDataOptions<A>, 'returning' | 'where'>): Promise<[number]> {
    //     const element = await this.findById(id);
    //     if (!element) throw new Error(`${this.model.name} não encontrado(a)`);
    //     if (!('ativo' in element)) throw new Error("Atributo 'ativo' não encontrado");
    //     const ativoState = { ativo: !element.ativo };
    //     return await this.updateById(id, ativoState as unknown as Partial<A>, options);
    // }
}