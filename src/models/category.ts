import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface CategoryAttributes {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class Category 
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes {


    public id!: number;
    public name!: string;
    public description?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    static initModel(sequelize: Sequelize): typeof Category {
        Category.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                }
            },
            {
                sequelize,
                tableName: 'Categories',
                modelName: 'Category',
                timestamps: true,
                paranoid: true,
            }
        );
        return Category;
    }
};