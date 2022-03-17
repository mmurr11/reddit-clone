import { MikroORM } from "@mikro-orm/core"
import 'reflect-metadata'
import { __prod__ } from './constants';
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express'
import { ApolloServer } from'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from 'src/types';
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
import { createClient } from 'redis';


const main = async () => {

    const orm = await MikroORM.init(microConfig)
    await orm.getMigrator().up()

    const app = express()

    const redisClient = createClient();
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();

    app.use(
        session({
            name: 'qid',    
            store: new RedisStore({
                 client: redisClient,
                 disableTouch: true 
                }),
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 yrs
                    httpOnly: false,
                    sameSite: "lax",
                    secure: __prod__,
                    domain:'.localhost',
                    path: "/"
                },
            saveUninitialized: true,
            secret: 'dfdzfvb',
            resave: false
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }: MyContext): MyContext => ({ em: orm.em, req, res })
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}


main()