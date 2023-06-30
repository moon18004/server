import { useVirtualId } from '../databse/database.js';
import Mongoose from 'mongoose';

const commentSchema =  Mongoose.Schema({

  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
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

  createdAt: {
    type: Date,
    default: Date.now, // 기본값
  },

  source_id: {
    type: String,
    required: true
  }
});

useVirtualId(commentSchema);

const Comment = Mongoose.model('comment', commentSchema);

export async function getAll() {
    return Comment.find().sort({createdAt: -1});
  }
  
export async function create(body) {
  return new Comment({
    author: body.author,
    text: body.text,
    source_id: body.source_id
  }).save();
}
  
export async function getById(id){
    return Comment.findById(id)
    
}

export async function update(id, text) {
  return Comment.findByIdAndUpdate(id, {
    author: author,
    text: text
  });
}

export async function discard(id) {
  return Comment.findByIdAndDelete(id);
}