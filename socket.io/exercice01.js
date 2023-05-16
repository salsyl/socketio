/*
 1:  Permettre aux clients de se connecter au serveur Socket.IO.

Instructions :

Commencez par créer une page index.html qui servira un formulaire sans method ni action contenant un champ pour saisir le nom d'utilisateur. 
utiliser un élément <input> avec un attribut id pour identifier le champ.

Soumission du formulaire : 
Ajoutez un gestionnaire d'événement à l'événement submit du formulaire. 
Lorsque l'utilisateur soumet le formulaire, cet événement sera déclenché.

  document.getElementById("login-form").addEventListener("submit", (event) => {
          event.preventDefault();
          /////ajoutez le code /////
  })
Récupération du nom d'utilisateur : 
Dans le gestionnaire d'événement submit, 
récupérez la valeur saisie dans le champ du nom d'utilisateur en utilisant l'id correspondant.

Connexion au serveur Socket.IO : 
Utilisez le client Socket.IO (dans le code JavaScript) 
pour établir une connexion au serveur Socket.IO 

Émission d'un événement de connexion : 
    Après avoir établi la connexion, 
    émettez un événement personnalisé (par exemple, "connexion utilisateur") 
    vers le serveur pour signaler la connexion du client et transmettre le nom d'utilisateur en tant que données de l'événement.

Message de confirmation dans la console du serveur : 
    Dans le code du serveur, 
    écoutez cet événement ("connexion utilisateur") émis par les clients connectés. 
    Lorsque cet événement est reçu, 
    affichez un message de confirmation dans la console du serveur en incluant le nom d'utilisateur 
    pour indiquer que le client s'est connecté avec succès.

Ces étapes permettent: 
    aux clients de se connecter au serveur Socket.IO en utilisant le nom d'utilisateur fourni 
    et d'afficher un message de confirmation dans la console du serveur lorsque la connexion est établie avec succès.
*/

// Serveur
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Configuration du serveur Express.js
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Écoute de la connexion des clients
io.on("connection", (socket) => {
  console.log("Un client est connecté");

  // Écoute de l'événement "connexion utilisateur"
  socket.on("connexion utilisateur", (msg) => {
    console.log("Message reçu de:", msg);

    // Diffusion du message à tous les clients connectés
    io.emit("connexion utilisateur", msg);
  });

  // Gestion de la déconnexion d'un client
  socket.on("disconnect", () => {
    console.log("Un client s'est déconnecté");
  });
});

// Démarrage du serveur
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
