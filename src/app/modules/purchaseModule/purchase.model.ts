import { Model, DataTypes } from "sequelize";
import { IPurchase, PurchaseCreationAttributes } from "./purchase.interface";
import sequelize from "../../../config/database";

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
    tableName: 'purchases',
    timestamps: true
});


export default Purchase;
