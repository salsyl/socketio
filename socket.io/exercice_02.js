/*
exercice 2 
émettre un événement personnalisé depuis le client vers le serveur:

Vous devez afficher le contenu de cet événement dans la console du serveur.
Pour cela, vous devez effectuer les étapes suivantes :
créez exercice_02.html avec un bouton "Envoyer un message au serveur", 
au click sur le bouton, émettez un événement personnalisé en utilisant socket.emit() pour envoyer un message au serveur .

Dans le code côté serveur (exercice_02.js), 
écoutez cet événement en utilisant socket.on() pour capturer le message émis par le client.
Affichez le contenu du message reçu dans la console du serveur.

L'objectif de cet exercice est de vous familiariser avec l'émission d'événements personnalisés depuis le client vers le serveur avec Socket.IO et de comprendre comment afficher les messages associés dans la console du serveur.
*/
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Route GET pour servir la page exercice_02.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/exercice_02.html");
});

// Écoute de la connexion des clients
io.on("connection", (socket) => {
  console.log("Un client est connecté");

  // Écoute de l'événement 'message-client-vers-serveur'
  socket.on("message-client-vers-serveur", (message) => {
    console.log(`Message reçu du client : ${message}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Démarrage du serveur
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
