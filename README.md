# Blog Express GraphQL TS

BlogExpressGraphQLTS is a TypeScript-based project for creating a feature-rich blog using Express.js and GraphQL, without relying on NestJS. This project aims to provide a flexible and powerful backend solution for managing a blog application through GraphQL queries and mutations.

## Features

- **GraphQL API**: Utilize the power of GraphQL to efficiently query and manipulate data according to your application's needs.
- **Express.js**: Built on top of Express.js, allowing you to have fine-grained control over your server configuration and middleware setup.
- **Full-Featured Blog**: Implement a comprehensive set of features for a fully functional blog, including creating, updating, and deleting blog posts, user authentication, comments, tags, and more.
- **TypeScript**: Leverage TypeScript's static typing to enhance code quality, maintainability, and development experience.

## Getting Started

Follow these steps to set up and run the BlogExpressGraphQLTS project on your local machine.

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

Clone the repository:

```bash
git clone https://github.com/BaseMax/BlogExpressGraphQLTS.git
```

Navigate to the project directory:

```bash
cd BlogExpressGraphQLTS
```

Install dependencies:

```bash
npm install
```

## Configuration

Rename the `.env.example` file to `.env` in the root directory.

Open the .env file and configure the environment variables:

```makefile
PORT=3000           # Port on which the server will run
DB_URI=mongodb://localhost/blog-express-graphql # MongoDB connection URI
SECRET_KEY=your-secret-key # Secret key for JWT authentication
```

## Running the Server

Start the server using the following command:

```bash
npm start
```

The server should now be running at `http://localhost:3000`. You can access the GraphQL playground at `http://localhost:3000/graphql` to interact with the API and explore available queries and mutations.

## Usage

The GraphQL schema and resolvers define the available queries and mutations for the blog application. You can refer to the schema and resolver files in the src/graphql directory to understand the available functionality and customize them according to your needs.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request. Please make sure to follow the existing code style and guidelines.

## License

This project is licensed under the GPL-3.0 License. See the LICENSE file for details.

Copyright 2023, Max Base
