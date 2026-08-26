import asyncHandler from "../../../shared/asyncHandler";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../errors";
import reservationService from "./reservation.service";

class ReservationController {
    reserveItem = asyncHandler(async (req: Request, res: Response) => {
        const reservationBody = req.body;


        const { reservation, updatedAvailableStock } =
            await reservationService.reserveItem(Number(reservationBody.userId), Number(reservationBody.dropId));

        // Schedule server-side 60-second recovery timer
        setTimeout(async () => {
            try {
                await reservationService.expireReservation(reservation.id);
            } catch (err) {
                console.error("Error executing expiration worker:", err);
            }
        }, 60 * 1000);

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            status: 'success',
            message: "Item reserved for 60 seconds",
            data: reservation,
        });
    })
}

export default new ReservationController();