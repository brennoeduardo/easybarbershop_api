import { IndexesOptions, ModelAttributeColumnOptions, Optional, ScopeOptions, FindOptions } from "sequelize";

/** Base interface for all entities. */
export type EntityAttributes = {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface Entity {
    id: number;
    created_at: Date;
    updated_at: Date;
}

/** Base Creation interface for all entities. */
//  Entity that fields except K are required, K is optional (partial) and id, created_at and updated_at are not allowed.
export type EntityCreationAttributes<T extends EntityAttributes, K extends keyof T = never> = Omit<T, K | 'id' | 'created_at' | 'updated_at'> & Partial<Pick<T, K>>;

/** Base Update interface for all entities. */
export type EntityUpdateAttributes<T extends EntityAttributes, K extends keyof T = never> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at' | K>>;


/** Interface for entity fields. */
export type EntityFields<T extends EntityAttributes> = {
    [key in keyof T]: ModelAttributeColumnOptions;
};

/** Interface for entity options. */
export interface EntityOptions<T extends EntityAttributes> {	
    schema?: string;
    tableName: string;
    name?: {
        plural: string;
        singular: string;
    };
    fields: EntityFields<T>;
    timestamps?: boolean;
    underscored?: boolean;
    includeId?: boolean | true;
    indexes?: IndexesOptions[];
    defaultScope?: FindOptions;
}