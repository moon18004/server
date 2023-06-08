
import * as communityRepository from '../data/community.js';

export async function getPosts(req, res){
  
  const data = await communityRepository.getAll();
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

  const body = {
    ...req.body
  }
  const community = await communityRepository.create(body);
  res.status(201).json(community);
}