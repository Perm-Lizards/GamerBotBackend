import express from 'express';
import routes from './routes';
import middlewares from './middlewares';

import { PORT } from './config';

const app = express();

app.use(middlewares);
app.use(routes);

app.listen(Number(PORT), () =>
  console.log(`Server is running on ${PORT} port`)
);
