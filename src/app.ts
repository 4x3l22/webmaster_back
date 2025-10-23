import express, { Express } from 'express';
import router from './routes/auth.routes';

class Server{
    private app: Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
    }

    public routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        this.app.use('/api', router);
    }

    public start() {
        this.routes();
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const server = new Server();
server.start();