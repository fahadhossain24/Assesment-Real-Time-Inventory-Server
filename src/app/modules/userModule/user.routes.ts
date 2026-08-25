import express from 'express';
import userControllers from './user.controllers';
import UserValidationZodSchema from './user.validation';
import requestValidator from '../../middlewares/requestValidator';

const userRouter = express.Router();


userRouter.post(
  '/create',
  requestValidator(UserValidationZodSchema.createUserZodSchema),
  userControllers.createUser
);

export default userRouter;
