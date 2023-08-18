import * as commentRepository from '../data/comment.js';

export async function getComments(req, res){
  
  const data = await commentRepository.getAll();
  res.setHeader('Content-Type', 'application/json');

  res.status(200).json(data);
}

export async function getComment(req, res){
  const id = req.params.id;
  const comment = await commentRepository.getByPostId(id);
  console.log('getComment');
  if(comment){
    res.status(200).json([...comment]);
  }
  else{
    res.status(404).json({message: `Post ${id} not found`});
  }
}

export async function commentCreate(req, res, next){
  const {author, text, source_id, userId} = req.body;
  const body = {author, text, source_id, userId};
  const comment = await commentRepository.create(body);
  res.status(201).json(comment);
}

export async function updateComment(req, res, next){
  // console.log('line31')
  const id = req.params.id;
  // const {category, mainText, title} = req.body;
  // const body = {category, mainText, title}
  
  // const {text} = req.body;
  const body = {text: req.body.text}
  console.log(body);

  const update = await commentRepository.update(id, body);
  
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