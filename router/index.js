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
<<<<<<< HEAD
routes.use('/comment', commentRouter);
=======
routes.use('/auth', authRouter);
>>>>>>> 401dd08 (auth)
// routes.use('./user', userRouter);

export default routes;