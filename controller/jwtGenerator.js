import jwt from 'jsonwebtoken';
import { config } from '../config.js';

function createJwtToken(id){
  // console.log('line 47, controller auth.js', config.jwt.secretKey);
  return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec }); /// abcde1234 => asdfasdfasdfasdfasdf
}

export default createJwtToken;