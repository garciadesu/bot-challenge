import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { validate } from 'class-validator'
import { User } from '../entity/User'

class UserController {
  static listAll = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({
      select: ['id', 'username', 'role'] /** Limit data */
    })
    return res.formatter.ok(users)
  }

  static getOneById = async (req: Request, res: Response) => {
    const id = req.params.id
    const userRepository = AppDataSource.getRepository(User)
    try {
      const user = await userRepository.findOneByOrFail({ id })
      return res.formatter.ok(user)
    } catch (error) {
      return res.formatter.notFound(error, 'User not found')
    }
  }

  static newUser = async (req: Request, res: Response) => {
    const { username, password, role } = req.body
    const user = new User()
    user.username = username
    user.password = password
    user.role = role

    const errors = await validate(user)
    if (errors.length > 0) {
      return res.formatter.badRequest(errors)
    }

    /** Hash password */
    user.hashPassword()

    const userRepository = AppDataSource.getRepository(User)
    try {
      await userRepository.save(user)
    } catch (e) {
      return res.formatter.conflict('username already in use')
    }
    return res.formatter.created(user, 'User created')
  }

  static editUser = async (req: Request, res: Response) => {
    const id = req.params.id
    const { username, role } = req.body

    const userRepository = AppDataSource.getRepository(User)
    let user
    try {
      user = await userRepository.findOneByOrFail({ id })
    } catch (error) {
      return res.formatter.notFound(error, 'User not found')
    }

    user.username = username
    user.role = role
    const errors = await validate(user)
    if (errors.length > 0) {
      return res.formatter.badRequest(errors)
    }

    try {
      await userRepository.save(user)
    } catch (e) {
      return res.formatter.conflict('username already in use')
    }

    return res.formatter.accepted(user, 'User updated')
  }

  static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id
    const userRepository = AppDataSource.getRepository(User)
    try {
      await userRepository.findOneByOrFail({ id })
    } catch (error) {
      return res.formatter.notFound(error, 'User not found')
    }
    userRepository.delete(id)
    return res.formatter.noContent(id, 'User deleted')
  }
};

export default UserController
