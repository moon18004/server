import {validationResult} from 'express-validator';


export const validate = (req, res, next) => {
  console.log(req.body);
  const error = validationResult(req);
  if(error.isEmpty()){
    return next();
  }
  return res.status(400).json({message: error.array()[0].msg});
}

export const course = [
  body('author').notEmpty().withMessage('author missing'),
  body('subject').notEmpty().withMessage('subject missing'),
  body('code').notEmpty().isEmail().withMessage('code missing'),
  body('text').notEmpty().withMessage('text is necessary'),
  
  validate
];
