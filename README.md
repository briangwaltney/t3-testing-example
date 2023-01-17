# Testing T3 App Example


## Purpose

I would like to see a working example of how to test trpc on the front and backend.

This repo starts with a working backend test suite that makes live calls to a locally hosted db.

This approach has worked really well so far in production.

I am still struggling with how to test anything on the frontend. I would like to find a wrapper
for the components and hooks that will let me render them with mocked data or let them call a 
local database that is running like in the backend tests.

I have tried several approaches to trpc wrapper, but as soon as that gets close to working,
the next-auth session wrapper screws everything up for me and I get stuck.


## Setup

A `.env.test` file is required to start the tests.

The only required env variables are: 

```
NODE_ENV="test"
DATABASE_URL="mysql://root:YOURPASSWORD@localhost:3310/t3-example-tests"
```

The port in the `DATABASE_URL` matches the `docker-compose.yml` file, but can be changed as needed, of course. Just be sure to change them in both locations.

Setting up the db in any other way works too, but I found this to be fastest for a local environment that is easy to reset whenever required.

To get the repo working, docker is required to create the test dbs
With Docker running in the background, call `npm run docker:up`. 

You can then migrate the prisma schema to the test db using `npm run migrate:test`.

`npm run test` will start Vitest in watch mode and will show failing tests at the
time of this writing. Those are the frontend tests that need wrappers for the 
hooks and components.

## Tools in use

Vitest and React Testing Library are the testing utilities in use. I have got to this point with Jest on other projects, but the setup is more extensive as 
testing environments for front and backend need to be set individually.