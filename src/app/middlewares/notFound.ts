import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'failed',
    statusCode: StatusCodes.NOT_FOUND,
    message: 'The requested route was not found.',
    path: req.originalUrl,
    method: req.method,
  });
};

export default notFound;