import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '../.env'),
});

const { PORT } = process.env;

if (!PORT && typeof PORT === 'number') {
  throw new Error('The server port is missing or an invalid type is specified');
}

export { PORT };
