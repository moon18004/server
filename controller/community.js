
import * as communityRepository from '../data/community.js';

export async function getPosts(req, res){
  
  const data = await communityRepository.getAll();
  res.setHeader('Content-Type', 'application/json');
  
  res.status(200).json(data);
}

export async function create(req, res, next){

  const body = {
    ...req.body
  }
  const community = await communityRepository.create(body);
  res.status(201).json(community);
}