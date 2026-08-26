export interface IPurchase {
  id: number;
  userId: number;
  dropId: number;
  reservationId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PurchaseCreationAttributes extends Omit<IPurchase, 'id' | 'createdAt' | 'updatedAt'> {}
