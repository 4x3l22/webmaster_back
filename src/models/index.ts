import { Sequelize } from 'sequelize';
import { Dialect } from 'sequelize';
import { Product } from './product';
import { Category } from './category';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
  private static instance: Database;
  private sequelize!: Sequelize;

  public Product = Product;
  public Category = Category;

  private constructor() {
    const database = process.env.DB_NAME as string;
    const username = process.env.DB_USER as string;
    const password = process.env.DB_PASSWORD as string;
    const host = process.env.DB_HOST as string;
    const port = parseInt(process.env.DB_PORT as string);
    const isProduction = process.env.NODE_ENV as string;

    this.sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect: 'postgres' as Dialect,
      logging: !isProduction ? console.log : false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    this.initModels();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private initModels(): void {
    this.Category.initModel(this.sequelize);
    this.Product.initModel(this.sequelize);
    
    this.Category.hasMany(this.Product, {
      foreignKey: 'categoryId',
      as: 'products'
    });
    this.Product.belongsTo(this.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  }

  public async syncModels(force = false): Promise<void> {
    await this.sequelize.sync({ force });
    console.log('🗄️ Modelos sincronizados con la base de datos.');
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public async testConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
    }
  }
}
