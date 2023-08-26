# Blog Express GraphQL TS

BlogExpressGraphQLTS is a TypeScript-based project for creating a feature-rich blog using Express.js and GraphQL, without relying on NestJS. This project aims to provide a flexible and powerful backend solution for managing a blog application through GraphQL queries and mutations.

## Features

- **GraphQL API**: Utilize the power of GraphQL to efficiently query and manipulate data according to your application's needs.
- **Express.js**: Built on top of Express.js, allowing you to have fine-grained control over your server configuration and middleware setup.
- **Type-graph** : it is a Modern framework for GraphQL API in Node.js to build schemas more flexible
- **Apollo Server** : Build a production-ready GraphQL API in Node.js. Fetch and combine results from multiple data sources.
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
DATABASE_URI=mongodb://localhost/blog-express-graphql # MongoDB connection URI
SECRET_KEY=your-secret-key # Secret key for JWT authentication
```

## Running the Server

Start the server using the following command:

```bash
$ tsc

$ npm run dev
```

The server should now be running at `http://localhost:4000`. You can access the GraphQL playground at `http://localhost:4000/graphql` to interact with the API and explore available queries and mutations.

## Usage

The GraphQL schema and resolvers define the available queries and mutations for the blog application. You can refer to the schema and resolver files in the src/graphql directory to understand the available functionality and customize them according to your needs.

## GraphQL

| Query/Mutation            | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `likeComment`             | Like a comment.                                    |
| `unlikeComment`           | Remove a like from a comment.                      |
| `updatePost`              | Update an existing blog post.                      |
| `getAllTags`              | Get a list of all available tags.                  |
| `getTagPostsByPopularity` | Get posts of a specific tag ordered by popularity. |

| `getAllPosts` | Get a list of all blog posts. | ![get all posts](./screenshots/getAllPosts.png) |
| `getPostById` | Get a single blog post by ID. | ![get post by id](./screenshots/getPostById.png) |
| `login` | Authenticate a user and receive a token. | ![login](./screenshots/login.png) |
| `createPost` | Create a new blog post. | ![create post](./screenshots/createPost.png) |
| `deletePost` | Delete a blog post. | ![delete comment](./screenshots/deleteComment.png) |
| `createComment` | Add a comment to a blog post. | ![add comment](./screenshots/createComment.png) |
| `updateComment` | Update an existing comment. | ![update document](./screenshots/updateComment.png) |
| `deleteComment` | Delete a comment. | ![delete comment](./screenshots/deleteComment.png) |
| `likePost` | Like a blog post. | |
| `unlikePost` | Remove a like from a blog post. | ![like post](./screenshots/likePost.png) |
| `getPostsByTag` | Get a list of blog posts by tag. | ![get post by tag](./screenshots/getPostByTag.png) |
| `searchPosts` | Search for posts based on keywords. | ![search posts](./screenshots/search.png) |
| `signUp` | Create a new user. | ![user sign up](./screenshots/signup.png) |
| `addTagToPost` | Add a tag to a post. | ![add tag to post](./screenshots/addTagToPost.png) |
| `removeTagFromPost` | Remove a tag from a post. | ![remove tag from post](./screenshots/removeTagFromPost.png) |
| `createTag   ` | Create a new tag. | ![create tag](./screenshots/createTag.png) |
| `deleteTag` | Delete a tag. | ![delete tag](./screenshots/deleteTag.png) |
|`getCommentReplies` | Get replies to a specific comment. | ![get comment replies](./screenshots/getCommentsReply.png) |
| `createComment` | Create a new comment. | ![create comment](./screenshots/createComment.png) |
| `publishPost` | Publish a draft post. | ![publish post](./screenshots/publishPost.png) |
| `getTopTag` | Get top tag by usage count. | ![get popular tags](./screenshots/getPopularTag.png) |
| `getPostComments` | Get comments for a specific post. | ![get post comments](./screenshots/getPostComments.png) |
| `createPostComment` | Create a comment on a post. | ![create comment](./screenshots/createComment.png) |
| `deletePostComment` | Delete a comment on a post. | ![delete post comment](./screenshots/deleteComment.png) |
| `getPostsByPopularity` | Get posts ordered by popularity. | ![get popular post](./screenshots/getMostLikedPosts.png) |
| `getPopularAuthors` | Get popular authors based on likes and comments. | ![get popular authors](./screenshots/getPopularAuthors.png) |
| `getCommentByContent` | Get comments based on content. | ![get comment by content](./screenshots/searchComment.png) |
| `getPostsByUser` | Get posts by a specific user. | ![get post by user](./screenshots/getUserPosts.png) |
| `getTrendingTags` | Get trending tags based on usage. | ![get post by tag](./screenshots/getMostLikedPosts.png) |
| `getPostsByTagAndPopularity` | Get posts of a specific tag ordered by popularity. | ![get post by tag](./screenshots/getPostByTag.png) |
| `getTagById` | Get a tag by ID. | ![get tag by id](./screenshots/getTagById.png) |

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request. Please make sure to follow the existing code style and guidelines.

## License

This project is licensed under the GPL-3.0 License. See the LICENSE file for details.

Copyright 2023, Max Base
