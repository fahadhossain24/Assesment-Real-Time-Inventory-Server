import express from 'express';
import userRouter from '../modules/userModule/user.routes';
import dropRouter from '../modules/dropModule/drop.router';
import reservationRouter from '../modules/reservationModule/reservation.route';
import purchaseRouter from '../modules/purchaseModule/purchase.route';

const routersVersionOne = express.Router();

// user
routersVersionOne.use('/user', userRouter);
routersVersionOne.use('/drop', dropRouter);
routersVersionOne.use('/reservation', reservationRouter);
routersVersionOne.use('/purchase', purchaseRouter);



export default routersVersionOne;
