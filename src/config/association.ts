import Drop from "../app/modules/dropModule/drop.model";
import Purchase from "../app/modules/purchaseModule/purchase.model";
import Reservation from "../app/modules/reservationModule/reservation.model";
import User from "../app/modules/userModule/user.model";

export const setupAssociations = () => {
    User.hasMany(Purchase, { foreignKey: "userId", as: "purchases" });
    Drop.hasMany(Purchase, { foreignKey: "dropId", as: "purchases" });

    // from reservation model
    Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Reservation.belongsTo(Drop, { foreignKey: 'dropId', as: 'drop' });

    // from purchase model
    Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Purchase.belongsTo(Drop, { foreignKey: 'dropId', as: 'drop' });
    Purchase.belongsTo(Reservation, { foreignKey: 'reservationId', as: 'reservation' });

};