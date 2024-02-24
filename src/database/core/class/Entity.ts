import { Model, DataTypes, Sequelize, BuildOptions, ModelAttributes } from "sequelize";
import { EntityAttributes, EntityCreationAttributes, EntityOptions } from "../interfaces";

/** Default base class for all entities. */
export abstract class Entity<T extends EntityAttributes, E extends EntityCreationAttributes<T>> extends Model<T, E> implements EntityAttributes {
    declare id: number;
    declare readonly created_at: Date;
    declare readonly updated_at: Date;

    public static instantiate(DB: Sequelize): void {}

    public static initialize<E extends Entity<EntityAttributes, EntityCreationAttributes<T>>, T extends EntityAttributes>(options: EntityOptions<T>, sequelize: Sequelize): void {
        const entity = this as unknown as typeof Model & { new (values?: object, options?: BuildOptions): E; };

        // Construindo os atributos do modelo
        const modelAttributes: ModelAttributes<E> = {};

        if (options.includeId) {
            modelAttributes.id = {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            };
        }

        if (options.timestamps) {
            modelAttributes.created_at = {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()')
            };
            modelAttributes.updated_at = {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()')
            };
        }

        const mergedAttributes = Object.assign({}, modelAttributes, options.fields);

        entity.init(mergedAttributes, {
            sequelize,
            ...(options.name && { name: { plural: options.name.plural, singular: options.name.singular } }),
            ...(options.schema && { schema: options.schema }),
            tableName: options.tableName,
            timestamps: options.timestamps ?? false,
            underscored: options.underscored ?? false,
            indexes: options.indexes,
            defaultScope: options.defaultScope,
        });
    }

    public static associate(): void {}
    public static setScopes(): void {}
    public static setHooks(): void {}
}
