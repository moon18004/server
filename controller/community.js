
import * as communityRepository from '../data/community.js';

export async function getPosts(req, res){
  console.log("getPosts");
  const username = req.query.username;
  const search = req.query.search;
  const data = (username 
    ? await communityRepository.getAllByUsername(username)
    : search
    ? await communityRepository.getAllBySearch(search)
    : await communityRepository.getAll());
  
  res.setHeader('Content-Type', 'application/json');
  
  res.status(200).json(data);
}

export async function getPost(req, res){
  const id = req.params.id;
  const post = await communityRepository.getById(id);
  console.log('getPost');
  if(post){
    res.status(200).json(post);
  }
  else{
    res.status(404).json({message: `Post ${id} not found`});
  }
}

export async function create(req, res, next){

  const {category,title,mainText,views,comments, author,cat_id} = req.body;
  const body = {category,title,mainText,views,comments, author,cat_id};
  const community = await communityRepository.create(body);
  res.status(201).json(community);
}


export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;

  const post = await communityRepository.getById(id);
  if(!post){
    return res.sendStatus(404);
  }
  // if(tweet.userId !== req.userId){
  //   return res.sendStatus(403);
  // }
  const updated = await communityRepository.update(id, text);
  res.status(200).json(updated);
}
export async function deletePost(req, res, next){
  const id = req.params.id;
  const post = await communityRepository.getById(id);
  if(!post){
    return res.sendStatus(404);
  }
  // if(tweet.userId !== req.userId){
  //   return res.sendStatus(403);
  // }
  await communityRepository.remove(id);
  res.sendStatus(204);
}