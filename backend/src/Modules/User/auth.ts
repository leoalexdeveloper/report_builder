import{BaseEntity} from 'typeorm'
import {findOneBy, find} from '../../Database/Repository'
import {checkEncrypt} from '../../Helpers/encrypt'
import {User as UserEntity} from '../../Database/Entities/User'
export const userAuthenticateByLogin = async (email: string, password: string): Promise<BaseEntity|Error> => {
  try{
    const result = await findOneBy(UserEntity, {email})
    if(result instanceof Error || !await checkEncrypt(password, (result as UserEntity).password)) throw new Error((result as Error).message ?? 'Invalid user and password')
    if((result as UserEntity).active !== true) throw new Error('Activate your user before login!')
    return result
  }catch(error){
    return (error as Error)
  }
}

export const userAuthenticateByToken = async (email:string, password: string): Promise<BaseEntity|Error> => {
  try{
    const result = await findOneBy(UserEntity, {email})
    if(result instanceof Error || password !== (result as UserEntity).password) throw new Error((result as Error).message ?? 'Invalid user and password')
    if((result as UserEntity).active !== true) throw new Error('Activate your user before login!')
    return result
  }catch(error){
    return (error as Error)
  }
}
