[English](./README.md) | [简体中文](./README.zh-CN.md)

# 随意门 Anywhere Door

随意门是一个纯前端个人导航站，主打分类管理、搜索过滤、本地持久化和轻量个性化设置。

它没有后端、没有登录、没有云同步、没有数据库依赖，所有数据都保存在用户自己的浏览器 `IndexedDB` 中。

## 功能概览

- 分类导航页
- 站点名称和网址模糊搜索
- 站点新增、编辑、删除
- 分类管理与拖拽排序
- 站点卡片拖拽排序
- 主题、壁纸、密度、卡片样式切换
- JSON 导入导出
- 上传图标、预设图标、自动 favicon
- 支持静态部署，可通过 Docker、Docker Compose 或 Nginx 运行

## 技术说明

- 页面入口：[index.html](./index.html)
- 样式文件：[styles.css](./styles.css)
- 业务逻辑：[script.js](./script.js)
- 本地存储：浏览器 `IndexedDB`
- 部署方式：静态文件部署

## 重要说明

- 这是一个纯前端项目，服务器不保存用户数据。
- 用户新增的站点、分类、设置、上传图标和壁纸，默认都保存在当前浏览器中。
- 更换浏览器、清除浏览器站点数据、使用无痕模式，都可能导致数据丢失。
- 如果需要迁移或备份数据，请使用应用内的 `JSON 导出 / 导入` 功能。

## 项目文件

- [index.html](./index.html)
- [styles.css](./styles.css)
- [script.js](./script.js)
- [favicon.png](./favicon.png)
- [favicon.ico](./favicon.ico)
- [Dockerfile](./Dockerfile)
- [docker-compose.yml](./docker-compose.yml)
- [nginx.conf](./nginx.conf)
- [nginx.host.conf.example](./nginx.host.conf.example)

## 本地运行

项目没有构建步骤，也不依赖 npm、pnpm 或 yarn。

推荐使用任意静态 HTTP 服务运行。

### 方式一：Python

```bash
cd anywhere-door
python3 -m http.server 8080
```

浏览器访问：

```text
http://127.0.0.1:8080
```

### 方式二：任意静态文件服务器

只要能把当前目录作为静态站点根目录提供出去即可。

不建议直接双击 `index.html` 通过 `file://` 打开，因为不同浏览器在这种模式下对 `IndexedDB`、本地资源和安全策略支持并不一致。

## Docker 部署

项目已经提供：

- [Dockerfile](./Dockerfile)
- [nginx.conf](./nginx.conf)

### 1. 安装 Docker

确认服务器已安装 Docker：

```bash
docker --version
```

### 2. 进入项目目录

```bash
cd anywhere-door
```

### 3. 构建镜像

```bash
docker build -t anywhere-door:latest .
```

### 4. 启动容器

```bash
docker run -d \
  --name anywhere-door \
  -p 8080:80 \
  --restart unless-stopped \
  anywhere-door:latest
```

说明：

- 容器内 Nginx 监听 `80`
- 宿主机映射端口为 `8080`
- 如果希望直接使用宿主机 `80` 端口，可以改成 `-p 80:80`

### 5. 访问项目

本机访问：

```text
http://127.0.0.1:8080
```

服务器访问：

```text
http://你的服务器IP:8080
```

### 6. 查看运行状态

```bash
docker ps
docker logs -f anywhere-door
```

### 7. 停止和删除容器

```bash
docker stop anywhere-door
docker rm anywhere-door
```

### 8. 更新部署

如果你修改了前端文件，重新执行：

```bash
docker rm -f anywhere-door
docker build -t anywhere-door:latest .
docker run -d \
  --name anywhere-door \
  -p 8080:80 \
  --restart unless-stopped \
  anywhere-door:latest
```

## Docker Compose 部署

项目已经提供：

- [docker-compose.yml](./docker-compose.yml)

### 1. 检查环境

```bash
docker --version
docker compose version
```

### 2. 进入项目目录

```bash
cd anywhere-door
```

### 3. 构建并启动

```bash
docker compose up -d --build
```

默认端口映射：

```text
宿主机 8080 -> 容器 80
```

### 4. 查看服务状态和日志

```bash
docker compose ps
docker compose logs -f
```

### 5. 停止服务

```bash
docker compose down
```

### 6. 重新部署

代码更新后重新执行：

```bash
docker compose up -d --build
```

### 7. 修改端口

如果你想改成宿主机 `80` 端口，编辑 [docker-compose.yml](./docker-compose.yml)：

```yaml
ports:
  - "80:80"
```

然后重新启动：

```bash
docker compose up -d --build
```

## Nginx 直接部署

如果服务器已经安装了 Nginx，不想额外运行 Docker，可以使用这种方式。

参考配置文件：

- [nginx.host.conf.example](./nginx.host.conf.example)

下面以 Ubuntu 或 Debian 为例。

### 1. 安装 Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### 2. 创建站点目录

```bash
sudo mkdir -p /var/www/anywhere-door
```

### 3. 复制项目文件

将下面这些文件放到 `/var/www/anywhere-door`：

- `index.html`
- `styles.css`
- `script.js`
- `favicon.png`
- `favicon.ico`

如果你已经在服务器本机项目目录中，可以直接执行：

```bash
sudo cp index.html styles.css script.js favicon.png favicon.ico /var/www/anywhere-door/
```

### 4. 创建站点配置

```bash
sudo cp nginx.host.conf.example /etc/nginx/sites-available/anywhere-door
```

编辑配置：

```bash
sudo nano /etc/nginx/sites-available/anywhere-door
```

将下面两个值改成你的实际环境：

- `server_name your-domain.com;`
- `root /var/www/anywhere-door;`

### 5. 启用站点

```bash
sudo ln -sf /etc/nginx/sites-available/anywhere-door /etc/nginx/sites-enabled/anywhere-door
```

如果不需要默认站点，可以关闭：

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

### 6. 检查配置

```bash
sudo nginx -t
```

如果输出包含 `syntax is ok` 和 `test is successful`，说明配置正确。

### 7. 重载 Nginx

```bash
sudo systemctl reload nginx
```

### 8. 访问项目

如果还没有域名，先使用服务器 IP 验证：

```text
http://你的服务器IP
```

如果已经配置域名：

```text
http://your-domain.com
```

### 9. 更新发布

每次修改前端文件后，重新覆盖站点目录并重载 Nginx：

```bash
sudo cp index.html styles.css script.js favicon.png favicon.ico /var/www/anywhere-door/
sudo nginx -t
sudo systemctl reload nginx
```

## 可选：为 Nginx 配置 HTTPS

如果你已经有域名，建议启用 HTTPS。

### 1. 安装 Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. 申请并安装证书

```bash
sudo certbot --nginx -d your-domain.com
```

如果有多个域名，例如包含 `www`：

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3. 验证自动续期

```bash
sudo certbot renew --dry-run
```

## 常见问题

### 1. 为什么部署到服务器后，换一台电脑看不到之前保存的数据？

因为这个项目没有后端，数据保存在访问者当前浏览器里，不保存在服务器中。

### 2. 为什么清理浏览器数据后内容没了？

因为 `IndexedDB` 属于浏览器站点数据的一部分，清理站点数据时会一起删除。

### 3. 为什么推荐 HTTP 服务，而不是直接打开文件？

因为浏览器对 `file://` 协议下的本地存储和资源访问限制更多，普通 HTTP 服务更稳定。

### 4. 这个项目需要数据库吗？

不需要。它本质上是一个静态前端应用。
