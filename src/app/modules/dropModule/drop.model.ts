import { DataTypes, Model } from "sequelize";
import { IDrop, DropCreationAttributes } from "./drop.interface";
import sequelize from "../../../config/database";

class Drop extends Model<IDrop, DropCreationAttributes> implements IDrop {
    declare id: number;
    declare name: string;
    declare price: number;
    declare totalStock: number;
    declare availableStock: number;
    declare startTime: Date;
    declare imageUrl: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Drop.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    totalStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Drop',
    timestamps: true
});

export default Drop;
