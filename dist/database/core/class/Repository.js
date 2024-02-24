"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
/** Default base repository for all entities. */
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    updateById(id, data, options) {
        throw new Error("Method not implemented.");
    }
    updateAndReturnById(id, data, options) {
        throw new Error("Method not implemented.");
    }
    deleteById(id, options) {
        throw new Error("Method not implemented.");
    }
    unscoped() {
        const unscopedModel = this.model.unscoped();
        const scopedRepository = this.constructor;
        const newInstance = new scopedRepository(unscopedModel);
        newInstance.model = unscopedModel;
        return newInstance;
    }
    scope(name) {
        const scopedModel = this.model.scope(name);
        const scopedRepository = this.constructor;
        const newInstance = new scopedRepository(scopedModel);
        newInstance.model = scopedModel;
        return newInstance;
    }
    async aggregate(field, aggr_func, options) {
        return await this.model.aggregate(field, aggr_func, options);
    }
    async findAll(options) {
        return await this.model.findAll(options || {});
    }
    async findById(id, options) {
        return await this.model.findByPk(id, options);
    }
    async findOne(options) {
        if (!options.where)
            throw new Error("Where condition is required");
        return await this.model.findOne(options);
    }
    async findOrCreate(options) {
        if (!options.where)
            throw new Error("Where condition is required");
        return await this.model.findOrCreate(options);
    }
    async findAndCountAll(options) {
        return await this.model.findAndCountAll(options);
    }
    async count(options) {
        return await this.model.count(options);
    }
    async create(data, options) {
        return await this.model.create(data, options);
    }
    async bulkCreate(data, options) {
        return await this.model.bulkCreate(data, options);
    }
    async recursiveBulkCreate(data, options) {
        return await this.model.bulkCreate(data, options);
    }
    async upsert(data, options) {
        const [model] = await this.model.upsert(data, options);
        return model;
    }
    async bulkUpsert(data, options) {
        let entries = [];
        for (let item of data) {
            const [model] = await this.model.upsert(item, options);
            entries.push(model.toJSON());
        }
        return entries;
    }
    async update(data, options) {
        const [affectedCount] = await this.model.update(data, { ...options, returning: true, where: options.where });
        return [affectedCount];
    }
    async updateAndReturn(data, options) {
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
    async delete(options) {
        if (!options.where)
            throw new Error("Where condition is required");
        return await this.model.destroy(options);
    }
}
exports.BaseRepository = BaseRepository;
