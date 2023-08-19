import express from 'express';
import 'express-async-errors';
import * as commentController from '../controller/comment.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getComment);
router.post('/', isAuth, commentController.commentCreate);
router.put('/:id', isAuth, commentController.updateComment);
router.get('/num/:id', commentController.getNumComments);
router.delete('/:id', isAuth, commentController.deleteComment);


export default router;


