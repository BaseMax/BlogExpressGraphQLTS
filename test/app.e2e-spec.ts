import { ApolloServer } from "@apollo/server";
import { ContextType } from "../src/context";
import { createServer } from "../src/server";
import { UserModel } from "../src/user/user.model";
import { SignupInput } from "../src/auth/dto/signup";
import * as argon2 from "argon2";
import request from "supertest";

const user: SignupInput = {
  email: "tes1t@gmail.com",
  name: "john smith",
  password: "test23",
};
describe("AuthResolver E2E Tests", () => {
  let apolloServer: ApolloServer<ContextType>;
  let url: string;
  beforeAll(async () => {
    const apolloServerInfo = await createServer();
    apolloServer = apolloServerInfo.apolloServer;
    url = apolloServerInfo.url;
    await UserModel.deleteMany({});
    await UserModel.create({
      email: "test@gamil.com",
      name: "jack",
      password: await argon2.hash("test12345"),
    });
  });

  describe("auth", () => {
    afterAll(async () => {
      await apolloServer.stop();
    });

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
      console.log(data);

      expect(data.name).toBe("jack");
    });
  });
});
