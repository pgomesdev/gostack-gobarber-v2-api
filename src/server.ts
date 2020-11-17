import 'dotenv/config';
import './database';

import express from 'express';
import Debug from 'debug';

const debug = Debug('gobarber:server');

const app = express();

app.get('/', (req, res) => res.json({ message: 'App is runnning...' }));

app.listen(process.env.NODE_PORT, () =>
  debug(`Server listening at port ${process.env.NODE_PORT}`),
);
