import { Transaction } from "sequelize";
import sequelize from "../../../config/database";
import CustomError from "../../errors";
import Reservation from "../reservationModule/reservation.model";
import Drop from "../dropModule/drop.model";
import { ENUM_RESERVATION_STATUS } from "../../../enums/reservation";

class ReservationService {
    async reserveItem(userId: number, dropId: number) {
        const transaction: Transaction = await sequelize.transaction();

        try {
            // Lock the drop row until transaction commits
            const drop = await Drop.findByPk(dropId, {
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (!drop) {
                throw new CustomError.NotFoundError("Drop not found");
            }

            // Check if drop has officially started
            if (new Date() < new Date(drop.startTime)) {
                throw new CustomError.BadRequestError("Drop has not started yet.");
            }

            // Prevent overselling check
            if (drop.availableStock <= 0) {
                throw new CustomError.BadRequestError("Item is sold out or currently reserved by another user.");
            }

            // Decrement available stock atomically
            drop.availableStock -= 1;
            await drop.save({ transaction });

            // Create reservation record with 60-second expiration window
            const expiresAt = new Date(Date.now() + 60 * 1000);
            const reservation = await Reservation.create(
                {
                    userId,
                    dropId,
                    status: ENUM_RESERVATION_STATUS.PENDING,
                    expiresAt,
                },
                { transaction }
            );

            await transaction.commit();

            return {
                reservation,
                updatedAvailableStock: drop.availableStock,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async expireReservation(reservationId: number) {
        const transaction: Transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findByPk(reservationId, {
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (!reservation || reservation.status !== ENUM_RESERVATION_STATUS.PENDING) {
                await transaction.rollback();
                return null; // Already processed or invalid
            }

            // Mark reservation as expired
            reservation.status = ENUM_RESERVATION_STATUS.CANCELLED;
            await reservation.save({ transaction });

            // Return 1 unit back to available stock
            const drop = await Drop.findByPk(reservation.dropId, {
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (drop) {
                drop.availableStock += 1;
                await drop.save({ transaction });
            }

            await transaction.commit();

            return {
                dropId: reservation.dropId,
                updatedAvailableStock: drop ? drop.availableStock : null,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new ReservationService();