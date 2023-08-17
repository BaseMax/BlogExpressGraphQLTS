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
DATABASE_URL=mongodb://localhost/blog-express-graphql # MongoDB connection URI
SECRET_KEY=your-secret-key # Secret key for JWT authentication
```

## Running the Server

Start the server using the following command:

```bash
$ tsc

$ npm run dev
```

The server should now be running at `http://localhost:3000`. You can access the GraphQL playground at `http://localhost:3000/graphql` to interact with the API and explore available queries and mutations.

## Usage

The GraphQL schema and resolvers define the available queries and mutations for the blog application. You can refer to the schema and resolver files in the src/graphql directory to understand the available functionality and customize them according to your needs.

## GraphQL

| Query/Mutation       | Description                               | Example                                                                              |
|---------------------|-------------------------------------------|--------------------------------------------------------------------------------------|
| `getAllPosts`       | Get a list of all blog posts.            | `graphql query { getAllPosts { id title content createdAt } }`                        |
| `getPostById`       | Get a single blog post by ID.           | `graphql query { getPostById(id: "post-id") { id title content createdAt } }`         |
| `getAllTags`        | Get a list of all available tags.       | `graphql query { getAllTags { id name } }`                                           |
| `getUserById`       | Get a user's information by ID.        | `graphql query { getUserById(id: "user-id") { id username email } }`                 |
| `login`             | Authenticate a user and receive a token.| `graphql mutation { login(email: "user@example.com", password: "password") }`         |
| `createPost`        | Create a new blog post.               | `graphql mutation { createPost(title: "New Post", content: "Lorem ipsum...") }`       |
| `updatePost`        | Update an existing blog post.         | `graphql mutation { updatePost(id: "post-id", title: "Updated Title") }`              |
| `deletePost`        | Delete a blog post.                  | `graphql mutation { deletePost(id: "post-id") }`                                     |
| `addComment`        | Add a comment to a blog post.        | `graphql mutation { addComment(postId: "post-id", content: "Great post!") }`          |
| `updateComment`     | Update an existing comment.          | `graphql mutation { updateComment(id: "comment-id", content: "Updated comment.") }`   |
| `deleteComment`     | Delete a comment.                   | `graphql mutation { deleteComment(id: "comment-id") }`                               |
| `likePost`          | Like a blog post.                   | `graphql mutation { likePost(id: "post-id") }`                                        |
| `unlikePost`        | Remove a like from a blog post.     | `graphql mutation { unlikePost(id: "post-id") }`                                      |
| `getPostsByTag`     | Get a list of blog posts by tag.       | `graphql query { getPostsByTag(tagId: "tag-id") { id title content createdAt } }`    |
| `getCommentsByPost` | Get comments for a specific post.     | `graphql query { getCommentsByPost(postId: "post-id") { id content createdAt } }`    |
| `getUserPosts`      | Get posts created by a user.          | `graphql query { getUserPosts(userId: "user-id") { id title content createdAt } }`   |
| `searchPosts`       | Search for posts based on keywords.  | `graphql query { searchPosts(query: "GraphQL") { id title content createdAt } }`     |
| `likeComment`       | Like a comment.                      | `graphql mutation { likeComment(id: "comment-id") }`                                  |
| `unlikeComment`     | Remove a like from a comment.        | `graphql mutation { unlikeComment(id: "comment-id") }`                                |
| `createUser`        | Create a new user.                  | `graphql mutation { createUser(username: "newuser", email: "user@example.com") }`    |
| `updateUser`        | Update user information.            | `graphql mutation { updateUser(id: "user-id", email: "new-email@example.com") }`     |
| `deleteUser`        | Delete a user.                     | `graphql mutation { deleteUser(id: "user-id") }`                                      |
| `addTagToPost`      | Add a tag to a post.               | `graphql mutation { addTagToPost(postId: "post-id", tagId: "tag-id") }`               |
| `removeTagFromPost` | Remove a tag from a post.         | `graphql mutation { removeTagFromPost(postId: "post-id", tagId: "tag-id") }`          |
| `getMostLikedPosts`  | Get a list of the most liked posts.     | `graphql query { getMostLikedPosts { id title likesCount } }`                         |
| `getRecentPosts`     | Get a list of recent blog posts.       | `graphql query { getRecentPosts { id title createdAt } }`                             |
| `getPopularTags`     | Get a list of popular tags.           | `graphql query { getPopularTags { id name popularity } }`                             |
| `getTaggedPosts`     | Get posts associated with a tag.      | `graphql query { getTaggedPosts(tagId: "tag-id") { id title content createdAt } }`   |
| `getUserComments`   | Get comments made by a user.         | `graphql query { getUserComments(userId: "user-id") { id content createdAt } }`     |
| `getUserLikes`      | Get posts and comments liked by a user. | `graphql query { getUserLikes(userId: "user-id") { id content type } }`             |
| `createTag`         | Create a new tag.                   | `graphql mutation { createTag(name: "New Tag") }`                                    |
| `updateTag`         | Update a tag's information.         | `graphql mutation { updateTag(id: "tag-id", name: "Updated Tag") }`                  |
| `deleteTag`         | Delete a tag.                      | `graphql mutation { deleteTag(id: "tag-id") }`                                       |
| `togglePostLike`    | Toggle like status on a post.      | `graphql mutation { togglePostLike(id: "post-id") }`                                 |
| `toggleCommentLike` | Toggle like status on a comment.   | `graphql mutation { toggleCommentLike(id: "comment-id") }`                           |
| `getCommentReplies`  | Get replies to a specific comment.    | `graphql query { getCommentReplies(commentId: "comment-id") { id content createdAt } }` |
| `getPostsByUser`     | Get posts authored by a user.       | `graphql query { getPostsByUser(userId: "user-id") { id title content createdAt } }`   |
| `getTrendingPosts`   | Get trending posts based on activity. | `graphql query { getTrendingPosts { id title viewsCount } }`                           |
| `getFeaturedPosts`   | Get featured posts.                | `graphql query { getFeaturedPosts { id title featured } }`                             |
| `getUserActivity`   | Get a user's recent activity.     | `graphql query { getUserActivity(userId: "user-id") { id type targetId createdAt } }`  |
| `createComment`     | Create a new comment.             | `graphql mutation { createComment(postId: "post-id", content: "Great post!") }`       |
| `deleteUserActivity`| Delete a user's activity record. | `graphql mutation { deleteUserActivity(activityId: "activity-id") }`                  |
| `createPostWithTags`| Create a new post with tags.     | `graphql mutation { createPostWithTags(title: "New Post", content: "Lorem ipsum...", tags: ["tag-id-1", "tag-id-2"]) }` |
| `updateUserProfile` | Update user profile information. | `graphql mutation { updateUserProfile(id: "user-id", bio: "Updated bio") }`           |
| `getCommentLikes`   | Get likes on a specific comment.  | `graphql query { getCommentLikes(commentId: "comment-id") { id user { id username } } }` |
| `getUserActivity`  | Get a user's activity log.       | `graphql query { getUserActivity(userId: "user-id") { id type createdAt } }`           |
| `getUserNotifications`| Get notifications for a user.       | `graphql query { getUserNotifications(userId: "user-id") { id message createdAt } }`   |
| `markNotificationAsRead` | Mark a notification as read.    | `graphql mutation { markNotificationAsRead(notificationId: "notification-id") }` |
| `createNotification`  | Create a new notification.        | `graphql mutation { createNotification(userId: "user-id", message: "New notification.") }` |
| `getRelatedPosts`     | Get related posts for a specific post. | `graphql query { getRelatedPosts(postId: "post-id") { id title } }` |
| `getPostsByDateRange` | Get posts within a date range.     | `graphql query { getPostsByDateRange(startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt } }` |
| `toggleFollowUser`    | Toggle following/unfollowing a user. | `graphql mutation { toggleFollowUser(userId: "user-id-to-follow") }` |
| `getFollowers`        | Get followers of a user.            | `graphql query { getFollowers(userId: "user-id") { id username } }` |
| `getFollowing`        | Get users a user is following.     | `graphql query { getFollowing(userId: "user-id") { id username } }` |
| `getUserStats`        | Get statistics for a user.         | `graphql query { getUserStats(userId: "user-id") { postsCount followersCount followingCount } }` |
| `uploadImage`         | Upload and attach an image.       | `graphql mutation { uploadImage(file: File!) { id url } }` |
| `getDraftPosts`      | Get draft posts for a user.          | `graphql query { getDraftPosts(userId: "user-id") { id title content createdAt } }` |
| `publishPost`        | Publish a draft post.               | `graphql mutation { publishPost(postId: "post-id") }`                               |
| `getFeaturedAuthors` | Get a list of featured authors.     | `graphql query { getFeaturedAuthors { id username } }`                             |
| `getTopTags`         | Get top tags by usage count.        | `graphql query { getTopTags(limit: 5) { id name usageCount } }`                     |
| `getPostComments`    | Get comments for a specific post.  | `graphql query { getPostComments(postId: "post-id") { id content createdAt } }`     |
| `createPostComment`  | Create a comment on a post.       | `graphql mutation { createPostComment(postId: "post-id", content: "Great post!") }` |
| `deletePostComment`  | Delete a comment on a post.       | `graphql mutation { deletePostComment(commentId: "comment-id") }`                  |
| `getUserDrafts`      | Get draft posts authored by a user. | `graphql query { getUserDrafts(userId: "user-id") { id title createdAt } }`        |
| `searchUsers`        | Search for users by username.      | `graphql query { searchUsers(query: "username") { id username } }`                  |
| `getLatestComments`  | Get the latest comments.          | `graphql query { getLatestComments(limit: 10) { id content createdAt } }`           |
| `getPostsByPopularity`| Get posts ordered by popularity.  | `graphql query { getPostsByPopularity { id title viewsCount } }`                    |
| `updateUserPassword` | Update a user's password.         | `graphql mutation { updateUserPassword(id: "user-id", password: "new-password") }` |
| `getMostActiveUsers`  | Get a list of the most active users. | `graphql query { getMostActiveUsers(limit: 5) { id username postsCount commentsCount } }` |
| `getUserInteractions`| Get user interactions (posts, comments, likes). | `graphql query { getUserInteractions(userId: "user-id") { id type targetId createdAt } }` |
| `getPostsByViews`    | Get posts ordered by views count. | `graphql query { getPostsByViews { id title viewsCount } }` |
| `getPostsByTagAndDate`| Get posts by a specific tag and date range. | `graphql query { getPostsByTagAndDate(tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt } }` |
| `getFeaturedPostsByTag` | Get featured posts with a specific tag. | `graphql query { getFeaturedPostsByTag(tagId: "tag-id") { id title featured } }` |
| `getPopularAuthors` | Get popular authors based on likes and comments. | `graphql query { getPopularAuthors(limit: 3) { id username likesCount commentsCount } }` |
| `updatePostViews` | Update post views count. | `graphql mutation { updatePostViews(postId: "post-id", viewsCount: 100) }` |
| `getUserByEmail` | Get user information by email. | `graphql query { getUserByEmail(email: "user@example.com") { id username } }` |
| `getCommentByContent` | Get comments based on content. | `graphql query { getCommentByContent(content: "Great post!") { id content createdAt } }` |
| `createTagWithPosts` | Create a new tag with associated posts. | `graphql mutation { createTagWithPosts(name: "New Tag", postIds: ["post-id-1", "post-id-2"]) }` |
| `updateUserAvatar` | Update user avatar image. | `graphql mutation { updateUserAvatar(id: "user-id", avatarUrl: "https://example.com/avatar.jpg") }` |
| `getPostsByUserAndTag` | Get posts by a specific user and tag. | `graphql query { getPostsByUserAndTag(userId: "user-id", tagId: "tag-id") { id title } }` |
| `getPostsByUserAndDate` | Get posts by a specific user and date range. | `graphql query { getPostsByUserAndDate(userId: "user-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt } }` |
| `getPostsByAuthorAndTag`| Get posts by a specific author and tag. | `graphql query { getPostsByAuthorAndTag(authorId: "author-id", tagId: "tag-id") { id title } }` |
| `getPostsByAuthorAndDate`| Get posts by a specific author and date range. | `graphql query { getPostsByAuthorAndDate(authorId: "author-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt } }` |
| `getTrendingTags`       | Get trending tags based on usage.        | `graphql query { getTrendingTags(limit: 5) { id name usageCount } }`                         |
| `getUserActivityLog`   | Get detailed activity log for a user. | `graphql query { getUserActivityLog(userId: "user-id") { id actionType targetType targetId createdAt } }` |
| `getTagPostsByPopularity` | Get posts of a specific tag ordered by popularity. | `graphql query { getTagPostsByPopularity(tagId: "tag-id") { id title popularity } }` |
| `getPostsByAuthorAndTagAndDate` | Get posts by a specific author, tag, and date range. | `graphql query { getPostsByAuthorAndTagAndDate(authorId: "author-id", tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt } }` |
| `getPostsByAuthorAndTagAndViews` | Get posts by a specific author, tag, and views count. | `graphql query { getPostsByAuthorAndTagAndViews(authorId: "author-id", tagId: "tag-id", minViews: 100) { id title viewsCount } }` |
| `getPostsByTagAndPopularity` | Get posts of a specific tag ordered by popularity. | `graphql query { getPostsByTagAndPopularity(tagId: "tag-id") { id title popularity } }` |
| `getPostsByTagAndViews` | Get posts of a specific tag ordered by views count. | `graphql query { getPostsByTagAndViews(tagId: "tag-id") { id title viewsCount } }` |
| `getPostsByTagAndDateAndPopularity` | Get posts by a specific tag, date range, and popularity. | `graphql query { getPostsByTagAndDateAndPopularity(tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt popularity } }` |
| `getPostsByTagAndDateAndViews` | Get posts by a specific tag, date range, and views count. | `graphql query { getPostsByTagAndDateAndViews(tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt viewsCount } }` |
| `getPostsByAuthorAndTagAndPopularity` | Get posts by a specific author, tag, and popularity. | `graphql query { getPostsByAuthorAndTagAndPopularity(authorId: "author-id", tagId: "tag-id") { id title popularity } }` |
| `getPostsByAuthorAndTagAndViews` | Get posts by a specific author, tag, and views count. | `graphql query { getPostsByAuthorAndTagAndViews(authorId: "author-id", tagId: "tag-id") { id title viewsCount } }` |
| `getPostsByAuthorAndDateAndPopularity` | Get posts by a specific author, date range, and popularity. | `graphql query { getPostsByAuthorAndDateAndPopularity(authorId: "author-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt popularity } }` |
| `getPostsByAuthorAndDateAndViews` | Get posts by a specific author, date range, and views count. | `graphql query { getPostsByAuthorAndDateAndViews(authorId: "author-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt viewsCount } }` |
| `getPostsByAuthorAndTagAndDateAndPopularity` | Get posts by a specific author, tag, date range, and popularity. | `graphql query { getPostsByAuthorAndTagAndDateAndPopularity(authorId: "author-id", tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt popularity } }` |
| `getPostsByAuthorAndTagAndDateAndViews` | Get posts by a specific author, tag, date range, and views count. | `graphql query { getPostsByAuthorAndTagAndDateAndViews(authorId: "author-id", tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt viewsCount } }` |
| `getPostsByTagAndDateAndPopularity` | Get posts by a specific tag, date range, and popularity. | `graphql query { getPostsByTagAndDateAndPopularity(tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt popularity } }` |
| `getPostsByTagAndDateAndViews` | Get posts by a specific tag, date range, and views count. | `graphql query { getPostsByTagAndDateAndViews(tagId: "tag-id", startDate: "2023-01-01", endDate: "2023-12-31") { id title createdAt viewsCount } }` |
| `getPostsByTagAndPopularity` | Get posts of a specific tag ordered by popularity. | `graphql query { getPostsByTagAndPopularity(tagId: "tag-id") { id title popularity } }` |
| `getPostsByTagAndViews` | Get posts of a specific tag ordered by views count. | `graphql query { getPostsByTagAndViews(tagId: "tag-id") { id title viewsCount } }` |
| `getPostsByViewsAndPopularity` | Get posts ordered by both views and popularity. | `graphql query { getPostsByViewsAndPopularity { id title viewsCount popularity } }` |
| `getTagById` | Get a tag by ID. | `graphql query { getTagById(tagId: "tag-id") { id name } }` |
| `getAllNotifications` | Get all notifications. | `graphql query { getAllNotifications { id message createdAt } }` |
| `deleteNotification` | Delete a notification. | `graphql mutation { deleteNotification(notificationId: "notification-id") }` |
| `markAllNotificationsAsRead` | Mark all notifications as read. | `graphql mutation { markAllNotificationsAsRead(userId: "user-id") }` |
| `getPostsByUserAndViewsAndPopularity` | Get posts by a specific user ordered by both views and popularity. | `graphql query { getPostsByUserAndViewsAndPopularity(userId: "user-id") { id title viewsCount popularity } }` |

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request. Please make sure to follow the existing code style and guidelines.

## License

This project is licensed under the GPL-3.0 License. See the LICENSE file for details.

Copyright 2023, Max Base
