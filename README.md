## Description

Bloguim: a simple blog...

## Installation
```bash
# set up .env (add your db user, password, dbname)

$ cp .env.example .env
```

```bash

$ npm install
```

```bash
# database migration
$ npm run db:migrate
```

```bash
# seed some sample data
$ npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
