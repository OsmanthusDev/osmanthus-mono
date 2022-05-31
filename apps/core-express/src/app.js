import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import responseTime from 'response-time';
import compression from 'compression';
import timeout from 'connect-timeout';
import createError from 'http-errors';

export function createApp() {
  const app = express();

  // view engine setup
  // app.set('views', path.join(path.dirname('.'), 'view'));
  app.set('views', path.resolve(path.join(path.dirname('.'), 'view')));
  app.set('view engine', 'hbs');

  app.use(cors());
  app.use(helmet());
  app.use(responseTime());
  app.use(compression());
  app.use(timeout('10s'));
  app.use(logger('dev'));
  // parse application/json
  app.use(express.json());
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // app.use('/static', express.static(path.join(path.dirname('../'), 'public')));

  // app.get('/', (req, res) => {
  //   res.send('hello world');
  // })

  return app;
}

export function createRouter() {
  return express.Router();
}
