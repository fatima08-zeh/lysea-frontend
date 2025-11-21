💄 README Frontend – Lysea

📌 Description générale
Le frontend de la boutique Lysea est développé avec React (Create React App).
Il gère toutes les pages visibles par les utilisateurs : accueil, liste des produits, détails, panier, favoris, authentification, chatbot d’assistance et paiement PayPal.
L’interface est conçue pour offrir une expérience fluide, moderne et agréable.

📂 Structure du projet
lysea-frontend/
public/ – Images statiques et favicon
src/
pages/ – Pages complètes (Home, BeautyPage, Panier, Produit, Checkout...)
components/ – Composants réutilisables (Navbar, Footer, Cartes produits…)
context/ – États globaux (Panier, Favoris, Utilisateur)
styles/ – Fichiers CSS du projet
App.js – Composant principal
index.js – Point d’entrée Create React App
package.json
.gitignore

🔐 Configuration du fichier .env
Créer un fichier .env à la racine du frontend contenant :

REACT_APP_API_BASE=https://lysea-backend.onrender.com

Pour le mode local :

REACT_APP_API_BASE=http://localhost:5001

⚙️ Installation locale
Se placer dans le dossier frontend :
cd lysea-frontend

Installer les dépendances :
npm install

Lancer le serveur de développement :
npm start

L’application s’ouvre automatiquement sur :
👉 http://localhost:3000

🚀 Déploiement sur Vercel
Dans les variables d’environnement Vercel, ajouter :

REACT_APP_API_BASE=https://lysea-backend.onrender.com

Le déploiement s’effectue automatiquement après chaque push sur GitHub.

👩‍💻 Auteur
Fatima Ez-Zehmad
Développeuse Web & Mobile & IA
