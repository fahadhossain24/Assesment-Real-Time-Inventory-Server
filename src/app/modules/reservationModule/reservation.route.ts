import express from 'express';
import reservationControllers from './reservation.controller';
import requestValidator from '../../middlewares/requestValidator';
import ReservationValidationZodSchema from './reservation.validation';

const reservationRouter = express.Router();


reservationRouter.post('/reserve-item',
    requestValidator(ReservationValidationZodSchema.createReservationZodSchema),
    reservationControllers.reserveItem
);

export default reservationRouter;
