import express from 'express';

import communityRouter from './community.js';
import courseRouter from './course.js';
import commentRouter from './comment.js'
import swaggerRoute from './swagger.js';
import authRouter from './auth.js';
// import userRouter from './user.js';

const routes = express.Router();

routes.use('/', swaggerRoute);
routes.use('/community', communityRouter);
routes.use('/course', courseRouter);
routes.use('/comment', commentRouter);
routes.use('/auth', authRouter);
// routes.use('./user', userRouter);

export default routes;