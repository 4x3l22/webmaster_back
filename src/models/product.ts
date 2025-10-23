import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ProductAttributes {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  imageUrl?: string;
  size?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'imageUrl' | 'size' | 'color' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public categoryId!: number;
  public price!: number;
  public stock!: number;
  public imageUrl?: string;
  public size?: string;
  public color?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initModel(sequelize: Sequelize): typeof Product {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        size: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        color: {
          type: DataTypes.STRING(50),
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
        },
      },
      {
        sequelize,
        tableName: 'Products',
        modelName: 'Product',
        timestamps: true,
        paranoid: true, 
      }
    );

    return Product;
  }
}
