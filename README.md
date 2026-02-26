# HoudiMonster API

HoudiMonster API is built with NestJS and provides endpoints to retrieve information about various Monster Energy drinks, including their flavors, nutritional information, and caffeine content.

## Installation

```bash
$ npm install
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