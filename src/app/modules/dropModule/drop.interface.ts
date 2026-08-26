import { Optional } from "sequelize";

export interface IDrop {
  id: number;
  name: string;
  price: number;
  totalStock: number;
  availableStock: number;
  startTime: Date;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DropCreationAttributes extends Optional<IDrop, 'id' | 'createdAt' | 'updatedAt'> {}
