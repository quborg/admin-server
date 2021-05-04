import express from 'express';

import { emailVerification } from './routes';

const app = express();

app
  .get('/', function (req, res) {
    res.send('Server: "السلام عليكم Essalam Alekum !"');
  })
  .use('/api', emailVerification);

export default app;
