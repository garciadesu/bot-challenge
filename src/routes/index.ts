// import { Router, Request, Response } from 'express'
import { Router } from 'express'
import auth from './auth'
import user from './user'
import bot from './bot'

const routes = Router()

routes.use('/auth', auth)
routes.use('/user', user)
routes.use('/bot', bot)

export default routes
