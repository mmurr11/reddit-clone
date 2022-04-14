import 'reflect-metadata'
import "dotenv-safe/config";
import { __prod__, COOKIE_NAME } from './constants';
import express from 'express'
import { ApolloServer } from'apollo-server-express'
import http from 'http';
import "dotenv-safe/config";
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis'
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from 'cors'
import {createConnection} from 'typeorm'
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from 'path'
import { Updoot } from './entities/Updoot';
import { createUserLoader } from './utils/createUserLoader';
import { createUpdootLoader } from './utils/createUpdootLoader';

const main = async () => {

    const conn = await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [Post, User, Updoot]
    })
    await conn.runMigrations()

    const app = express()
    const httpServer = http.createServer(app);
    
    const redis = new Redis(process.env.REDIS_URL);
    await redis.connect().catch(console.error);

    app.set('trust proxy', 1)

    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true
        })
    )

    app.use(
        session({
            name: COOKIE_NAME,    
            store: new RedisStore({
                 client: redis,
                 disableTouch: true 
                }),
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 yrs
                    httpOnly: true,
                    sameSite: "lax",
                    secure: __prod__,
                    domain: __prod__ ? 'fake-reddit-1.herokuapp.com' : undefined,
                    path: "/",
                },
            saveUninitialized: false,
            secret: process.env.SECRET_KEY,
            resave: false,
        }),
    )


        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [HelloResolver, PostResolver, UserResolver],
                validate: false,
            }),
            context: ({ req, res }) => ({ 
                req, 
                res, 
                redis,
                userLoader: createUserLoader(),
                updootLoader: createUpdootLoader()           
            }),
            plugins: [
                ApolloServerPluginLandingPageGraphQLPlayground(),
            ],
        })
        await apolloServer.start();
        apolloServer.applyMiddleware({ 
            app,
            cors: false
        });
        await new Promise<void>(resolve => httpServer.listen({ port: parseInt(process.env.PORT) }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    } 



main()