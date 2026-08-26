import { DataTypes, Model } from "sequelize";
import { IUser, UserCreationAttributes } from "./user.interface";
import sequelize from "../../../config/database";

class User extends Model<IUser, UserCreationAttributes> implements IUser {
    declare id: number;
    declare username: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});

export default User;