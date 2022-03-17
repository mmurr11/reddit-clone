import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express"
import { Session, SessionData } from 'express-session';

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
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    req: ExtendedRequest & {session: {userId?: number}}
    res: Response
}