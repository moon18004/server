
import * as courseRepository from '../data/course.js';

export async function getCourses(req, res){
  
  const data = await courseRepository.getAll();
  res.setHeader('Content-Type', 'application/json');

  // const filtered = data.filter((item)=> {
  //   return item.nick === name;
  // })
  
  res.status(200).json(data);
}

export async function getCourse(req, res){
  const id = req.params.id;
  const course = await courseRepository.getById(id);
  console.log('getCourse');
  if(course){
    res.status(200).json(course);
  }
  else{
    res.status(404).json({message: `Post ${id} not found`});
  }
}

export async function courseCreate(req, res, next){

  const body = {
    ...req.body
  }
  const course = await courseRepository.create(body);
  res.status(201).json(course);
}

export async function updateCourse(req, res, next){
  const id = req.params.id;
  const {nick, subject, code, text} = req.body;
  const update = await courseRepository.update(id, nick, subject, code, text);
  
  if(update){
    res.status(200).json(update);
  }
  else{
    res.status(500).json({message: `Update failed. course ${id} not found`});
  }
}

export async function deleteCourse(req, res){
  const id = req.params.id;
  const course= await courseRepository.discard(id);

  if(course){
    res.status(200).json(course);
  }
  else{
    res.status(404).json({message: 'No document deleted'});
  }
}