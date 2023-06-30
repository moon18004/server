import express from 'express';
import 'express-async-errors';
import * as commentController from '../controller/comment.js'

const router = express.Router();

router.get('/', commentController.getComments);
router.post('/', commentController.commentCreate);
router.get('/:id', commentController.getComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;