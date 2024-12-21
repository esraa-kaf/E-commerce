import  { Router } from 'express';
import categoriesService from './orders.service';
import subcategoriesRouter from '../subcategories/subcategories.routes';
import categoriesValidation from './orders.validation';
import authService from '../auth/auth.service';
import ordersService from './orders.service';
const ordersRouter:Router = Router();

ordersRouter.use(authService.protectedRoutes, authService.checkActive);

ordersRouter.get('/', ordersService.filterOrders,ordersService.getAll)
ordersRouter.post('/', authService.allowedTo('user'),ordersService.createCashOrder)
ordersRouter.put('/:id/deliver', authService.allowedTo('admin', 'employee'), ordersService.deliverOrder);
ordersRouter.put('/:id/pay', authService.allowedTo('admin', 'employee'), ordersService.payOrder);





export default ordersRouter;