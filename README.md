<p align="center">
  <img src="img/icon128.png" width="96" alt="Icône EcoQuant">
</p>

# EcoQuant — Site web 🌐

[![GitHub license](https://img.shields.io/github/license/Damien-Codes/EcoQuant-Site)](LICENSE)

Site officiel de **EcoQuant – Economic News Alerts**, l'extension Chrome gratuite qui vous prévient avant chaque annonce
économique, affiche le chiffre réel dès la publication et calcule votre taille de position.

🔗 **Site** : [damien-codes.github.io/EcoQuant-Site](https://damien-codes.github.io/EcoQuant-Site/)
🧩 **Extension (code source)** : [Damien-Codes/EcoQuant](https://github.com/Damien-Codes/EcoQuant)

---

## 📂 Fichiers

Un site 100 % statique : **HTML, CSS et JavaScript**, sans outil ni installation.

```
EcoQuant-Site/
├── index.html              # Accueil : fonctionnalités, démos, installation, FAQ
├── contact.html            # Email, GitHub, LinkedIn, Instagram, bugs
├── conditions.html         # Conditions d'utilisation
├── confidentialite.html    # Politique de confidentialité (lien donné au Chrome Web Store)
├── mentions-legales.html   # Mentions légales
├── 404.html                # Page introuvable
├── css/style.css           # Tout le style (thème sombre/clair, responsive)
├── js/main.js              # Menu mobile, animations, FAQ, démo d'alerte et du calculateur
├── img/                    # Icônes
├── robots.txt, sitemap.xml # Référencement
└── .nojekyll               # Indique à GitHub Pages de servir les fichiers tels quels
```

---

## ✏️ Modifier le site

Ouvre les fichiers dans ton éditeur et modifie-les directement. Pour voir le résultat, double-clique sur `index.html`.

- L'**en-tête** et le **pied de page** sont écrits dans chaque page : une modification (lien, texte) est à faire dans
  les 6 fichiers HTML. Astuce : la recherche/remplacement dans tout le dossier de ton éditeur.
- Les liens vers l'extension pointent sur le dépôt [EcoQuant](https://github.com/Damien-Codes/EcoQuant)
  (code source, ZIP, issues).

### Quand l'extension sera sur le Chrome Web Store

1. Remplace `index.html#installer` par l'URL de la fiche (ex. `https://chromewebstore.google.com/detail/ecoquant/xxxx`)
   sur les boutons **« Ajouter à Chrome »** de toutes les pages, en ajoutant `target="_blank" rel="noopener"`.
2. Dans `index.html`, section « Installer » : remplace le bouton **« Bientôt disponible »** par un lien
   **« Installer depuis le Store »** vers la même URL, et retire la classe `is-pending` de la carte Chrome Web Store.

---

## 🚀 Publication (GitHub Pages)

1. Sur GitHub, dans ce dépôt : **Settings → Pages → Build and deployment**
   → **Source : Deploy from a branch** → **Branch : `main` / `(root)`** → **Save**.
2. Une à deux minutes plus tard, le site est en ligne : https://damien-codes.github.io/EcoQuant-Site/
3. Ensuite, chaque `git push` met le site à jour automatiquement.

```bash
git add .
```

```bash
git commit -m "Ma modification"
```

```bash
git push
```

> Si tu renommes le dépôt, change l'adresse `damien-codes.github.io/EcoQuant-Site` dans les pages HTML (balises
> `canonical` / `og:`), `robots.txt`, `sitemap.xml`, et la balise `<base href="/EcoQuant-Site/">` de `404.html`.

---

## 👤 Auteur

**Damien Pino** – Développeur indépendant · [@Damien-Codes](https://github.com/Damien-Codes) ·
[LinkedIn](https://www.linkedin.com/in/damien-pino/) · [pinodamien@gmail.com](mailto:pinodamien@gmail.com)

## 📄 Licence

MIT — voir [LICENSE](LICENSE).
