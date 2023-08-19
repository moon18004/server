import express from 'express';
import 'express-async-errors';
import * as commentController from '../controller/comment.js';
import { isAuth } from '../middleware/auth.js';
import {body, param, validationResult} from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
  body('text').trim().isLength({min: 3}).withMessage('Sould be at least 3 characters'),
  validate,
];

router.get('/', commentController.getComments);
router.get('/:id', commentController.getComment);
router.post('/', isAuth,validateCredential, commentController.commentCreate);
router.put('/:id', isAuth,validateCredential, commentController.updateComment);
router.get('/num/:id', commentController.getNumComments);
router.delete('/:id', isAuth, commentController.deleteComment);


export default router;


