import express from 'express';
import { get, getById } from '../handlers/profilesHandler';

const router = express.Router();

router.route('/profiles').get(get).post().put().delete();

router.route('/profiles/:id').get(getById);

export default router;
