import { Optional } from "sequelize";

export interface IUser  {
  id: number,
  username: string,
}

export interface UserCreationAttributes extends Optional<IUser, 'id'> {}