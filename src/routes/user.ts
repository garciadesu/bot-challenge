import { Router } from 'express'
import UserController from '../controllers/UserController'
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

/** Get all */
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll)

/** Get one */
router.get(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.getOneById
)

/** Create */
router.post('/', [checkJwt, checkRole(['ADMIN'])], UserController.newUser)

/** Edit */
router.patch(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.editUser
)

/** Delete */
router.delete(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
)

export default router
