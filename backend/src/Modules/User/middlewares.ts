import {middleware as MiddlewareType} from '../../Server/types'
import {userAuthenticateByToken} from './auth'
import {checkToken} from '../../Tokens/json'

export const UserAuthByToken: MiddlewareType = async (req, res, next) => {
  try{
    const token = req.headers.authentication
    const tokenResult = checkToken(String(token))
    if(tokenResult instanceof Error) throw new Error(tokenResult.message)
    const userResult = await userAuthenticateByToken((tokenResult as {data:{email:string}}).data.email, (tokenResult as {data:{password:string}}).data.password)
    if(userResult instanceof Error) throw new Error(userResult.message)
    return next()
  }catch(error){
    res.status(403).json({errors:{msg:(error as Error).message}})
  }
}
