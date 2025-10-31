# HoudMonster API

HoudMonster API is built with NestJS and provides endpoints to retrieve information about various Monster Energy drinks, including their flavors, nutritional information, and caffeine content.

## Routes

- `GET /monsters?name=''&type=''&minPrice=2` - Retrieve a list of all Monster Energy drinks with optional filters for name, type, and minimum price.
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

## Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```**bash**
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
