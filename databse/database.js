import MongoDb from 'mongodb';

let db;

export async function initDb(url, callback){
  if(db){
    console.log('Db is already initialized!');
    return;
  }
  return MongoDb.MongoClient.connect(url) //
    .then((client) => db = client.db('potato'));
}

export function getPosts(){
  if(!db){
    throw Error('Db not initialized');

  }
  
  return db.collection('posts');
}