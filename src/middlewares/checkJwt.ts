import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  /** Get the jwt token from the head */
  const token = <string>req.headers.auth
  let jwtPayload

  /** Validate the token and get data */
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    /** 401 (unauthorized) **/
    return res.formatter.unauthorized(token)
  }

  /** The token is valid for 1 hour **/
  const { userId, username } = jwtPayload
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: '1h'
  })
  res.setHeader('token', newToken)

  /** Call the next middleware or controller **/
  next()
}
