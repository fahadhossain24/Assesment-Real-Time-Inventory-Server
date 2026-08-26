import { Request, Response } from "express";
import dropService from "./drop.service";
// import { Server as SocketIOServer } from "socket.io";
import asyncHandler from "../../../shared/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { FileArray } from "express-fileupload";

class DropController {
    getDrops = asyncHandler(async (req: Request, res: Response) => {
        const drops = await dropService.getAllDropsWithPurchasers();
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            status: 'success',
            message: 'Drops retrieved successfully',
            data: drops,
        });
    })

    createDrop = asyncHandler(async (req: Request, res: Response) => {
        const dropData = req.body;
        const image = req.files;
        const newDrop = await dropService.createDrop(dropData, image as FileArray);

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            status: 'success',
            message: 'Drop creation successfull',
            data: newDrop,
        });
    })
}

export default new DropController();