import { ApolloServer } from "@apollo/server";
import { ContextType } from "../src/context";
import { createServer } from "../src/server";
import { UserModel } from "../src/user/user.model";
import { SignupInput } from "../src/auth/dto/signup";
import * as argon2 from "argon2";
import request from "supertest";
import { PostModel } from "../src/post/post-model";
import { PostDocument } from "../src/post/entirty/post-document";

const user: SignupInput = {
  email: "tes1t@gmail.com",
  name: "john smith",
  password: "test23",
};
describe("AuthResolver E2E Tests", () => {
  let apolloServer: ApolloServer<ContextType>;
  let url: string;
  let mongooseConnection: any;

  async function login() {
    const response = await request(url)
      .post("/graphql")
      .send({
        query: `mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        name
      }
    }`,
        variables: {
          input: {
            password: "test12345",
            email: "test@gamil.com",
          },
        },
      });

    const data = response.body.data.login;
    return data.token;
  }

  async function createPost(token: string): Promise<PostDocument> {
    const response = await request(url)
      .post("/graphql")
      .set("authorization", token)
      .send({
        query: `mutation CreatePost($input: CreatePostInput!) {
          createPost(input: $input) {
            id
            content
            title
            authorId
            isPublished
            countOfLikes
            likedUsers
            tags
            createdAt
          }
        }`,
        variables: {
          input: {
            title: "how to live in netherlands",
            content: "living in netherlands can be so amazing if ...",
          },
        },
      });

    const post = response.body.data.createPost;
    return post;
  }
  beforeAll(async () => {
    const apolloServerInfo = await createServer();
    apolloServer = apolloServerInfo.apolloServer;
    url = apolloServerInfo.url;
    mongooseConnection = apolloServerInfo.mongooseConnection;
    await UserModel.deleteMany({});
    await PostModel.deleteMany({});
    await UserModel.create({
      email: "test@gamil.com",
      name: "jack",
      password: await argon2.hash("test12345"),
    });
  });
  afterAll(async () => {
    await apolloServer?.stop();

    await mongooseConnection.disconnect();
  });

  describe("auth", () => {
    it("should sing up", async () => {
      const response = await request(url)
        .post("/graphql")
        .send({
          query: `mutation Signup($input: SignupInput!) {
            signup(input: $input) {
              token
              name
            }
          }`,
          variables: {
            input: user,
          },
        });

      const data = response.body.data.signup;
      expect(data.name).toBe(user.name);
    });

    it("should login", async () => {
      const response = await request(url)
        .post("/graphql")
        .send({
          query: `mutation Login($input: LoginInput!) {
            login(input: $input) {
              token
              name
            }
          }`,
          variables: {
            input: {
              password: "test12345",
              email: "test@gamil.com",
            },
          },
        });

      const data = response.body.data.login;

      expect(data.name).toBe("jack");
    });
  });

  describe("post", () => {
    const createPostMutation = `mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          content
          title
          authorId
          isPublished
          countOfLikes
          likedUsers
          tags
          createdAt
        }
      }`;

    it("should create post", async () => {
      const token = await login();

      const response = await request(url)
        .post("/graphql")
        .set("authorization", token)
        .send({
          query: createPostMutation,
          variables: {
            input: {
              title: "how to live in netherlands",
              content: "living in netherlands can be so amazing if ...",
            },
          },
        });

      const post = response.body.data.createPost;
      expect(post.title).toBe("how to live in netherlands");
      expect(post.content).toBe(
        "living in netherlands can be so amazing if ..."
      );
    });

    it("should update post ", async () => {
      const token = await login();
      const post = await createPost(token);
      const updatePostMutation = `
      mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          id
          content
          title
          authorId
          isPublished
          countOfLikes
          likedUsers
          tags
          createdAt
        }
      }


      `;

      const response = await request(url)
        .post("/graphql")
        .set("authorization", token)
        .send({
          query: updatePostMutation,
          variables: {
            input: {
              content:
                "living in netherlands can be not only so amazing but also wonderful (updated)",
              id: post.id,
            },
          },
        });

      const updatedPost = response.body.data.updatePost;
      expect(updatedPost.content).toBe(
        "living in netherlands can be not only so amazing but also wonderful (updated)"
      );
    });

    it("should delete post ", async () => {
      const token = await login();
      const post = await createPost(token);
      const removePostMutation = `
      mutation RemovePost($removePostId: String!) {
        removePost(id: $removePostId) {
          id
          content
          title
          authorId
          isPublished
          countOfLikes
          likedUsers
          tags
          createdAt
        }
      } 
      `;

      const response = await request(url)
        .post("/graphql")
        .set("authorization", token)
        .send({
          query: removePostMutation,
          variables: {
            removePostId: post.id,
          },
        });

        console.log(response.body.data);
        

      const deletedPost = response.body.data.removePost;
      expect(deletedPost.id).toBe(post.id);
    });
  });
});
