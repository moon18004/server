import express from 'express';

import communityRouter from './community.js';
import courseRouter from './course.js';
import commentRouter from './comment.js'
import swaggerRoute from './swagger.js';
import authRouter from './auth.js';
import routes from 'express'
// import userRouter from './user.js';
import { auth } from 'express-openid-connect';

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:2000',
    clientID: 'Rx477HWJgyYwKpcoYdxhMoUM0rFCaDkL',
    issuerBaseURL: 'https://dev-iw6d1r7qrpqfl8l5.us.auth0.com'
  };


  routes.use(auth(config));
  routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

const routes = express.Router();


routes.use('/', swaggerRoute);
routes.use('/community', communityRouter);
routes.use('/course', courseRouter);
routes.use('/comment', commentRouter);
routes.use('/auth', authRouter);
// routes.use('./user', userRouter);

export default routes;