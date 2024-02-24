import { CreateOptions, BulkCreateOptions, UpdateOptions, UpsertOptions, SaveOptions } from "sequelize";

export interface CreateDataOptions<A> extends CreateOptions<A> {
    user_id?: number;
}
export interface BulkCreateDataOptions<A> extends BulkCreateOptions<A> {
    user_id?: number;
}

export interface UpdateDataOptions<A> extends UpdateOptions<A> {
    user_id?: number;
}

export interface UpsertDataOptions extends UpsertOptions {
    user_id?: number;
}

export interface SaveDataOptions extends SaveOptions {
    user_id?: number;
}