import { Model, DataTypes } from "sequelize";
import { IPurchase, PurchaseCreationAttributes } from "./purchase.interface";
import sequelize from "../../../config/database";
import User from "../userModule/user.model";
import Drop from "../dropModule/drop.model";
import Reservation from "../reservationModule/reservation.model";

class Purchase extends Model<IPurchase, PurchaseCreationAttributes> implements IPurchase {
    declare id: number;
    declare userId: number;
    declare dropId: number;
    declare reservationId: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Purchase.init({
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
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'reservations',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'Purchase',
    timestamps: true
});

Purchase.belongsTo(User, {foreignKey: 'userId', as: 'user'});
Purchase.belongsTo(Drop, {foreignKey: 'dropId', as: 'drop'});
Purchase.belongsTo(Reservation, {foreignKey: 'reservationId', as: 'reservation'});

export default Purchase;
