import express from 'express';
import userControllers from './user.controllers';

const userRouter = express.Router();


userRouter.post('/create', userControllers.createUser);

export default userRouter;
