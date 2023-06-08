import { getPosts } from '../databse/database.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getPosts() //
    .find()
    .sort({ date: -1 })
    .toArray();
}

export async function create(body) {
  const contact = body;
  // console.log(contact);
  return getPosts().insertOne(contact);
}

export async function getById(id){
  return getPosts().findOne({_id: new ObjectId(id) });
}