import express from 'express';

// import courseRouter from './courses';
import communityRouter from './community.js';
import courseRouter from './course.js';
// import userRouter from './user.js';

const routes = express.Router();

routes.use('/community', communityRouter);
routes.use('/course', courseRouter);
// routes.use('./user', userRouter);

export default routes;