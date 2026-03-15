# Interflux Electronics

This Svelte Kit app is the front end for [interflux.com](https://interflux.com).

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
