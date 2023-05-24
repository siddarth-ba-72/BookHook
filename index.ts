import express, { Application } from 'express';
import cors from 'cors';
import { db } from './database/database';

db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database.');
});

const app: Application = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

import bookRouter from './routers/bookRoutes';

app.use('/api/bk', bookRouter);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});