import {createApp, createRouter} from './app.js'
import createServer from './server.js'


// catch 404 and forward to error handler
function handleNotFound(req, res, next) {
  next(createError(404));
}

// error handler
function handleError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');return;
  res.json({
    message: err.message,
    error: err
  });
}


class Application {
  app = null;
  server = null;
  #version = '1.0.0';
  #clients = new Set();
  #connections = new Set();

  constructor(port = 5000, viewPath) {
    this.port = port;
    this.app = createApp();
    this.server = createServer(this.app);

    this.on();
  }

  router() {
    return createRouter();
  }

  route(path, router) {
    this.app.use(path, router);
  }

  static(prefix, path) {
    this.app.use(prefix, express.static(path));
  }

  view(path = path.resolve(path.join(path.dirname('.'), 'view'))) {
    this.app.set('views', path);
  }

  run() {
    this.app.use(handleNotFound)
    this.app.use(handleError)
    this.server.listen(this.port);
  }

  on() {
    this.server.on('connection', connection => {
      this.connections.add(connection);

      connection.on('close', () => {
        this.connections.delete(connection);
      });
    });
  }
}

export default Application
