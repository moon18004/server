import express from 'express';
import 'express-async-errors';
import * as courseController from '../controller/course.js'

const router = express.Router();

router.get('/', courseController.getCourses);
router.post('/', courseController.courseCreate);
router.get('/:id', courseController.getCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;

