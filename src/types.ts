import { Request, Response } from "express"
import { Session, SessionData } from 'express-session';
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
import { createUpdootLoader } from "./utils/createUpdootLoader";

declare module 'express-session' {
  export interface Session {
    userId: number;
  }
}


interface ExtendedRequest extends Request {
    session: Session & Partial<SessionData>&
    Express.Request&{userId: number}
}

export type MyContext = {
    req: ExtendedRequest & {session: {userId: number}}
    redis: Redis
    res: Response
    userLoader: ReturnType<typeof createUserLoader>;
    updootLoader: ReturnType<typeof createUpdootLoader>;
}