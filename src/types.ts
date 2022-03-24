import { Request, Response } from "express"
import { Session, SessionData } from 'express-session';
import { Redis } from "ioredis";

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
}