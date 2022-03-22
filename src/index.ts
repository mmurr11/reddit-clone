import { MikroORM } from "@mikro-orm/core"
import 'reflect-metadata'
import { __prod__, COOKIE_NAME } from './constants';
import microConfig from "./mikro-orm.config";
import express from 'express'
import { ApolloServer } from'apollo-server-express'
import http from 'http';
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { createClient } = require('redis')
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from 'cors'

const main = async () => {

    const orm = await MikroORM.init(microConfig)
    await orm.getMigrator().up()

    const app = express()
    const httpServer = http.createServer(app);
    
    const redisClient = createClient({ legacyMode: true })
    await redisClient.connect().catch(console.error);
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    )

    app.use(
        session({
            name: COOKIE_NAME,    
            store: new RedisStore({
                 client: redisClient,
                 disableTouch: true 
                }),
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 yrs
                    httpOnly: true,
                    sameSite: "lax",
                    secure: __prod__,
                    domain:'.localhost',
                    path: "/",
                },
            saveUninitialized: false,
            secret: 'keyboard cat',
            resave: false,
        }),
    )


        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [HelloResolver, PostResolver, UserResolver],
                validate: false,
            }),
            context: ({ req, res }) => ({ em: orm.em, req, res }),
            plugins: [
                ApolloServerPluginLandingPageGraphQLPlayground(),
            ],
        })
        await apolloServer.start();
        apolloServer.applyMiddleware({ 
            app,
            cors: false
        });
        await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    } 



main()