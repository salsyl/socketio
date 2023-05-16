/*
 Créer une page exercice_01.html avec un formulaire de connexion contenant un champ pour saisir le nom d'utilisateur. 
 Lorsque l'utilisateur soumet le formulaire, 
 se connecter au serveur Socket.IO et afficher un message de confirmation dans la console du serveur.
 
*/
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Route GET pour servir la page exercice_01.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/exercice_01.html");
});

// Écoute de la connexion des clients
io.on("connection", (socket) => {
  console.log("Un client est connecté");

  // Écoute de l'événement 'connexion-utilisateur'
  socket.on("connexion-utilisateur", (username) => {
    console.log(`Le client ${username} s'est connecté avec succès.`);

    // Émission de l'événement 'confirmation-connexion' vers le client
    socket.emit("confirmation-connexion");
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
