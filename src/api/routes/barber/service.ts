import { Router } from 'express'
import { ServiceController } from '../../controllers/barber/index'

const router = Router()

router.route('/')
    .get(ServiceController.find)
    .post(ServiceController.create)

router.route('/:id')
    .get(ServiceController.findOne)
    .put(ServiceController.update)
    .delete(ServiceController.delete)

export default router