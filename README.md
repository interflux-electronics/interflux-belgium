# Interflux Belgium

This codebase builds the frontend of the website of the Belgian company Interflux Electronics.

[interflux.com](https://interflux.com)

Tech stack:

- Svelte Kit 5 ❤️
- Typescript
- SASS
- Prettier
- ES Lint
- Debian
- Nginx
- NVM
- Node
- Figma ⭐️

Contributors:

- Jan Werkhoven 岩 🇦🇺
- Steven Teliszewski 🇧🇪
- Wim Van Riet 🇸🇬

Questions?

Ask Jan on [jw@interflux.au](mailto:jw@interflux.au)

# Development

```sh
nvm install
npm install
npm run dev
```

# Production

Deploy

```sh
bin/deploy.sh
```

Deploy manually

```sh
ssh frankfurt
cd /var/www/prototype.interflux.com
sudo -u interflux bash -lc "git pull"
sudo -u interflux bash -lc "nvm install"
sudo -u interflux bash -lc "npm install"
sudo -u interflux bash -lc "npm run build"
sudo systemctl restart prototype.interflux.com
```
