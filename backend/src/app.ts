import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

// import * as swaggerDocument from '../src/swagger/openapi.json';

import { swaggerSpec } from './swagger/swagger.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import routes from './routes/index.js';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);

app.use(errorMiddleware);
