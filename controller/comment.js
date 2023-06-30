import * as commentRepository from '../data/comment.js';

export async function getComments(req, res){
  
  const data = await commentRepository.getAll();
  res.setHeader('Content-Type', 'application/json');

  res.status(200).json(data);
}

export async function getComment(req, res){
  const id = req.params.id;
  const comment = await commentRepository.getById(id);
  console.log('getComment');
  if(comment){
    res.status(200).json(comment);
  }
  else{
    res.status(404).json({message: `Post ${id} not found`});
  }
}

export async function commentCreate(req, res, next){
  const {author, subject, code, text,reply, like, comments} = req.body;
  const body = {author, subject, code, text, reply, like, comments};
  const comment = await commentRepository.create(body);
  res.status(201).json(comment);
}

export async function updateComment(req, res, next){
  const id = req.params.id;
  const {author, subject, code, text} = req.body;
  const update = await commentRepository.update(id, author, subject, code, text);
  
  if(update){
    res.status(200).json(update);
  }
  else{
    res.status(500).json({message: `Update failed. comment ${id} not found`});
  }
}

export async function deleteComment(req, res){
  const id = req.params.id;
  const comment= await commentRepository.discard(id);

  if(comment){
    res.status(200).json(comment);
  }
  else{
    res.status(404).json({message: 'No document deleted'});
  }
}