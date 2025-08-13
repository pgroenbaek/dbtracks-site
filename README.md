# dbtracks-site

Reconstruction of Norbert Rieger's DBTracks website based on what was available on the wayback machine. 

## Building and running the site locally

First clone the repo.

```bash
git clone https://github.com/pgroenbaek/dbtracks-site.git
cd dbtracks-site
```

### Using npm

Make sure you have [Node.js and npm](https://nodejs.org/en/download) installed on your system.

To install dependencies and run the site locally:
```bash
npm install
npm start
```

The site can now be accessed at http://localhost:8080

### Using Docker

Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your system.

To build and run the docker image locally:
```bash
docker build -t dbtracks-site:latest .
docker run -p 8080:8080 dbtracks-site:latest
```

The site can now be accessed at http://localhost:8080


## Deploying to Cloudflare Pages

First, install and authenticate the Cloudflare Wrangler CLI:

```bash
npm install -g wrangler
wrangler login
```

Next, run the deployment script defined in `package.json`:

```
npm run deploy
```