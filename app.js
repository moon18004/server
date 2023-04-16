import express from 'express';
import cors from 'cors';
import morgan from 'morga';
import helmet from ' helmet';
import 'express-async-errors';

import communityRouter from './router/community.js';
import coursesRouter from './router/courses.js';


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// app.use('/info', infoRoute);
app.use('/info', coursesRouter);
app.use('/info', communityRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
})

app.listen(8080);