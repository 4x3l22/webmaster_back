import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import { Database } from './models';

class Server{
    private app: Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.initDatabase();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async initDatabase() {
        const db = Database.getInstance();
        await db.testConnection();
    }

    public routes() {
        this.app.use('/api/auth', router);
        this.app.use('/api/categories', categoryRoutes);
        this.app.use('/api/products', productRoutes);
    }

    public start() {
        this.routes();
        this.app.listen(this.port, () => {
            console.log(`🚀 Server is running on port ${this.port}`);
        });
    }
}

const server = new Server();
server.start();