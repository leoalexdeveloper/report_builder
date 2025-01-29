import {body, header} from 'express-validator'

export const login = [
  body('password')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isLength({min: 4, max: 255}).withMessage('must have between 4 and 255 characteres')
  .isAscii().withMessage('must have valid characteres'),
  body('email')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isEmail().withMessage('must be a valid e-mail')
  .isAscii().withMessage('must have valid characteres'),
]

export const register = [
  body('name')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isLength({min: 4, max: 255}).withMessage('must have between 4 and 255 characteres')
  .isAscii().withMessage('must have valid characteres'),
  body('password')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isLength({min: 4, max: 255}).withMessage('must have between 4 and 255 characteres')
  .isAscii().withMessage('must have valid characteres'),
  body('repeat_password')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .custom((value, {req}) => {
    return req.body.password === value
  }).withMessage('must match with password'),
  body('email')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isEmail().withMessage('must be a valid e-mail')
  .isAscii().withMessage('must have valid characteres'),
]

export const update = [
  body('uuid')
  .isUUID().withMessage('must be a valid UUID'),
  body('name')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isLength({min: 4, max: 255}).withMessage('must have between 4 and 255 characteres')
  .isAscii().withMessage('must have valid characteres'),
  body('email')
  .exists().withMessage('must exists')
  .notEmpty().withMessage('must not be empty')
  .isEmail().withMessage('must be a valid e-mail')
  .isAscii().withMessage('must have valid characteres'),
]

export const del = [
  body('uuid')
  .isUUID().withMessage('must be a valid UUID')
]

export const show = [
  body('uuid')
  .isUUID().withMessage('must be a valid UUID')
]
