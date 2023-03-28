import express from 'express';
import profiles from './profiles';

const router = express.Router();

router.use('/api', [profiles]);

export default router;
