import { useVirtualId } from '../databse/database.js';
import Mongoose from 'mongoose';

const commentSchema =  Mongoose.Schema(
  {// _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  author: {
    type: String,
    required: true, // null 여부
    unique: false
  },

  text: {
    type: String,
    required: true, // null 여부
    unique: false
  },
  source_id: {
    type: String,
    required: true
  },
  userId:{
    type: String,
    required:true
  }},
  
  {timestamps: true}
  );

useVirtualId(commentSchema);

const Comment = Mongoose.model('comment', commentSchema);

export async function getAll() {
    return Comment.find().sort({createdAt: -1});
  }
  
export async function create(body) {
  return new Comment({
    author: body.author,
    text: body.text,
    source_id: body.source_id,
    userId : body.userId
  }).save();
}

export async function getNumComments(id){
  const num =  Comment.find({source_id : id}).sort({createdAt: -1});
  console.log(num);
}
  
export async function getByPostId(id){
    // return Comment.findById(id)
    return Comment.find({source_id : id}).sort({createdAt: -1});
}

export async function update(id, body) {
  return Comment.findByIdAndUpdate(id, {
    text : body.text
  });
}

export async function discard(id) {
  return Comment.findByIdAndDelete(id);
}