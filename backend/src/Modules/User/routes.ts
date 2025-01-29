import {route as RouteType} from '../../Server/types'
import {Register, Update, Delete, Show, Login, ActivatingUser, reactivatingAccount, requesPasswordReset, resetPassword, resentActivationEmail} from './actions'
import {del as delValidation, register as registerValidation, update as updateValidation, show as showValidation, login as loginValidation} from './inputValidation'
import {InputValidation} from '../../Middlewares/InputValidaiton'
import {UserAuthByToken} from './middlewares'
import {multerInstance} from '../../Server/multer'
export const routes: RouteType[] = [
  {
    method:'post',
    path: '/user/login',
    middlewares: [...loginValidation, InputValidation],
    action:[Login]
  },
  {
    method:'post',
    path: '/user/register',
    middlewares: [
      multerInstance.none(),
      ...registerValidation,
      InputValidation
    ],
    action:[Register]
  },
  {
    method:'put',
    path: '/user/update',
    middlewares: [
      ...updateValidation,
      InputValidation,
      UserAuthByToken
    ],
    action:[Update]
  },
  {
    method:'delete',
    path: '/user/delete',
    middlewares: [
      ...delValidation,
      InputValidation,
      UserAuthByToken
    ],
    action:[Delete]
  },
  {
    method:'post',
    path: '/user',
    middlewares: [
      ...showValidation,
      InputValidation,
      UserAuthByToken
    ],
    action:[Show]
  },
  {
    method:'get',
    path: '/user/activate/:activationCode',
    middlewares: [],
    action:[ActivatingUser]
  },
  {
    method:'post',
    path: '/user/reactivate',
    middlewares: [],
    action:[reactivatingAccount]
  },
  {
    method:'post',
    path: '/user/request-password-reset',
    middlewares: [],
    action:[requesPasswordReset]
  },
  {
    method:'post',
    path: '/user/reset-password',
    middlewares: [],
    action:[resetPassword]
  },
  {
    method:'post',
    path: '/user/resent-activation-code',
    middlewares: [],
    action:[resentActivationEmail]
  }
]
