import 'reflect-metadata';
import 'dotenv/config';
import './database';

import express from 'express';
import Debug from 'debug';
import routes from './routes';

const debug = Debug('gobarber:server');

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.NODE_PORT, () =>
  debug(`Server listening at port ${process.env.NODE_PORT}`),
);
