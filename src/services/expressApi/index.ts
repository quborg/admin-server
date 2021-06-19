import express from 'express';

import { emailVerification } from './routes';

const app = express();

app
  .get('/api', (req, res) => {
    res.send('Server API: "السلام عليكم Essalam Alekum !"');
  })
  .use('/api', emailVerification);

export default app;
