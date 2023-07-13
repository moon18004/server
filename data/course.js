import { getCourses, useVirtualId } from '../databse/database.js';
import Mongoose from 'mongoose';

const courseSchema =  Mongoose.Schema({

  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  author: {
    type: String,
    required: true, // null 여부
    unique: false
  },
  subject: {
    type: String,
    required: true, // null 여부
    unique: false
  },
  code: {
    type: String,
    required: true, // null 여부
    unique: false
  },
  text: {
    type: String,
    required: true, // null 여부
    unique: false
  },
  reply: {
    type: Number, // Int32가 아니다. 기본 자바스크립트에는 존재하지 않으니 넘버로 해줘야 한다.
    unique: false
  },
  like: {
    type: Number, // Int32가 아니다. 기본 자바스크립트에는 존재하지 않으니 넘버로 해줘야 한다.
    unique: false
  },
  comments : {
    type: Number,
    unique: false
  }, // 옵션에 type밖에 없을 경우 간단하게 표현 할 수 있다.
  createdAt: {
    type: Date,
    default: Date.now, // 기본값
  },
});

useVirtualId(courseSchema);

const Course = Mongoose.model('course', courseSchema);

export async function getAll() {
    return Course.find().sort({createdAt: -1});
  }
  
export async function create(body,userId) {
  
  return new Course({
    author: body.author,
    subject: body.subject,
    code: body.code,
    text: body.text,
    reply: body.reply,
    like: body.like,
    comments: body.comments
  }).save();
}
  
export async function getById(id){
    return Course.findById(id)
    
}

export async function update(id, author, subject, code, text) {
  return Course.findByIdAndUpdate(id, {
    author: author,
    subject: subject,
    code: code,
    text: text
  });
}

export async function discard(id) {
  return Course.findByIdAndDelete(id);
}