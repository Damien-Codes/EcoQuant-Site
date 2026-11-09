<p align="center">
  <img src="img/icon128.png" width="96" alt="Icône EcoQuant">
</p>

# EcoQuant — Site web 🌐

[![GitHub license](https://img.shields.io/github/license/Damien-Codes/EcoQuant-Site)](LICENSE)

Site officiel de **EcoQuant – Economic News**, l'extension Chrome gratuite qui vous prévient avant chaque annonce
économique, affiche le chiffre réel dès la publication et calcule votre taille de position.

🔗 **Site** : [damien-codes.github.io/EcoQuant-Site](https://damien-codes.github.io/EcoQuant-Site/)
🧩 **Extension (code source)** : [Damien-Codes/EcoQuant](https://github.com/Damien-Codes/EcoQuant)
🛒 **Chrome Web Store** : [EcoQuant – Economic News](https://chromewebstore.google.com/detail/kmpbiiclcjeaockakakgmejokbcocnij)

---

## 📂 Fichiers

Un site 100 % statique : **HTML, CSS et JavaScript**, sans outil ni installation. En **français** (racine) et en
**anglais** (dossier `en/`), avec un bouton **FR / EN** dans le menu de chaque page.

```
EcoQuant-Site/
├── index.html              # Accueil : fonctionnalités, démos, installation, FAQ
├── contact.html            # Email, GitHub, LinkedIn, Instagram, bugs
├── conditions.html         # Conditions d'utilisation
├── confidentialite.html    # Politique de confidentialité (lien donné au Chrome Web Store)
├── mentions-legales.html   # Mentions légales
├── nouveautes.html         # Historique des versions (en/changelog.html en anglais)
├── 404.html                # Page introuvable (bilingue : GitHub Pages n'en utilise qu'une)
├── en/                     # Version anglaise : index, contact, terms, privacy, legal-notice, changelog
├── css/style.css           # Tout le style (thème sombre/clair, responsive)
├── js/main.js              # Menu mobile, animations, FAQ, démo d'alerte et du calculateur
├── img/                    # Icônes + images d'aperçu pour les partages (og-fr.png, og-en.png, 1200×630)
├── EcoQuant.zip            # L'extension, pour l'installation manuelle (bouton « Télécharger ZIP »)
├── robots.txt, sitemap.xml # Référencement
└── .nojekyll               # Indique à GitHub Pages de servir les fichiers tels quels
```

---

## ✏️ Modifier le site

Ouvre les fichiers dans ton éditeur et modifie-les directement. Pour voir le résultat, double-clique sur `index.html`.

- L'**en-tête** et le **pied de page** sont écrits dans chaque page : une modification (lien, texte) est à faire dans
  les 6 fichiers HTML français **et** les 5 fichiers de `en/`. Astuce : la recherche/remplacement dans tout le dossier.
- **Deux langues** : quand tu modifies un texte en français, pense à sa traduction dans `en/` (même nom de page, sauf
  `conditions.html` → `en/terms.html`, `confidentialite.html` → `en/privacy.html`,
  `mentions-legales.html` → `en/legal-notice.html`).
- **Partager** : la section « Partagez EcoQuant » de l'accueil (WhatsApp, Telegram, X, LinkedIn, Facebook, Reddit,
  e-mail, copier le lien) n'utilise aucun script de réseau social. Le texte partagé est dans les liens de cette section.
- **Image d'aperçu** : `img/og-fr.png` et `img/og-en.png` s'affichent quand le site est partagé (Discord, WhatsApp,
  LinkedIn, X…). Pour les changer, garde le format 1200×630 et le même nom de fichier.
- Les boutons **« Ajouter à Chrome »** (menu de chaque page, accueil) et **« Installer depuis le Store »** ouvrent la
  fiche du Chrome Web Store. Le bouton **« Code source »** et les liens « bug » pointent sur le dépôt
  [EcoQuant](https://github.com/Damien-Codes/EcoQuant).

### À chaque nouvelle version de l'extension

1. Publie-la sur le Chrome Web Store et pousse le code dans le dépôt [EcoQuant](https://github.com/Damien-Codes/EcoQuant).
2. Remplace **`EcoQuant.zip`** dans ce dépôt par le nouveau zip (il doit contenir le dossier `extension/`).
3. **Nouveautés** : dans `nouveautes.html` et `en/changelog.html`, copie le bloc `<article class="release">` au-dessus
   de l'actuel, change numéro, date et liste, et déplace la pastille « Version actuelle » (mode d'emploi en commentaire
   dans la page).
4. **Référencement** : dans `index.html` et `en/index.html`, mets à jour `softwareVersion` et `dateModified` dans le
   bloc `<script type="application/ld+json">` (fiche « SoftwareApplication »).
5. Pousse.

---

## 🔎 Référencement (Google)

Déjà en place : titre et description propres à chaque page, `hreflang` FR/EN, `sitemap.xml` bilingue, page 404 exclue,
images d'aperçu, et **données structurées** sur l'accueil (fiche *SoftwareApplication* : gratuite, Chrome/Edge/Brave,
lien du Store ; et *FAQPage* reprenant la FAQ). Si tu modifies une question de la FAQ, modifie-la aussi dans le bloc
`FAQPage` du même fichier.

Pour que Google découvre le site plus vite (gratuit, à faire une fois) :

1. Va sur [Google Search Console](https://search.google.com/search-console) → **Ajouter une propriété** →
   **Préfixe de l'URL** → `https://damien-codes.github.io/EcoQuant-Site/`.
2. Choisis la vérification **Balise HTML** : copie la balise `<meta name="google-site-verification" …>` dans le
   `<head>` de `index.html`, pousse, puis clique sur **Valider**.
3. Menu **Sitemaps** → ajoute `sitemap.xml`.
4. Vérifie les données structurées avec le [test des résultats enrichis](https://search.google.com/test/rich-results).

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
