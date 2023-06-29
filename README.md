# Url Shortener

This is a URL shortener application. It allows users to shorten long URLs by create short, unique URL that redirects to the original long URL. This is a URL shortener application that consists of both a backend and a frontend component. The backend is built using TypeScript with NestJS, while the frontend is built using JavaScript with Next.js.

## Features

Shorten long URLs to create concise and easily shareable links.

Redirect users to the original long URL when they access the shortened URL.

Track the number of times a shortened URL has been accessed.

User-friendly interface for managing and creating new shortened URLs

## Built with

| Section        | Technology                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend        | <a href="https://www.typescriptlang.org/"><img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /></a> <a href="https://nestjs.com/"><img alt="Nestjs" src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" /></a>                                                                                                                                                                                   |
| Frontend       | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /></a> <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a> <a href="https://nextjs.org/"><img alt="Nextjs" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /></a> |
| Database       | <a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /></a>                                                                                                                                                                                                                                                                                                                                               |
| API            | RESTful API endpoints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Authentication | Google                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Installation

Follow these steps to set up and run the app:

Clone the repository.

### Backend

Navigate to the backend directory.

```
cd backend
```

Install the dependencies by running npm install.

```
npm install
```

Set up the database (This project uses PostgreSQL as the default database).

Setup the environment variables: a .env.example file is included the root of the backend directory, it contains all the environment variables needed for the backend. Create a .env file and copy the contents of the .env.example to the just create .env file.

Start the backend server by running npm run start.

```
npm run start
```

### Frontend

Navigate to the frontend directory.

```
cd frontend
```

Install the dependencies by running npm install.

```
npm install
```

Setup the environment variables: a .env.example file is included in the root of the backend directory, it contains all the environment variables needed for the backend. Create a .env file and copy the contents of the .env.example to the just create .env file.

Start the frontend server by running npm run dev.

```
npm run dev
```

## Usage

Once the application is set up and running, follow these steps to use the application:

Access the frontend application by visiting the provided URL.

Register an account or log in to an existing account.

Go to your dashboard

Use the interface to create a shortened URL by providing the original URL and an alias.

Copy the shortened URL and share it with others.

When users visit the shortened URL, they will be redirected to the original long URL.

Use the dashboard to view analytics, such as the number of clicks, for each shortened URL.

## Contributions

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.

Create a new branch for your feature or bug fix.

Implement your changes and ensure they are properly tested.

Commit and push your changes to your forked repository.

Submit a pull request, clearly explaining the changes you've made.

## Licence

This project is under the MIT license. See the LICENSE for more information.

The logo used in this project was created by crywill from <a href="https://thenounproject.com/browse/icons/term/link/" target="_blank" title="link Icons">Noun Project</a>
