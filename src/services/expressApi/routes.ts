import { Router } from 'express';

import Controllers from './controller';

const router = Router();

export const emailVerification: Router = router.get(
  '/email-verification/:hash/:userId',
  Controllers.emailVerification
);

export default {};
