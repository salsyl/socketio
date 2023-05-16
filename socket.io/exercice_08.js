/*
Implémenter une fonctionnalité de jeu en temps réel, 
comme un jeu de société en ligne où les joueurs peuvent interagir les uns avec les autres.

par exemple: 
une version en temps réel du jeu classique "Pierre, Papier, Ciseaux". 
Voici comment cela pourrait fonctionner:

Connexion du joueur: Chaque joueur doit être en mesure de se connecter au jeu. 
Ils pourraient entrer leur nom d'utilisateur dans un champ de texte, 
puis cliquer sur un bouton pour se connecter.

Choix de la main: 
Une fois connecté, chaque joueur voit trois boutons, 
chacun représentant Pierre, 
Papier ou Ciseaux. Ils cliquent sur l'un d'eux pour faire leur choix.

Envoi du choix: 
Le choix du joueur est envoyé au serveur.

Traitement du choix: 
Le serveur attend que les deux joueurs fassent leur choix. 
Une fois qu'il a reçu les deux, 
il détermine le gagnant selon les règles de Pierre, Papier, Ciseaux.

Résultat du jeu: 
Le serveur envoie le résultat à chaque joueur. 
L'interface utilisateur de chaque joueur est mise à jour pour montrer le choix de l'autre joueur et le résultat du jeu.

Nouvelle manche: 
Une fois le résultat affiché, 
les joueurs peuvent commencer une nouvelle manche en faisant un autre choix.

Déconnexion: 
Si un joueur se déconnecte, 
le serveur envoie une notification à l'autre joueur pour l'informer de la déconnexion.
*/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const donneesJeu = {
  joueur1: null,
  joueur2: null,
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/exercice_08.html"));
});

io.on("connection", (socket) => {
  console.log("Un joueur s'est connecté");

  socket.on("jouer", (data) => {
    if (!donneesJeu.joueur1) {
      donneesJeu.joueur1 = { choix: data, id: socket.id };
    } else if (!donneesJeu.joueur2) {
      donneesJeu.joueur2 = { choix: data, id: socket.id };

      // Calcul du gagnant
      const gagnant = calculerGagnant(
        donneesJeu.joueur1.choix,
        donneesJeu.joueur2.choix
      );

      // Envoi du résultat
      io.to(donneesJeu.joueur1.id).emit("resultat", {
        gagnant,
        choixAdversaire: donneesJeu.joueur2.choix,
      });
      io.to(donneesJeu.joueur2.id).emit("resultat", {
        gagnant,
        choixAdversaire: donneesJeu.joueur1.choix,
      });

      // Réinitialisation du jeu
      donneesJeu.joueur1 = null;
      donneesJeu.joueur2 = null;
    }
  });

  socket.on("disconnect", () => {
    console.log("Un joueur s'est déconnecté");
    if (donneesJeu.joueur1 && donneesJeu.joueur1.id === socket.id) {
      donneesJeu.joueur1 = null;
    }
    if (donneesJeu.joueur2 && donneesJeu.joueur2.id === socket.id) {
      donneesJeu.joueur2 = null;
    }
  });
});

server.listen(3000, () => {
  console.log("Le serveur écoute sur le port 3000");
});

// Cette fonction détermine le gagnant du jeu en fonction des choix des joueurs
function calculerGagnant(choix1, choix2) {
  if (choix1 === choix2) {
    return "égalité";
  } else if (
    (choix1 === "pierre" && choix2 === "ciseaux") ||
    (choix1 === "ciseaux" && choix2 === "papier") ||
    (choix1 === "papier" && choix2 === "pierre")
  ) {
    return "joueur1";
  } else {
    return "joueur2";
  }
}
