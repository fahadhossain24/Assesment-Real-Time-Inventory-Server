import {IUser} from './user.interface';
import User from './user.model';
// service for create new user
const createUser = async (data: IUser) => {
  return await User.create(data);
};

export default {
  createUser,
};
