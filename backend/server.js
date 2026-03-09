import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import notespaceRoutes from './routes/notespaceRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(
    `New request - Request method: ${req.method} | Request URL: ${req.url}`,
  );
  next();
});

app.use('/api/notespace', notespaceRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
