# HoudiMonster API

HoudiMonster API is built with NestJS and provides endpoints to retrieve information about various Monster Energy drinks, including their flavors, nutritional information, and caffeine content.

## Table of Contents

- [Installation](#installation)
- [Database Setup](#database-setup)
  - [Prerequisites](#prerequisites)
  - [Database Setup Steps](#database-setup-steps)
- [Running the Application](#running-the-application)
  - [Running the app](#running-the-app)
  - [Database Commands](#database-commands)
- [Routes](#routes)
- [Data types](#data-types)
  - [Generate a file type for frontend](#generate-a-file-type-for-frontend)
  - [The data structure of a Monster drink](#the-data-structure-of-a-monster-drink)
  - [Test](#test)
- [Ops](#ops)
  - [Docker](#docker)
  - [Terraform](#terraform)
  - [Kubernetes](#kubernetes)
  - [Git CI/CD](#git-cicd)

## Installation

```bash
npm install
```

## Database Setup

This application uses PostgreSQL with Prisma ORM. The database can be run using Docker Compose.

### Prerequisites

- Docker and Docker Compose
- Node.js (version 18 or higher)

### Database Setup Steps

1. **Start the PostgreSQL database**:

```bash
docker-compose up -d postgres
```

2. **Generate Prisma client**:

```bash
npm run db:generate
```

3. **Fill the .env file**:

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL="postgresql://monster_user:monster_password@localhost:5432/monster_db?schema=public"
```

4. **Push the database schema**:

```bash
npm run db:push
```

5. **Seed the database with Monster data**:

```bash
npm run db:seed
```

## Running the Application

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data

## Routes

- `GET /monsters?name=''&type=''&minPrice=2&maxPrice=5` - Retrieve a list of all Monster Energy drinks with optional filters for name, type, and minimum/maximum price.
- `GET /monsters/:id` - Retrieve detailed information about a specific Monster Energy drink by its ID.
- `GET /monsters/type/:type` - Retrieve Monster Energy drinks filtered by type (e.g., Ultra, Punch, Energy).

## Data types

### Generate a file type for frontend

You can generate TypeScript types for the API responses using the following command:

```bash
$ npm run generate:api
```

A file of that type should already be generated in `./src/types/api-types.ts`. It is regenerated after every commit.

### The data structure of a Monster drink

Each Monster drink object contains the following properties:

- `id`: Unique identifier for the Monster drink.
- `name`: Name of the Monster drink.
- `price`: Price of the Monster drink.
- `type`: Type/category of the Monster drink.
- `description`: Description of the Monster drink.
- `imageUrl`: URL to an image of the Monster drink.

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Ops and infrastructure management

### Terraform

Infrastructure as Code using Terraform to provision Kubernetes resources and database configurations.

#### Prerequisites

- Terraform >= 1.3.0
- Kubernetes cluster and kubectl configured
- Helm (for chart deployments)

#### Deploy Infrastructure

```bash
cd terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -var="db_password=your_secure_password" -var="db_host=your_db_host"

# Apply infrastructure
terraform apply -var="db_password=your_secure_password" -var="db_host=your_db_host"
```

#### Key Resources

- **Namespace**: Creates `houdimonster` namespace
- **Database Module**: Configures database connection and secrets
- **Kubernetes Module**: Deploys application resources

#### Variables

- `kubeconfig_path`: Path to kubeconfig file (default: `~/.kube/config`)
- `kube_context`: Kubernetes context to use (default: `minikube`)
- `namespace`: Target namespace (default: `houdimonster`)
- `db_host`: Database host (required)
- `db_password`: Database password (required, sensitive)
- `backend_image`: Container image repository
- `backend_replicas`: Number of application replicas

### Kubernetes

Kubernetes manifests for deploying the application to a cluster.

#### Direct Deployment

Apply Kubernetes manifests directly:

```bash
# Create namespace (if not using Terraform)
kubectl create namespace houdimonster

# Create database secret
kubectl create secret generic monster-db-secret \
  --from-literal=DATABASE_URL="postgresql://monster_user:monster_password@localhost:5432/monster_db?schema=public" \
  -n houdimonster

# Deploy application
kubectl apply -f k8s-backend-deployment.yaml -n houdimonster
kubectl apply -f k8s-backend-service.yaml -n houdimonster
```

#### Application Configuration

- **Deployment**: 2 replicas with resource limits (250m CPU, 256Mi memory)
- **Service**: ClusterIP service exposing port 3000
- **Environment**: Database URL from Kubernetes secret
- **Health**: Container port 3000 for health checks

#### Verify Deployment

```bash
# Check deployment status
kubectl get deployments -n houdimonster

# Check pods
kubectl get pods -n houdimonster

# Check service
kubectl get services -n houdimonster

# Port forward for local access
kubectl port-forward service/backend-service 3000:3000 -n houdimonster
```

### Git CI/CD

Automated CI/CD pipeline using GitHub Actions with three main workflows:

#### Workflows

**1. Unit Tests** (`.github/workflows/unit-tests.yml`)
- **Triggers**: Push/PR to `main` or `develop` branches
- **Steps**:
  - Checkout code
  - Setup Node.js 20
  - Install dependencies
  - Generate Prisma client
  - Run linting
  - Execute unit tests
  - Build application

**2. Docker Build and Push** (`.github/workflows/docker-build.yml`)
- **Triggers**: Push to `main`/`develop`, tags (`v*`), PRs to `main`
- **Registry**: GitHub Container Registry (`ghcr.io`)
- **Steps**:
  - Build multi-platform Docker images
  - Push to registry with multiple tags (branch, semver, SHA)
  - Automatic tagging based on git refs

**3. Deploy** (`.github/workflows/deploy.yml`)
- **Triggers**: 
  - Automatic: After successful docker build on `main`
  - Manual: Workflow dispatch with environment and tag selection
- **Environments**: Staging and Production
- **Features**:
  - Environment-specific deployments
  - Manual approval gates
  - Rollback capabilities

#### Deployment Process

1. **Development**: Push to `develop` → Unit tests + Docker build
2. **Production**: Push to `main` → Unit tests + Docker build + Auto-deploy to staging
3. **Manual Deploy**: Use workflow dispatch for specific tag/environment deployment
