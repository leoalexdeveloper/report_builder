import {Express, Request, Response, NextFunction, RequestHandler, Handler} from 'express'
import {ValidationChain} from 'express-validator'

export {Express}
export type htmlSUpportedVerbs = 'get'|'post'|'put'|'patch'|'delete'
export type action = (req: Request, res: Response) => Promise<Response | void>
export type middleware = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>
export type route = {
  method: htmlSUpportedVerbs,
  path: string,
  middlewares: RequestHandler[] | ValidationChain[] | middleware[],
  action: action[]
}
