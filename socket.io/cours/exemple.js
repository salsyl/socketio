/*
npm
npm i socket.io express

Nous commençons par importer les modules nécessaires, 
notamment Express, http, et socket.io.

Ensuite, nous créons une instance d'Express.js en utilisant express().
Nous créons un serveur HTTP en utilisant http.createServer(app), 
où app est notre instance Express.js.

Nous créons une instance de Socket.IO en utilisant io(http), où http est notre serveur HTTP.

Nous écoutons l'événement "connection" émis par Socket.IO 
lorsque les clients se connectent au serveur.
  À l'intérieur de la fonction de rappel pour l'événement "connection", 
  nous affichons un message dans la console du serveur 
  pour indiquer qu'un client s'est connecté.

  Nous écoutons également l'événement "chat message" émis par les clients. 
  Lorsque cet événement est reçu, 
  nous affichons le message reçu dans la console du serveur.
  puis nous émettons un événement "chat message" vers le client en utilisant:
        socket.emit("chat message", "Hello du server!");


Enfin, nous démarrons le serveur en écoutant sur un port spécifié en utilisant http.listen(). 
Lorsque le serveur démarre, nous affichons un message dans la console.
*/
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Écoute de la connexion des clients
io.on("connection", (socket) => {
  console.log("Un client est connecté");

  // Écoute de l'événement "chat message"
  socket.on("chat message", (msg) => {
    console.log("Message reçu:", msg);
    socket.emit("chat message", "Hello du server!");
  });
});

// Route GET pour servir le fichier index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/exemple.html");
});

// Démarrage du serveur
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
