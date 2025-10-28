import { Server } from 'http';
import app from './app';
import config from './config';

let server: Server;

async function startServer() {
  try {
    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port} [${config.node_env}]`);
    });

    // Graceful shutdown
    const gracefulExit = (signal: string) => {
      console.log(`\n Received ${signal}. Closing server gracefully...`);
      if (server) {
        server.close(() => {
          console.log('Server closed.');
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    };

    process.on('SIGINT', () => gracefulExit('SIGINT'));
    process.on('SIGTERM', () => gracefulExit('SIGTERM'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
      if (server) server.close(() => process.exit(1));
      else process.exit(1);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      if (server) server.close(() => process.exit(1));
      else process.exit(1);
    });

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
