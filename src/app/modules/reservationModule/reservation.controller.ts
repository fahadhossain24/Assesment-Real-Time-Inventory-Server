import asyncHandler from "../../../shared/asyncHandler";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../errors";
import reservationService from "./reservation.service";
import { getIO } from "../../../socket/socket.configure";

class ReservationController {
    reserveItem = asyncHandler(async (req: Request, res: Response) => {
        const reservationBody = req.body;


        const { reservation, updatedAvailableStock } =
            await reservationService.reserveItem(Number(reservationBody.userId), Number(reservationBody.dropId));

        getIO().emit("stock_updated", {
            dropId: Number(reservationBody.dropId),
            availableStock: updatedAvailableStock,
        });

        // Schedule server-side 60-second recovery timer
        setTimeout(async () => {
            try {
                const result = await reservationService.expireReservation(reservation.id);
                  if (result) {
                    // Broadcast stock recovery to all tabs
                    getIO().emit("stock_updated", {
                      dropId: result.dropId,
                      availableStock: result.updatedAvailableStock,
                    });
                    getIO().emit("reservation_expired", {
                      reservationId: reservation.id,
                      dropId: result.dropId,
                    });
                  }
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