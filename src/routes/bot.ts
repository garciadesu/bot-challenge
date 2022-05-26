import { Router } from 'express'
import BotController from '../controllers/BotController'
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

/** Get All */
router.get('/', [checkJwt, checkRole(['ADMIN'])], BotController.listAll)

/** Get One */
router.get(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  BotController.getOneById
)

/** Create */
router.post('/', [checkJwt, checkRole(['ADMIN'])], BotController.create)

/** Edit */
router.patch(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  BotController.edit
)

/** Delete */
router.delete(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  BotController.delete
)

export default router
