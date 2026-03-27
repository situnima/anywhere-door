[English](./README.md) | [简体中文](./README.zh-CN.md)

# Anywhere Door

Anywhere Door is a pure frontend personal navigation page for organizing and opening frequently used websites.

It has:

- no backend
- no login
- no cloud sync
- no database requirement

All user data is stored in the browser with `IndexedDB`.

## Features

- Category-based navigation homepage
- Fuzzy search for site name and URL
- Add, edit, delete, and sort links
- Category management and drag-and-drop ordering
- Theme, wallpaper, density, and card style settings
- JSON import and export
- Uploaded icons, preset icons, and auto favicon fallback
- Static deployment with Docker, Docker Compose, or Nginx

## Tech Overview

- Entry page: [index.html](./index.html)
- Styles: [styles.css](./styles.css)
- App logic: [script.js](./script.js)
- Local persistence: browser `IndexedDB`
- Deployment model: static site hosting

## Important Notes

- This is a pure frontend project. The server does not store user data.
- Links, categories, settings, uploaded icons, and wallpapers are stored in the current browser only.
- Clearing browser site data, using incognito mode, or switching browsers may cause data loss.
- Use the built-in `JSON export / import` feature when you need migration or backup.

## Project Files

- [index.html](./index.html)
- [styles.css](./styles.css)
- [script.js](./script.js)
- [favicon.png](./favicon.png)
- [favicon.ico](./favicon.ico)
- [Dockerfile](./Dockerfile)
- [docker-compose.yml](./docker-compose.yml)
- [nginx.conf](./nginx.conf)
- [nginx.host.conf.example](./nginx.host.conf.example)

## Run Locally

This project has no build step and does not require npm, pnpm, or yarn.

Use any static HTTP server.

### Option 1: Python

```bash
cd anywhere-door
python3 -m http.server 8080
```

Open:

```text
http://127.0.0.1:8080
```

### Option 2: Any Static File Server

Serve the project directory as a static site root.

Avoid opening `index.html` directly with `file://` because browser behavior for `IndexedDB`, local assets, and security rules can differ from normal HTTP hosting.

## Deploy with Docker

This project already includes:

- [Dockerfile](./Dockerfile)
- [nginx.conf](./nginx.conf)

### 1. Install Docker

Make sure Docker is available on your server:

```bash
docker --version
```

### 2. Enter the project directory

```bash
cd anywhere-door
```

### 3. Build the image

```bash
docker build -t anywhere-door:latest .
```

### 4. Start the container

```bash
docker run -d \
  --name anywhere-door \
  -p 8080:80 \
  --restart unless-stopped \
  anywhere-door:latest
```

Notes:

- Nginx listens on port `80` inside the container
- Port `8080` is exposed on the host
- If you want to serve directly on host port `80`, change `-p 8080:80` to `-p 80:80`

### 5. Access the app

Local machine:

```text
http://127.0.0.1:8080
```

Remote server:

```text
http://your-server-ip:8080
```

### 6. Check container status

```bash
docker ps
docker logs -f anywhere-door
```

### 7. Stop and remove

```bash
docker stop anywhere-door
docker rm anywhere-door
```

### 8. Redeploy after changes

```bash
docker rm -f anywhere-door
docker build -t anywhere-door:latest .
docker run -d \
  --name anywhere-door \
  -p 8080:80 \
  --restart unless-stopped \
  anywhere-door:latest
```

## Deploy with Docker Compose

This project already includes:

- [docker-compose.yml](./docker-compose.yml)

### 1. Check prerequisites

```bash
docker --version
docker compose version
```

### 2. Enter the project directory

```bash
cd anywhere-door
```

### 3. Build and start

```bash
docker compose up -d --build
```

Default port mapping:

```text
host 8080 -> container 80
```

### 4. Inspect running services

```bash
docker compose ps
docker compose logs -f
```

### 5. Stop services

```bash
docker compose down
```

### 6. Redeploy after changes

```bash
docker compose up -d --build
```

### 7. Change the host port

Edit [docker-compose.yml](./docker-compose.yml):

```yaml
ports:
  - "80:80"
```

Then rebuild and restart:

```bash
docker compose up -d --build
```

## Deploy with Nginx Directly

Use this mode if your server already has Nginx installed and you do not want Docker.

Reference file:

- [nginx.host.conf.example](./nginx.host.conf.example)

The steps below use Ubuntu or Debian as an example.

### 1. Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### 2. Create the site directory

```bash
sudo mkdir -p /var/www/anywhere-door
```

### 3. Copy project files

Copy these files into `/var/www/anywhere-door`:

- `index.html`
- `styles.css`
- `script.js`
- `favicon.png`
- `favicon.ico`

If you are already inside the project folder on the server:

```bash
sudo cp index.html styles.css script.js favicon.png favicon.ico /var/www/anywhere-door/
```

### 4. Create the Nginx site config

```bash
sudo cp nginx.host.conf.example /etc/nginx/sites-available/anywhere-door
```

Edit it:

```bash
sudo nano /etc/nginx/sites-available/anywhere-door
```

Update these values for your environment:

- `server_name your-domain.com;`
- `root /var/www/anywhere-door;`

### 5. Enable the site

```bash
sudo ln -sf /etc/nginx/sites-available/anywhere-door /etc/nginx/sites-enabled/anywhere-door
```

If you do not need the default site:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

### 6. Test the config

```bash
sudo nginx -t
```

You should see output similar to `syntax is ok` and `test is successful`.

### 7. Reload Nginx

```bash
sudo systemctl reload nginx
```

### 8. Visit the site

Using server IP:

```text
http://your-server-ip
```

Using a domain:

```text
http://your-domain.com
```

### 9. Publish updates

Whenever frontend files change, copy them again and reload Nginx:

```bash
sudo cp index.html styles.css script.js favicon.png favicon.ico /var/www/anywhere-door/
sudo nginx -t
sudo systemctl reload nginx
```

## Optional: HTTPS with Certbot

If you already have a domain, HTTPS is strongly recommended.

### 1. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Request and install the certificate

```bash
sudo certbot --nginx -d your-domain.com
```

For multiple domains:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3. Verify renewal

```bash
sudo certbot renew --dry-run
```

## FAQ

### Why do I not see my saved data on another computer?

Because this project has no backend. Data is stored in the visitor's current browser, not on the server.

### Why is my data gone after clearing browser storage?

Because `IndexedDB` is part of browser site data and will be removed together with other local storage data.

### Why is HTTP hosting recommended instead of opening the file directly?

Because browsers apply stricter limitations to `file://`, especially around storage and asset behavior. A normal HTTP server is more reliable.

### Does this project need a database?

No. It is a static frontend application.
