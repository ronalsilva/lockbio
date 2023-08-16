# Locke Bio Test

This project was developed by Ronald Junger. This project aims to test the developer's knowledge of TS + Prisma + Docker technologies for future developers joining the company.

## To start the project 

1. npm i
2. docker-compose up -d
    * After uploading the docker it will be necessary to create the bank in pgadmin
3. npx prisma db push
4. npx prisma db seed

## Database configuration

```
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}
```
## All environment variables are in .env

```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/lockbio"
PORT=8080
```
