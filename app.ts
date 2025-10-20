import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '@/routes/index.js';
import connectDB from '@/config/mongodb/mongo.config.js';
dotenv.config({ path: '.envdev.env' }); 
const app = express();
connectDB();

const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: [
        'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Api working, Happy Coding');
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server on at port ${PORT}`);
});