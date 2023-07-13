import express from 'express';
import 'express-async-errors';
import * as courseController from '../controller/course.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', courseController.getCourses);
router.post('/', isAuth, courseController.courseCreate);
router.get('/:id', courseController.getCourse);
router.put('/:id', isAuth, courseController.updateCourse);
router.delete('/:id', isAuth, courseController.deleteCourse);

export default router;

