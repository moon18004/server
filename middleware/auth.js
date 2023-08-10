import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
// import { config } from 'dotenv';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  // console.log("dfa");
  
  const authHeader = req.get('Authorization'); //{ "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjA4MGJmMTkzNDA4MTczMTE5YjZhYyIsImlhdCI6MTY4OTI4ODg5NSwiZXhwIjoxNjg5Mzc1Mjk1fQ.8-PhIknQJbGDh6W9KS5iYE3DHKwdybbNuTDt6K5TQWU" }
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  // TODO: Make it secure!
  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decoded.id) || await userRepository.findOauthById(decoded.id);

      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id; // req.customData
      req.token = token;
      next();
    }
  );
};
