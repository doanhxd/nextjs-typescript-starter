require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  Context,
} from "apollo-server-core";
import { UserResolver } from "./resolvers/user";
import mongoose from "mongoose";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "nextjs-types",
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    logging: true,
    synchronize: true,
    entities: [User, Post],
  });

  const app = express();

  // Session/Cookies store
  await mongoose.connect(
    `mongodb+srv://${process.env.SESSION_DB_USERNAME_DEV_PROD}:${process.env.SESSION_DB_PASSWORD_DEV_PROD}@nextjs-types.atcfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );

  console.log("MongoDB connected!");

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;
  app.listen(4000, () =>
    console.log(
      `Server started on port ${PORT}, GraphQL Server started on localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
};

main().catch((error) => console.log(error));
