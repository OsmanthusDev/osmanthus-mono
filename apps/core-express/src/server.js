import http from 'http';
// import colors from 'colors';

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}


const createServer = function (app, port) {
  const connections = new Set();

  /**
   * Get port from environment and store in Express.
   */
  port = normalizePort(process.env.PORT || port);
  app.set('port', port);

  /**
   * Create HTTP server.  listener
   */
  const server = http.createServer(app);

  /**
   * Event listener for HTTP server "error" event.
   */
  server.on('error', function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  /**
   * Event listener for HTTP server "listening" event.
   */
  server.on('listening', function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    // console.log(`Listening on ${colors.green(bind)}`);
  });



  // 监听请求事件
  server.on('request', (req, res) => {
    console.log('request listen')
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify({
    //   data: 'Hello World!'
    // }));
  });

  server.on('connection', connection => {
    connections.add(connection);

    connection.on('close', () => {
      connections.delete(connection);
    });
  });


  return server;
  /**
   * Listen on provided port, on all network interfaces.
   */
  // server.listen(port);
}

export default createServer
