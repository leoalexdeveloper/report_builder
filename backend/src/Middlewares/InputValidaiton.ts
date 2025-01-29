import {middleware as MiddlewareType} from '../Server/types'
import {validationResult} from 'express-validator'
export const InputValidation: MiddlewareType = async (req, res, next) => {
  const result = validationResult(req)
  console.log(req.body, result)
  if(result.isEmpty()) return next()
  return res.status(200).json(result)
}
