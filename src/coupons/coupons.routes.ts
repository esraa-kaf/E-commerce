import  { Router } from 'express';
import couponsService from './coupons.service';
import couponsValidation from './coupons.validation';
import authService from '../auth/auth.service';
const couponsRouter:Router = Router();


couponsRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'));
couponsRouter.post('/', couponsValidation.createOne, couponsService.createOne)
couponsRouter.get('/', couponsService.getAll)
couponsRouter.get('/:id',couponsValidation.getOne, couponsService.getOne)
couponsRouter.put('/:id',couponsValidation.updateOne ,couponsService.updateOne)
couponsRouter.delete('/:id',couponsValidation.deleteOne , couponsService.deleteOne)




export default couponsRouter;