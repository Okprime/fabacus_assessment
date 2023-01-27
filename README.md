## FABACUS SERVER API

## APPLICATION SUMMARY

This application is a simple token management system that allows the generation and redemption of tokens. 

It utilizes the Express.js framework and Redis for storage and caching. 

The application can be easily integrated into other systems and can be easily scaled by adding more Redis instances. 

To run the application, you will need to have Node.js and Redis installed on your machine. 

You can also use Docker and Docker Compose to run the application and its dependencies.

Examples of how to use the application include:


```bash
Generating tokens: curl -X POST "http://localhost:4500/generate-tokens?tokens=5"
```

```bash
Checking the status of a token: curl -X GET "http://localhost:4500/check/<token>"
```

```bash
Redeeming a token: curl -X PUT "http://localhost:4500/redeem/<token>"
```

It is important to note that you will need to replace <token> in the above examples with an actual token value.

This application could be useful for managing access to resources that are limited, 

for example, for creating a limited number of tokens for a promotion,

or for managing access to an API with a limited number of requests

## API DOCUMENTATION

```bash
https://documenter.getpostman.com/view/6090065/2s8ZDeTeWH
```

## PREREQUISITIES

Node.js version 12 or higher (https://nodejs.org/en/)

Redis version 4 or higher (https://redis.io/)

Docker (https://www.docker.com/)

## GETTING THE APP LOCALLY

Clone this repository with this command

```bash
git clone https://github.com/Okprime/fabacus_assessment.git
```

## RUN THE APP 

Run the applicaton using this command


```bash
docker compose up --build
```

NB: This application only runs on Docker


## TEST

```bash

# unit test
$ npm run test
```
