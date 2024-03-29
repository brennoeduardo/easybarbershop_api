import { Router } from 'express';
import userRouter from './user/user';
import barberRouter from './barber/barber';
import serviceRouter from './barber/service';

const router = Router();

router.use('/user', userRouter);
router.use('/barber', barberRouter);
router.use('/service', serviceRouter);
router.use('/serviceBarber', serviceRouter);

export default router;