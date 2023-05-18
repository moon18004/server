import { getPosts } from '../databse/database.js';
import MongoDb from 'mongodb';

export async function getAll() {
  
  return getPosts() //
    .find()
    .sort({ createdAt: -1 })
    .toArray();
}

export async function create(body) {
  const contact = body;
  // console.log(contact);
  return getPosts().insertOne(contact);
}