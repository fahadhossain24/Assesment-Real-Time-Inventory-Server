import { Model, DataTypes } from "sequelize";
import { IReservation, ReservationCreationAttributes } from "./reservation.interface";
import sequelize from "../../../config/database";
import { ENUM_RESERVATION_STATUS } from "../../../enums/reservation";
import User from "../userModule/user.model";
import Drop from "../dropModule/drop.model";

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
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    dropId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'drops',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM(...Object.values(ENUM_RESERVATION_STATUS)),
        allowNull: false,
        defaultValue: ENUM_RESERVATION_STATUS.PENDING
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

Reservation.belongsTo(User, {foreignKey: 'userId', as: 'user'});
Reservation.belongsTo(Drop, {foreignKey: 'dropId', as: 'drop'});

export default Reservation;
