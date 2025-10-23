import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '@/routes/index';
import connectDB from '@/config/mongodb/mongo.config';
dotenv.config({ path: '.envdev.env' });
const app = express();

const corsOptions = {
    origin: [
        'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
};

if (process.env.NODE_ENV !== 'test') {
    connectDB();
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Api working, Happy Coding');
});

app.use('/', router);

export default app;