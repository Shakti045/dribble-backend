import express from 'express';
import cors from 'cors';
import { connectDb } from './config/dbConnect.js';
import router from './routes/route.js';
import dotenv from 'dotenv';
dotenv.config({
    path: '.env',
});

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/v1', router);

connectDb();
