import http from 'http';
import sequelize from './config/database';
import config from './config';
import app from './app';
import { initSocket } from './socket/socket.configure';

let server = http.createServer(app);

// Initialize socket.io
initSocket(server);

// handle uncaught exception error
process.on('uncaughtException', (error) => {
  console.log('uncaughtException error', error);
  process.exit(1);
});

const startServer = async () => {
  await sequelize.authenticate();
  console.log('\x1b[36mDatabase connection successfull\x1b[0m');

  // await sequelize.sync({ alter: true });
  // console.log('\x1b[36mDatabase sync successfull\x1b[0m');

  server.listen(config.server_port || 5001, () => {
    console.log(`\x1b[32mServer is listening on port ${config.server_port || 5001}\x1b[0m`);
  });
};

// handle unhandled rejection
process.on('unhandledRejection', (reason, promise) => {
  console.log(`unhandle rejection at ${promise} and reason ${reason}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// gracefull shoutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received.');
  server.close(() => {
    console.log('Server closed.');
  });
});

startServer();
