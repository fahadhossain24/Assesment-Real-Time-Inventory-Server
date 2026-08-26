import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import notFound from './app/middlewares/notFound';
import routers from './app/routers';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import CustomError from './app/errors';
import rootDesign from './app/middlewares/rootDesign';
import { compressionOptions } from './config/compression.config';
import compression from 'compression';
import { setupAssociations } from './config/association';

const app: Application = express();

// global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression(compressionOptions))
app.use(fileUpload());
app.use('/v1/uploads', express.static(path.join('uploads')));

// call setup associations function for initialized sequelize models
setupAssociations();

// application middleware
app.use('/api', routers);

// send html design with a button 'click to see server health' and integrate an api to check server health
app.get('/', rootDesign);

// swagger route

app.get('/health_check', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: 'Welcome to the server. Server health is good.',
  });
});

// Example error logging
app.get('/error', (req, res, next) => {
  next(new CustomError.BadRequestError('Testin error'));
});

app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204).end(); // No Content
});

// Error handling middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
