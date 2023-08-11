
// import * as communityRepository from '../data/community.js';

export class CommunityController{
  constructor(communityRepository){
    this.community = communityRepository;
  };

  getPosts = async (req, res) =>{
    console.log("getPosts");
    const username = req.query.username;
    const search = req.query.search;
    const data = (username 
      ? await this.community.getAllByUsername(username)
      : search
      ? await this.community.getAllBySearch(search)
      : await this.community.getAll());
    // res.setHeader('Content-Type', 'application/json');
    res.status(200).json([...data]);
  }
  getPost = async (req, res) =>{
    const id = req.params.id;
    const post = await this.community.getById(id);
    console.log('getPost');
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message: `Post ${id} not found`});
    }
  }
  create = async (req, res, next) =>{
    const {category,title,mainText} = req.body;
    const body = {category,title,mainText};
    const community = await this.community.create(body, req.userId);
    res.status(201).json(community);
  }
  updatePost = async (req, res, next)  =>{
    const id = req.params.id;
    const {category,title,mainText} = req.body;
    const body = {category,title,mainText};
  
    const post = await this.community.getById(id);
    if(!post){
      return res.sendStatus(404);
    }
    if(post.userId !== req.userId){
      return res.sendStatus(403);
    }
    const updated = await this.community.update(id, body);
    res.status(200).json(updated);
  }
  deletePost = async (req, res, next) =>{
    const id = req.params.id;
    const post = await this.community.getById(id);
    if(!post){
      return res.sendStatus(404);
    }
    if(post.userId !== req.userId){
      return res.sendStatus(403);
    }
    await this.community.remove(id);
    res.sendStatus(204);
  }
}



// export class CommunityController{
//   constructor(communityRepository){
//     this.community = communityRepository;
//   }
// }


// export async function getPosts(req, res){
//   console.log("getPosts");
//   const username = req.query.username;
//   const search = req.query.search;
//   const data = (username 
//     ? await communityRepository.getAllByUsername(username)
//     : search
//     ? await communityRepository.getAllBySearch(search)
//     : await communityRepository.getAll());
  
//   res.setHeader('Content-Type', 'application/json');
  
//   res.status(200).json(data);
// }

// export async function getPost(req, res){
//   const id = req.params.id;
//   const post = await communityRepository.getById(id);
//   console.log('getPost');
//   if(post){
//     res.status(200).json(post);
//   }
//   else{
//     res.status(404).json({message: `Post ${id} not found`});
//   }
// }

// export async function create(req, res, next){

//   const {category,title,mainText} = req.body;
//   const body = {category,title,mainText};
//   const community = await communityRepository.create(body, req.userId);
//   res.status(201).json(community);
// }


// export async function updatePost(req, res, next) {
//   const id = req.params.id;
//   const {category,title,mainText} = req.body;
//   const body = {category,title,mainText};

//   const post = await communityRepository.getById(id);
//   if(!post){
//     return res.sendStatus(404);
//   }
//   if(post.userId !== req.userId){
//     return res.sendStatus(403);
//   }
//   // if(tweet.userId !== req.userId){
//   //   return res.sendStatus(403);
//   // }
//   const updated = await communityRepository.update(id, body);
//   res.status(200).json(updated);
// }
// export async function deletePost(req, res, next){
//   const id = req.params.id;
//   const post = await communityRepository.getById(id);
//   if(!post){
//     return res.sendStatus(404);
//   }
//   if(post.userId !== req.userId){
//     return res.sendStatus(403);
//   }
//   // if(tweet.userId !== req.userId){
//   //   return res.sendStatus(403);
//   // }
//   await communityRepository.remove(id);
//   res.sendStatus(204);
// }