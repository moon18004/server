import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import 'express-async-errors';
import {initDb}  from './databse/database.js';
import { config } from './config.js';
import * as dotenv from 'dotenv';

import router from './router/index.js'

dotenv.config();
const url = process.env.URI;
const port = 8080;


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// app.use('/info', infoRoute);
app.use('/', router);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
initDb().then(()=>{
  const server = app.listen(config.host.port, () =>{
    console.log('Server is runing on port 8080');
  })
  // console.log('asdf');
  // app.listen(port, () =>{
  //   console.log('Server is runing on port 8080');
  // } )
}).catch(console.error);
