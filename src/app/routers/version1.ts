import express from 'express';
import userRouter from '../modules/userModule/user.routes';

const routersVersionOne = express.Router();

// user
routersVersionOne.use('/user', userRouter);


export default routersVersionOne;
