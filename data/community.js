import { getPosts, useVirtualId } from '../databse/database.js';
import MongoDb from 'mongodb';
import Mongoose from 'mongoose';

const ObjectId = MongoDb.ObjectId;

const postSchema= new Mongoose.Schema(
  {
    category: {type: String, required: true},
    title: {type: String, required: true},
    mainText: {type: String, required: true},
    views: {type: Number, required: true},
    comments : {type: Number, required: true},
    author: {type: String, required: true},
    cat_id: {type: String, required: true}

  },
  {timestamps: true}
)
useVirtualId(postSchema);

const Post = Mongoose.model('Post', postSchema);

export async function getAll() {

  return Post.find().sort({createdAt: -1});
  // return getPosts() //
  //   .find()
  //   .sort({ date: -1 })
  //   .toArray();
}

export async function create(body) {
  return new Post({...body}).save();
  // const contact = body;
  // console.log(contact);
  // return getPosts().insertOne(contact);
}

export async function getById(id){
  return Post.findById(id)
  // return getPosts().findOne({_id: new ObjectId(id) });
}