import express from 'express';
import 'express-async-errors';
import * as communityController from '../controller/community.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();


export default function communityRouter(communityController){
  router.get('/', communityController.getPosts);
  router.post('/',isAuth, communityController.create);
  router.get('/:id', communityController.getPost);
  router.put('/:id',isAuth, communityController.updatePost);
  router.delete('/:id',isAuth, communityController.deletePost);
  router.put('/view/:id', communityController.increaseView);
  router.put('/num/:id', communityController.changeNumComments);

  return router;
}

// router.get('/', communityController.getPosts);
// router.post('/',isAuth, communityController.create);
// router.get('/:id', communityController.getPost);
// router.put('/:id',isAuth, communityController.updatePost);
// router.delete('/:id',isAuth, communityController.deletePost);

// export default router;

