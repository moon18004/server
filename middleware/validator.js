import {body, validationResult} from 'express-validator';


export const validate = (req, res, next) => {
  console.log(`${req.body.email} line 5`);
  const error = validationResult(req);
  if(error.isEmpty()){
    return next();
  }
  return res.status(400).json({message: error.array()[0].msg});
}
