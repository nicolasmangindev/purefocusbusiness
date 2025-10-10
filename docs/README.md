# PureFocus — Site Légal & Support

Site statique hébergeant les pages légales et support de l'application **PureFocus**.

## Caractéristiques

- 🌐 HTML/CSS/JS vanilla (aucune dépendance build)
- 🌍 Bilingue FR/EN
- 🌓 Mode clair/sombre (détection OS + toggle manuel)
- ♿ Accessible (WCAG AA)
- 🔒 Conforme RGPD (pas de cookie par défaut)
- 📱 Responsive
- 🚀 Optimisé pour GitHub Pages

## Structure

```
/
├── index.html                   # Redirection vers /fr/
├── robots.txt
├── sitemap.xml
├── CNAME                        # Domaine custom (optionnel)
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
├── fr/                          # Pages françaises
│   ├── index.html
│   ├── mentions-legales.html
│   ├── politique-confidentialite.html
│   ├── politique-cookies.html
│   ├── cgv-cgu.html
│   ├── support.html
│   └── entreprise.html
└── en/                          # Pages anglaises
    ├── index.html
    ├── legal-notice.html
    ├── privacy-policy.html
    ├── cookie-policy.html
    ├── terms-of-service.html
    ├── support.html
    └── company.html
```

## Déploiement sur GitHub Pages

### 1. Activation de GitHub Pages

1. Allez dans **Settings** de votre dépôt GitHub
2. Dans le menu de gauche, cliquez sur **Pages**
3. Dans **Source**, sélectionnez **Deploy from a branch**
4. Choisissez la branche **main** (ou **gh-pages** si vous préférez séparer)
5. Sélectionnez le dossier **/ (root)**
6. Cliquez sur **Save**

Votre site sera accessible sous `https://<username>.github.io/<repository>/`

### 2. Domaine personnalisé (optionnel)

Si vous souhaitez utiliser un domaine custom (ex: `legal.purefocus.app`) :

#### A. Configuration DNS (chez votre registrar)

Ajoutez un enregistrement DNS :
- **Type** : `CNAME`
- **Nom** : `legal` (ou `@` si domaine racine)
- **Valeur** : `<username>.github.io`

Ou pour un domaine apex, utilisez des enregistrements A :
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### B. Configuration GitHub

1. Dans **Settings → Pages**, section **Custom domain**
2. Entrez votre domaine : `legal.purefocus.app`
3. Cochez **Enforce HTTPS**
4. GitHub créera automatiquement un fichier `CNAME` à la racine

**Ou** créez manuellement le fichier `CNAME` à la racine avec :
```
legal.purefocus.app
```

#### C. Mise à jour des URLs

Éditez les fichiers suivants pour remplacer `https://purefocus.example.com` par votre domaine :
- `robots.txt` (ligne Sitemap)
- `sitemap.xml` (toutes les URLs)
- Balises canonical et Open Graph dans chaque page HTML

### 3. Vérification

Après quelques minutes, visitez votre site :
- GitHub Pages : `https://<username>.github.io/<repository>/`
- Domaine custom : `https://votre-domaine.com/`

## Configuration

### Analytics (désactivé par défaut)

Pour activer Plausible Analytics :

1. Ouvrez `assets/js/main.js`
2. Changez `const ANALYTICS_ENABLED = false;` en `true`
3. Décommentez le script Plausible dans les templates HTML
4. Le bandeau cookies s'affichera automatiquement

### Formulaire de contact

Le formulaire dans `support.html` est actuellement statique.

Pour le rendre fonctionnel avec **Formspree** :

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire et récupérez l'endpoint
3. Dans `fr/support.html` et `en/support.html`, décommentez la section formulaire Formspree
4. Remplacez `YOUR_FORM_ID` par votre ID Formspree

Exemple :
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Maintenance

### Mise à jour des dates

Le script `main.js` injecte automatiquement la date du jour dans les mentions "Dernière mise à jour".

### Modification du contenu

Tous les textes sont directement dans les fichiers HTML, dans les sections appropriées :
- `<main>` : contenu principal
- `<footer>` : pied de page avec liens légaux

### Traduction EN

Les pages EN contiennent des placeholders `{{TO BE TRANSLATED}}`. Remplacez-les par les traductions appropriées.

## Support

Pour toute question : [purfocus.contact@gmail.com](mailto:purfocus.contact@gmail.com)

## Licence

© 2025 NUTRAE SOLUTIONS — Tous droits réservés.