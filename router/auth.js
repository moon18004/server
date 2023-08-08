import express from 'express';
import {} from 'express-async-errors';
import { validate } from '../middleware/validator.js';
import {body, param, validationResult} from 'express-validator';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('password').trim().isLength({min: 8}).withMessage('password should be at least 8 characters'),
  validate,
];
const validateSignup=[
  ...validateCredential,
  body('username').trim().isLength({min: 2}).withMessage('username should be at least 2 characters'),
  body('name').notEmpty().withMessage('name is missing'),
  body('country').notEmpty().withMessage('country is missing'),
  validate
];
const validateEmail=[
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  validate
]

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);
router.post('/email', validateEmail, authController.email);
router.get('/check/:code', authController.check);



export default router;