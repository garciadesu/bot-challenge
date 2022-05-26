import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { validate } from 'class-validator'
import { Bot } from '../entity/Bot'

class BotController {
  static listAll = async (req: Request, res: Response) => {
    const botRepository = AppDataSource.getRepository(Bot)
    const bots = await botRepository.find()
    return res.formatter.ok(bots)
  }

  static getOneById = async (req: Request, res: Response) => {
    const id = req.params.id
    const botRepository = AppDataSource.getRepository(Bot)

    try {
      const bot = await botRepository.findOneByOrFail({ id })
      return res.formatter.ok(bot)
    } catch (error) {
      return res.formatter.notFound(error, 'Bot not found')
    }
  }

  static create = async (req: Request, res: Response) => {
    const { botName, botPurpose } = req.body
    const bot = new Bot()
    bot.botName = botName
    bot.botPurpose = botPurpose

    const errors = await validate(bot)
    console.log(errors)
    if (errors.length > 0) {
      return res.formatter.badRequest(errors)
    }

    const botRepository = AppDataSource.getRepository(Bot)
    try {
      await botRepository.save(bot)
    } catch (e) {
      return res.formatter.badRequest(e)
    }

    return res.formatter.created(bot, 'Bot created')
  }

  static edit = async (req: Request, res: Response) => {
    const id = req.params.id
    const { botName, botPurpose } = req.body

    const botRepository = AppDataSource.getRepository(Bot)
    let bot
    try {
      bot = await botRepository.findOneByOrFail({ id })
      console.log(bot)
    } catch (error) {
      /** Not Found */
      return res.formatter.notFound(error, 'Bot not found')
    }

    bot.botName = botName
    bot.botPurpose = botPurpose
    const errors = await validate(bot)
    if (errors.length > 0) {
      return res.formatter.badRequest(errors)
    }
    await botRepository.save(bot)
    return res.formatter.accepted(bot, 'Bot updated')
  }

  static delete = async (req: Request, res: Response) => {
    const id = req.params.id
    const botRepository = AppDataSource.getRepository(Bot)

    try {
      await botRepository.findOneByOrFail({ id })
    } catch (error) {
      return res.formatter.notFound(error)
    }
    botRepository.delete(id)
    return res.formatter.noContent(id, 'Bot deleted')
  }
};

export default BotController
