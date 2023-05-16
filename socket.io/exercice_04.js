/*
  Exercice 4 : 
 Développez une fonction de chat en temps réel. 
 Dans cette fonction, les clients doivent être en mesure d'envoyer des messages qui sont immédiatement reçus et affichés pour tous les autres clients connectés.

Connexion du client : 
    Chaque client doit être en mesure de se connecter à l'application de chat. Vous aurez besoin d'une authentification pour afficher l'identité de chaque utilisateur.

Envoi de messages : 
    Les clients doivent pouvoir saisir et envoyer des messages. 
    Ces messages seront ensuite envoyés à un serveur.

Serveur de messagerie : 
    Le serveur de messagerie recevra les messages des clients
    et les distribuera aux autres clients connectés. 
    Il sera nécessaire de gérer plusieurs connexions simultanées.

Réception des messages : 
    Les clients doivent pouvoir recevoir des messages du serveur de messagerie. 
    Ces messages doivent être affichés sur l'interface utilisateur.

Interface utilisateur : 
L'interface doit afficher les messages entrants en temps réel.
 */
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Servir les fichiers statiques du dossier "public"
app.use(express.static("public"));

// Écouter les connexions entrantes
io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  // Lorsqu'un message est reçu, le diffuser à tous les clients
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // Lorsqu'un utilisateur se déconnecte
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

http.listen(3000, () => {
  console.log("Écoute sur port:3000");
});
