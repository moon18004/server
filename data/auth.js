import { useVirtualId } from '../databse/database.js';
import MongoDb from 'mongodb';
import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
}
export async function findByEmail(email){
  return User.findOne({email});
}

export async function createUser(user) {
  
  return new User(user).save().then((data) => data.id);
  
}

export async function findById(id) {
  return User.findById(id);
  
}