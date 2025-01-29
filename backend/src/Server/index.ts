import express from 'express'
import {Express, route as RouteType} from './types'
import {routes} from './routes'
import {InitializingDatabase} from '../Database/DataSource'

const app: Express = express()

export class Server<T> {
  constructor(private app: T){}

  setConfigs(): Server<T>{
    (this.app as Express).use(express.urlencoded({extended:true}));
    (this.app as Express).use(express.json())
    return this
  }

  loadingRoutes(): Server<T>{
    routes.forEach(route => {
      (this.app as Express)[route.method]([route.path], [...route.middlewares], [...route.action])
    })
    return this
  }

  async startServer(): Promise<void>{
    await InitializingDatabase() && app.listen(4000, () => console.log(`Server running at port ${process.env.APP_URL}`))
  }
}

new Server<Express>(app).setConfigs().loadingRoutes().startServer()
