import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database/connection';

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json())

app.listen(3333);
