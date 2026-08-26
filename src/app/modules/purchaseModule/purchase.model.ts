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
        allowNull: false
    },
    dropId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Purchase',
    timestamps: true
});

export default Purchase;
