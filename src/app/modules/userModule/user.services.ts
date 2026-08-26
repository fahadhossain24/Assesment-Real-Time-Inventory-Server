import { IUser } from './user.interface';
import User from './user.model';

class UserServide {
  createUser = async (data: IUser) => {
    return await User.create(data);
  };
}


export default new UserServide()
