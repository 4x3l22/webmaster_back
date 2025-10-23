import { Sequelize } from 'sequelize';
import path from 'path';
import { Dialect } from 'sequelize';
import { Product } from './product';
import { Category } from './category';

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  logging?: boolean | ((sql: string, timing?: number) => void);
}

export class Database {
  private static instance: Database;
  private sequelize!: Sequelize;

  public Product = Product;
  public Category = Category;

  private constructor() {
    const env = process.env.NODE_ENV || 'development';
    const configPath = path.join(__dirname, '../config/config.json');
    const config: DBConfig = require(configPath)[env];

    this.sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: config.logging,
      }
    );

    this.initModels();
  }

  /** Singleton: garantiza una sola instancia */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /** Inicializa todos los modelos */
  private initModels(): void {
    this.Category.initModel(this.sequelize);
    this.Product.initModel(this.sequelize);
    
    // Definir relaciones
    this.Category.hasMany(this.Product, {
      foreignKey: 'categoryId',
      as: 'products'
    });
    this.Product.belongsTo(this.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  }

  /** Sincroniza los modelos con la base de datos */
  public async syncModels(force = false): Promise<void> {
    await this.sequelize.sync({ force });
    console.log('🗄️ Modelos sincronizados con la base de datos.');
  }

  /** Devuelve la instancia Sequelize (si se necesita en otro lugar) */
  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  /** Prueba de conexión */
  public async testConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
    }
  }
}
