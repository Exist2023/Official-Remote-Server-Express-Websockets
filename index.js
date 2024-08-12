// Modules: express + websockets (by express-ws)
const express = require('express');
const expressWs = require('express-ws');

const app = express();
const wsInstance = expressWs(app);

const clients = new Set();



// Files:
app.use(express.static('web'));



// REST route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/index.html');
});



// Keys route
app.ws('/api/ws/keys', (ws, res) => {
  // Client connection
  console.log('CLIENT connected (Keys Route)');
  // Add new CLIENT to the set (connected clients)
  clients.add(ws);


  
  // Receive keys + down/up from PAGE (web) and send keys to CLIENT
  ws.on('message', (msg) => {
    console.log('SERVER received keys from PAGE (Keys Route): ' + msg);

    // Send received keys + down/up to CLIENT
    clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(msg);
      }
    });
  })
  

  
  // Client disconnection
  ws.on('close', () => {
    console.log('CLIENT disconnected (Keys Route)');
    clients.delete(ws);
  })
})



// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
})