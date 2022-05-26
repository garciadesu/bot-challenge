import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import config from '../config/config'

class AuthController {
  static login = async (req: Request, res: Response) => {
    /** Validate username & password */
    const { username, password } = req.body
    if (!(username && password)) {
      return res.formatter.badRequest(req.body)
    }

    const userRepository = AppDataSource.getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { username } })
      console.log(user)
    } catch (error) {
      return res.formatter.unauthorized(req.body)
    }

    /** Check if password is encrypted */
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      return res.formatter.unauthorized(req.body)
    }

    /** token valid for 1 hour */
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    )

    return res.formatter.ok(token)
  }
}
export default AuthController
