import express from 'express';
import profiles from './profiles';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

const router = express.Router();

router.use('/api', [profiles]);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default router;
