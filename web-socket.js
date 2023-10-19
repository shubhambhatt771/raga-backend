const WebSocket = require('ws');
const logger = require('./utils/logger');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  logger.info('WebSocket Client connected');
  // Event handler for messages received from clients
  ws.on('message', (message) => {
    logger.info('recieved message'+JSON.stringify(message.toString()));    
  });
});

const broadcastMessage = function(data){
  logger.info('broadcasting message to clients data is '+ data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { wss,broadcastMessage  };
