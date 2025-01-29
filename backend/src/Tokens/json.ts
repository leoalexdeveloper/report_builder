import json, {JwtPayload} from 'jsonwebtoken'

export const createToken = (data: JwtPayload): string => {
  const tokenExpirationTime = Math.floor(Date.now() / 1000) + (60 * 60)
  return json.sign({
    exp: tokenExpirationTime,
    ...data
  }, String(process.env.JSON_SECRET))
}

export const checkToken = (token: string): JwtPayload | string => {
  return json.verify(token, String(process.env.JSON_SECRET))
}
