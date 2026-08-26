import { Request, Response } from "express";
import { PurchaseService } from "./purchase.service";
import asyncHandler from "../../../shared/asyncHandler";
import CustomError from "../../errors";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { getIO } from "../../../socket/socket.configure";

const purchaseService = new PurchaseService();

class PurchaseController {
    completePurchase = asyncHandler(async (req: Request, res: Response) => {
        const purchaseBody = req.body;

        const { purchase, updatedDrop } = await purchaseService.purchaseItem(purchaseBody);

        if(updatedDrop) {
            getIO().emit("purchase_completed", {
                dropId: updatedDrop.id,
                availableStock: updatedDrop.availableStock,
                recentPurchasers: updatedDrop,
            });
        }

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            status: 'success',
            message: "Purchase completed successfully!",
            data: purchase,
        });
    })
}

export default new PurchaseController();