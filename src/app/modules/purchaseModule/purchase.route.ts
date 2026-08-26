import express from 'express';
import purchaseControllers from './purchase.controller';
import requestValidator from '../../middlewares/requestValidator';
import PurchaseValidationZodSchema from './purchase.validation';

const purchaseRouter = express.Router();


purchaseRouter.post('/purchase-item',
    requestValidator(PurchaseValidationZodSchema.createPurchaseZodSchema),
    purchaseControllers.completePurchase
);

export default purchaseRouter;
