import {Routes404} from './routes404'
import {route as RouteType} from './types'
import {routes as UserRoutes} from '../Modules/User/routes'
export const routes: RouteType[] = [
  /* Insert others routes here! */
  ...UserRoutes,


  /* 404 routes */
  ...Routes404
]
