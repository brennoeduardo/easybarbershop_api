import { Router } from 'express'
import { BarberController } from '../../controllers/barber/index'

const router = Router()

router.route('/')
    .get(BarberController.find)
    .post(BarberController.create)

router.route('/:id')
    .get(BarberController.findOne)
    .put(BarberController.update)
    .delete(BarberController.delete)

export default router