import express from 'express';
import 'express-async-errors';
import * as communityController from '../controller/community.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', communityController.getPosts);
router.post('/',isAuth, communityController.create);
router.get('/:id', communityController.getPost);
router.put('/:id', communityController.updatePost);
router.delete('/:id', communityController.deletePost);

export default router;

