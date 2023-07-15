import express from 'express';
import 'express-async-errors';
import * as courseController from '../controller/course.js'
import {body, param, validationResult} from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const course = [
    body('author').notEmpty().withMessage('author missing'),
    body('subject').notEmpty().withMessage('subject missing'),
    body('code').notEmpty().isEmail().withMessage('code missing'),
    body('text').notEmpty().withMessage('text is necessary'),
    validate
];

const router = express.Router();

router.get('/', courseController.getCourses);
router.post('/', course, isAuth, courseController.courseCreate);
router.get('/:id', courseController.getCourse);
router.put('/:id', course, isAuth, courseController.updateCourse);
router.delete('/:id', isAuth, courseController.deleteCourse);

export default router;



