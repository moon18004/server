import express from 'express';

// import courseRouter from './courses';
import communityRouter from './community.js';

const routes = express.Router();

routes.use('/community', communityRouter);


export default routes;