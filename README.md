# Express CI/CD Demo 🚀

A Node.js Express app with full CI/CD pipeline using GitHub Actions and Docker Hub.

---

## Steps to Set Up

### 1. Create the Node Project (Express)
This repo is your starting point. Install dependencies:
```bash
npm install
npm start          # runs on http://localhost:3000
npm test           # runs Jest tests
```

### 2. Create a GitHub Repository & Push
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/express-cicd-demo.git
git push -u origin main
```

### 3. Dockerize the Application
Build and run locally:
```bash
docker build -t express-cicd-demo .
docker run -p 3000:3000 express-cicd-demo
```

### 4. GitHub Actions Pipelines
Two pipelines live in `.github/workflows/`:

| File | Trigger | Purpose |
|------|---------|---------|
| `ci.yml` | Every push / PR | Install deps, run tests, lint |
| `cd.yml` | Push to `main` | Build Docker image, push to Docker Hub, deploy |

### 5. Set Up Docker Hub Secrets
In your GitHub repo → **Settings → Secrets and Variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Your Docker Hub access token ([create one here](https://hub.docker.com/settings/security)) |

### 6. Run the Image in a Container
After the CD pipeline runs, pull and run the published image:
```bash
docker pull YOUR_DOCKERHUB_USERNAME/express-cicd-demo:latest
docker run -d -p 3000:3000 --name express-app YOUR_DOCKERHUB_USERNAME/express-cicd-demo:latest
```

Verify it's running:
```bash
curl http://localhost:3000/health
# {"status":"OK"}
```

---

## Project Structure
```
.
├── .github/
│   └── workflows/
│       ├── ci.yml        # CI pipeline
│       └── cd.yml        # CD pipeline
├── src/
│   ├── index.js          # Express app
│   └── index.test.js     # Jest tests
├── Dockerfile            # Multi-stage Docker build
├── .dockerignore
├── .gitignore
└── package.json
```

## Endpoints
| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Hello world response |
| `/health` | GET | Health check (used by Docker) |
