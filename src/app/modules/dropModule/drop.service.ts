// import sequelize from "../../config/database";
import Drop from "./drop.model";
// import Reservation from "../reservation/reservation";
import { IDrop } from "./drop.interface";
import Purchase from "../purchaseModule/purchase.model";
import User from "../userModule/user.model";
import { FileArray } from "express-fileupload";
import fileUploader from "../../../utils/fileUploader";


class DropService {
    async getAllDropsWithPurchasers() {
        return await Drop.findAll({
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Purchase,
                    as: "purchases",
                    separate: true,
                    limit: 3,
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "username"],
                        },
                    ],
                },
            ],
        });
    }

    async createDrop(dropData: IDrop, image: FileArray) {
        let imagePath: string | string[] | undefined;
        if (image && image.image) {
            imagePath = await fileUploader(image as FileArray, `drop-image`, 'image');
        }

        dropData.imageUrl = imagePath as string;
        dropData.availableStock = dropData.totalStock || 0;

        return await Drop.create(dropData);
    }
}

export default new DropService();