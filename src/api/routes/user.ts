import { Router } from 'express'
import { UserController } from '../controllers/user/index'

const router = Router()

router.route('/')
    .get(UserController.find)
    .post(UserController.create)

router.route('/:id')
    .get(UserController.findOne)
    .put(UserController.update)
    .delete(UserController.delete)

export default router