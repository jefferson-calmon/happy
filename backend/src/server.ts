import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import routes from './routes';
import cors from 'cors';

import errorHandler from './errors/handler'

import './database/connection';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(process.env.PORT || 3333);
