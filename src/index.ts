import express from 'express';
import routesV1 from './routes/v1';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

const dotenv = require('dotenv');
dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1', routesV1);

app.get('/health', async (req, res) => {
  res.json('bookexchangeserver healthy');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
