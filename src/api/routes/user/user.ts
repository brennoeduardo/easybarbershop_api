import { Router } from 'express'
import { UserController } from '../../controllers/user/index'
import AuthUser from '../../middlewares/auth/index'

const router = Router()

router.route('/')
    .get(UserController.find)
    .post(UserController.create)

router.route('/:id')
    .get(UserController.findOne)
    .put(UserController.update)
    .delete(UserController.delete)

router.route('/login')
    .post(AuthUser, UserController.login)

export default router