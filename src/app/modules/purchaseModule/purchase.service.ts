import { Transaction } from "sequelize";
import Purchase from "./purchase.model";
import sequelize from "../../../config/database";
import Reservation from "../reservationModule/reservation.model";
import CustomError from "../../errors";
import Drop from "../dropModule/drop.model";
import User from "../userModule/user.model";
import { IPurchase } from "./purchase.interface";
import { ENUM_RESERVATION_STATUS } from "../../../enums/reservation";


export class PurchaseService {
    async purchaseItem(purchaseBody: IPurchase) {
        const transaction: Transaction = await sequelize.transaction();

        try {
            // Find and Lock the Reservation row
            const reservation = await Reservation.findByPk(purchaseBody.reservationId, {
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (!reservation) {
                throw new CustomError.NotFoundError("Reservation not found");
            }

            if (reservation.userId !== purchaseBody.userId ||
                reservation.dropId !== purchaseBody.dropId ||
                reservation.id !== purchaseBody.reservationId) {
                throw new CustomError.ForbiddenError("This reservation does not belong to you.");
            }

            if (reservation.status === ENUM_RESERVATION_STATUS.CANCELLED) {
                throw new CustomError.BadRequestError("Reservation window expired. Stock has been returned to the pool.");
            }

            if (reservation.status === ENUM_RESERVATION_STATUS.PURCHASED) {
                throw new CustomError.BadRequestError("This reservation has already been claimed.");
            }

            // Mark Reservation as Purchased
            reservation.status = ENUM_RESERVATION_STATUS.PURCHASED;
            await reservation.save({ transaction });

            // Create Purchase Record
            const purchase = await Purchase.create(
                {
                    userId: purchaseBody.userId,
                    dropId: purchaseBody.dropId,
                    reservationId: purchaseBody.reservationId,
                },
                { transaction }
            );

            await transaction.commit();

            // Fetch updated Drop stock and the latest Top 3 Purchasers for live update
            const updatedDrop = await Drop.findByPk(purchaseBody.dropId, {
                attributes: ["id", "availableStock"],
                include: [
                    {
                        model: Purchase,
                        as: "purchases",
                        separate: true,
                        limit: 3,
                        order: [["createdAt", "DESC"]],
                        include: [
                            {
                                model: User,
                                as: "user",
                                attributes: ["id", "username"],
                            },
                        ],
                    },
                ],
            });

            return {
                purchase,
                updatedDrop,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}