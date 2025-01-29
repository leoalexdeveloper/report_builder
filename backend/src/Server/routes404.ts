import {type route as RouteType} from './types'
export const Routes404: RouteType[] = [
  {
    method: 'get',
    path: '/',
    middlewares:[],
    action:[async(req,res) => res.status(404).json({errors:{msg:'Page not found'}})]
  },
  {
    method: 'post',
    path: '/',
    middlewares:[],
    action:[async(req,res) => res.status(404).json({errors:{msg:'Page not found'}})]
  },
  {
    method: 'put',
    path: '/',
    middlewares:[],
    action:[async(req,res) => res.status(404).json({errors:{msg:'Page not found'}})]
  },
  {
    method: 'patch',
    path: '/',
    middlewares:[],
    action:[async(req,res) => res.status(404).json({errors:{msg:'Page not found'}})]
  },
  {
    method: 'delete',
    path: '/',
    middlewares:[],
    action:[async(req,res) => res.status(404).json({errors:{msg:'Page not found'}})]
  }
]
