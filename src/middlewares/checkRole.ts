import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    /** Get User ID from Token */
    const id = res.locals.jwtPayload.userId

    const userRepository = AppDataSource.getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneByOrFail({ id })
    } catch (id) {
      return res.formatter.unauthorized(id)
    }

    /** Check if array of authorized roles includes the user's role */
    if (roles.indexOf(user.role) > -1) next()
    else return res.formatter.unauthorized(id)
  }
}
