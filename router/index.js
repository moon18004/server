import express from 'express';

import communityRouter from './community.js';
import courseRouter from './course.js';
import commentRouter from './comment.js'
import swaggerRoute from './swagger.js';
import authRouter from './auth.js';
import routes from 'express'
// import userRouter from './user.js';
<<<<<<< HEAD
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
=======
import pkg from 'express-openid-connect';
import * as oauth from '../controller/oauth.js';
const { requiresAuth, auth } = pkg;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080/',
  clientID: 'tCugCzlHSCNbsWPRn2tLcHhrsfRM9FjY',
  issuerBaseURL: 'https://dev-r1j351qlttd53v8o.us.auth0.com'
};

>>>>>>> 731ce56c1ef4173aa4e678801cb86dc80bf0790b

const routes = express.Router();
routes.use(auth(config));
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
routes.get('/profile', requiresAuth(), oauth.signup
  // (req, res) => { res.send(JSON.stringify(req.oidc.user));  }
);


routes.use('/', swaggerRoute);
routes.use('/community', communityRouter);
routes.use('/course', courseRouter);
routes.use('/comment', commentRouter);
routes.use('/auth', authRouter);
// routes.use('./user', userRouter);

export default routes;