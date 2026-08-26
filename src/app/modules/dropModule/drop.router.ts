import express from 'express';
import dropControllers from './drop.controller';
import requestValidator from '../../middlewares/requestValidator';
import DropValidationZodSchema from './drop.validation';

const dropRouter = express.Router();


dropRouter.post('/create', requestValidator(DropValidationZodSchema.createDropZodSchema), dropControllers.createDrop);
dropRouter.get('/retrieve/all', dropControllers.getDrops);

export default dropRouter;
