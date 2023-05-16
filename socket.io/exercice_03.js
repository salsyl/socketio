/*
exercice 3
"Émettre un événement depuis le serveur vers le client 
et afficher le message associé à cet événement dans la console du client."


vous devez effectuer les actions suivantes :

Du côté du serveur (exercice_03.js), 
émettez un événement vers le client (exercice_03.html) en utilisant Socket.IO.
Le client doit écouter cet événement et afficher le message associé dans la console du navigateur.
*/
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Route GET pour servir la page exercice_03.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/exercice_03.html");
});

// Écoute de la connexion des clients
io.on("connection", (socket) => {
  console.log("Un client est connecté");

  // Émission de l'événement personnalisé depuis le serveur vers le client
  socket.emit("message-du-serveur", "Ceci est un message du serveur !");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Démarrage du serveur
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
