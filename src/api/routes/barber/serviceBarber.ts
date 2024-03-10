import { Router } from 'express'
import { ServiceBarberController } from '../../controllers/barber/index'

const router = Router()

router.route('/')
    .get(ServiceBarberController.find)
    .post(ServiceBarberController.create)

export default router