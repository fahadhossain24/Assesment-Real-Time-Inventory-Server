import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import CustomError from '../../errors';
import userServices from './user.services';
import { Request, Response } from 'express';
import asyncHandler from '../../../shared/asyncHandler';

// controller for create new user
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;

  if (userData.autoGenerate) {
    // generate random username with 8 characters
    userData.username = Math.random().toString(36).substring(2, 10)
  }
  const user = await userServices.createUser(userData);
  if (!user) {
    throw new CustomError.BadRequestError('Failed to create new user!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'User creation successfull',
    data: user,
  });
});

export default {
  createUser,
};
