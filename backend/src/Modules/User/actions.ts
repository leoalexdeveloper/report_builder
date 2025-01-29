import {action as ActionType} from '../../Server/types'
import {create, update, findOneBy, find} from '../../Database/Repository'
import {User as UserEntity} from '../../Database/Entities/User'
import {v4 as uuidv4} from 'uuid'
import {encrypt} from '../../Helpers/encrypt'
import {removeObjectEntries} from '../../Helpers/removeObjectEntries'
import {Email} from '../../Email/send'
import {userAuthenticateByLogin} from './auth'
import {createToken} from '../../Tokens/json'
import {Errors} from '../../Errors'
const sensibleUserKeys = ['id', 'password', 'changePasswordCode', 'activationCode']

export const Login: ActionType = async (req, res) => {
  try{
    const body = req.body
    const data = {
      email: body.email as string,
      password: body.password as string
    }

    const authResult = await userAuthenticateByLogin(data.email, data.password)
    if(authResult instanceof Error) throw new Error(authResult.message)

    const token = createToken({data: authResult})
    return res.status(200).setHeader('Authentication', String(token)).json(removeObjectEntries((authResult as object), ['id', 'password']))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const Register: ActionType = async (req, res) => {
  try{
    console.log("aqui")
    const body = req.body
    const data = {
      name: body.name as string,
      email: body.email as string,
      password: encrypt(body.password) as string,
      uuid: uuidv4() as string,
      activationCode: encrypt(body.email) as string,
      changePasswordCode: encrypt(body.email) as string
    }

    const result = await create(UserEntity, data)
    if(String(result).includes('Duplicate') && result) throw new Error('Email already registered')

      await new Email(
      body.email,
      "Test APP: Active your account",
      "Active your account clicking on the link",
      `<div>
        <h1>Welcome ${body.name}!</h1>
        <h3>Click on the link below to activate your user!</h3>
        <a href='${process.env.APP_URL}/user/activate/${encodeURIComponent(data.activationCode)}'>Active your account</a>
      </div>`
    ).send()

    return res.status(201).json(removeObjectEntries((result as UserEntity), sensibleUserKeys))
  }catch(error){
    return res.status(200).json(Errors.getError({msg:(error as Error).message, path: 'email'}))
  }
}

export const Update: ActionType = async (req, res) => {
  try{
    const body = req.body
    const uuid = body.uuid
    const data = {
      name: body.name as string,
      email: body.email as string,
    }

    const result = await update(UserEntity, {uuid}, data)
    if(result instanceof Error) throw new Error(result.message)

      return res.status(201).json(removeObjectEntries((result as object), sensibleUserKeys))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const Delete: ActionType = async (req, res) => {
  try{
    const {email} = req.body

    const userResult = await findOneBy(UserEntity, {email})
    if(userResult instanceof Error) throw new Error(userResult.message);

    (userResult as UserEntity).active = false

    const updateResult = await update(UserEntity, {uuid: (userResult as UserEntity).uuid}, userResult)
    if(updateResult instanceof Error) throw new Error(updateResult.message)

      return res.status(201).json(removeObjectEntries((updateResult as object), sensibleUserKeys))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const Show: ActionType = async (req, res) => {
  try{
    const {uuid} = req.body

    const result = await findOneBy(UserEntity, {uuid:uuid})
    if(result instanceof Error) throw new Error(result.message)

      return res.status(201).json(removeObjectEntries((result as object), sensibleUserKeys))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const ActivatingUser: ActionType = async (req, res) => {
  try{
    const activationCode = decodeURIComponent(req.params.activationCode)

    const userResult = await findOneBy(UserEntity, {activationCode:activationCode})
    if(userResult instanceof Error) throw new Error(userResult.message)
    if((userResult as UserEntity).active) throw new Error('User already activated')
    if(userResult) (userResult as UserEntity).active = true

    const updateResult = await update(UserEntity, {uuid:(userResult as UserEntity).uuid}, userResult)
    if(updateResult instanceof Error) throw new Error(updateResult.message)

      return res.status(200).json(removeObjectEntries((updateResult as object), sensibleUserKeys))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const reactivatingAccount: ActionType = async (req, res) => {
  try{
    const {email} = req.body

    const userResult = await findOneBy(UserEntity, {email})
    if(userResult instanceof Error) throw new Error(userResult.message);
    if((userResult as UserEntity).active) throw new Error('User already active');

    (userResult as UserEntity).active = true

    const updateResult = await update(UserEntity, {uuid: (userResult as UserEntity).uuid}, userResult)
    if(updateResult instanceof Error) throw new Error(updateResult.message)

    return res.status(201).json(removeObjectEntries((updateResult as object), sensibleUserKeys))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const requesPasswordReset: ActionType = async (req, res) => {
  try{
    const body = req.body
    const email = body.email
    const changePasswordCode = encrypt(body.email)
    const uuid = body.uuid
    const userResult = await findOneBy(UserEntity, {email})
    if(userResult instanceof Error || (userResult as UserEntity).active === false) throw new Error((userResult as Error).message ?? 'Active your user first!');

    (userResult as UserEntity).changePasswordCode = changePasswordCode

    const updateResult = await update(UserEntity, {uuid: (userResult as UserEntity).uuid}, userResult)
    if(updateResult instanceof Error) throw new Error(updateResult.message)

      await new Email(
      body.email,
      "Test APP: Active your account",
      "Active your account clicking on the link",
      `<div>
        <h1>Welcome back ${body.name}!</h1>
        <h3>Click on the link below reset your password!</h3>
        <a href='${process.env.APP_URL}/user/reset-password/${body.uuid}/${encodeURIComponent(changePasswordCode)}'>Change your password</a>
      </div>`
    ).send()

    return res.status(200).json({warning:{msg: 'Change password requested successfully! Check you email-box!'}})
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const resetPassword: ActionType = async (req, res) => {
  try{
    const changePasswordCode = decodeURIComponent(req.body.changePasswordCode)
    const uuid = req.body.uuid
    const body = req.body

    const userResult = await findOneBy(UserEntity, {changePasswordCode})
    if(userResult instanceof Error || (userResult as UserEntity).uuid !== uuid) throw new Error((userResult as Error).message ?? 'Server Error');

    (userResult as UserEntity).password = encrypt(body.password)

    const updateResult = await update(UserEntity, {uuid:(userResult as UserEntity).uuid}, userResult)
    if(updateResult instanceof Error) throw new Error(updateResult.message)

    return res.status(200).json(removeObjectEntries((updateResult as object), sensibleUserKeys))
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}

export const resentActivationEmail:ActionType = async (req, res) => {
  try{
    const body = req.body
    const email = body.email

    const userResult = await findOneBy(UserEntity, {email})
    if(userResult instanceof Error) throw new Error(userResult.message);
    if((userResult as UserEntity).active === true) throw new Error('User already activated!')

    await new Email(
      body.email,
      "Test APP: Active your account",
      "Active your account clicking on the link",
      `<div>
        <h1>Welcome ${body.name}!</h1>
        <h3>Click on the link below to activate your user!</h3>
        <a href='${process.env.APP_URL}/user/activate/${encodeURIComponent((userResult as UserEntity).activationCode)}'>Active your account</a>
      </div>`
    ).send()

    return res.status(201).json({warning:{msg:'Activation code sent by email. Check your email-box!'}})
  }catch(error){
    return res.status(403).json({errors:{msg:(error as Error).message}})
  }
}
