import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import CustomError from '../../errors';
import userServices from './user.services';
import { Request, Response } from 'express';
import config from '../../../config';
import asyncHandler from '../../../shared/asyncHandler';
import fileUploader from '../../../utils/fileUploader';
import { FileArray } from 'express-fileupload';

// controller for create new user
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;

  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 30);

  userData.verification = {
    code: Math.floor(100000 + Math.random() * 900000).toString(),
    expireDate,
  };

  // token for social user
  // let accessToken, refreshToken;
  // if (userData.isSocial) {
  //   userData.isEmailVerified = true;

  //   const payload = {
  //     email: userData.email,
  //     role: userData.role,
  //   };
  //   accessToken = jwtHelpers.createToken(payload, config.jwt_access_token_secret as string, config.jwt_access_token_expiresin as string);
  //   refreshToken = jwtHelpers.createToken(payload, config.jwt_refresh_token_secret as string, config.jwt_refresh_token_expiresin as string);
  // }

  const user = await userServices.createUser(userData);
  if (!user) {
    throw new CustomError.BadRequestError('Failed to create new user!');
  }

  const { password, verification, ...userInfoAcceptPass } = user.toObject();

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'User creation successfull',
    data: { ...userInfoAcceptPass },
  });
});

export default {
  createUser,
};
