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
  //시간 생성
  {timestamps: true}
)
useVirtualId(postSchema);

const Post = Mongoose.model('Post', postSchema);

export async function getAll() {
  console.log("getAll");
  return Post.find().sort({createdAt: -1});
  // return getPosts() //
  //   .find()
  //   .sort({ date: -1 })
  //   .toArray();
}

export async function create(body) {
  
  
  return new Post({
    category: "question",
    title: body.title,
    mainText: body.mainText,
    views: 0,
    comments : 0,
    author: body.author,
    cat_id: "질문",
  }).save();
  // return new Post({body}).save();
  // const contact = body;
  // console.log(contact);
  // return getPosts().insertOne(contact);
}

export async function getById(id){
  return Post.findById(id)
  // return getPosts().findOne({_id: new ObjectId(id) });
}

export async function getAllByUsername(author){
  console.log(author);
  // const author = author.low
  return Post.find({author: {$regex: author, $options: "i"}}).sort({createdAt:-1});
}
export async function getAllBySearch(search){
  // const filteredByTitle = Post.find({title: search}).sort({createdAt:-1});
  // console.log(filteredByTitle);
  // const filteredBymainText = Post.find({mainText: search}).sort({createdAt:-1});
  // const filtered = new Set([...filteredByTitle, ...filteredBymainText].sort({createdAt:-1}));
  // const filtered = Post.find({title: {$regex: search, $options: "i"}}).find({mainText: {$search : search}}).sort({createdAt: -1});
  const filtered = Post.find({title: {$regex: search, $options: "i"}}).sort({createdAt: -1});
  console.log(filtered);
  return filtered;

}

export async function update(id, mainText) {
  return Post.findByIdAndUpdate(id, { mainText }, { returnOriginal: false });
}
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}

