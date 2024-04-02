import express from 'express';
import cors from 'cors';
import { connectDb } from './config/dbConnect.js';
import router from './routes/route.js';

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/v1', router);

connectDb();