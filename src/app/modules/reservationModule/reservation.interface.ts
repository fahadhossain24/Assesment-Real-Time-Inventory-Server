import { Optional } from "sequelize";

export interface IReservation {
  id: number;
  userId: number;
  dropId: number;
  status: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReservationCreationAttributes extends Optional<IReservation, 'id' | 'createdAt' | 'updatedAt'> {}
