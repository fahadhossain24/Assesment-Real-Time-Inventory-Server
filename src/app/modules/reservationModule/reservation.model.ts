import { Model, DataTypes } from "sequelize";
import { IReservation, ReservationCreationAttributes } from "./reservation.interface";
import sequelize from "../../../config/database";

class Reservation extends Model<IReservation, ReservationCreationAttributes> implements IReservation {
    declare id: number;
    declare userId: number;
    declare dropId: number;
    declare status: string;
    declare expiresAt: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dropId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Reservation',
    timestamps: true
});

export default Reservation;
