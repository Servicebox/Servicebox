const WebSocket = require('ws');
const config = require('./config/config.json');
const request = require('request');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', (ws) => {
  //('Client connected');

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log('Received: ', message);
    
    // Send message to the Telegram bot
    sendMessageToTelegram(message);
    
    // Echo message back to client (if you want)
    ws.send(`You: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Function to send messages to Telegram
const sendMessageToTelegram = (message) => {
  const msg = encodeURI(message);
  
  request.post(
    `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log('Message sent to Telegram');
      } else {
        console.error('Failed to send message to Telegram:', error);
      }
    }
  );
};

console.log('WebSocket server is running on ws://localhost:8080');