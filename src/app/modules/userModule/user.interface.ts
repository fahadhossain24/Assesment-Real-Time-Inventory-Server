import { Optional } from "sequelize";

export interface IUser  {
  id: number,
  username: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface UserCreationAttributes extends Optional<IUser, 'id' | 'createdAt' | 'updatedAt'> {}