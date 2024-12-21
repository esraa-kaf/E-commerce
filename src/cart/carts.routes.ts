import  { Router } from 'express';
import cartsService from './carts.service';
import cartsValidation from './carts.validation';
import authService from '../auth/auth.service';

const cartsRouter:Router = Router();

cartsRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'))

cartsRouter.post('/', cartsValidation.addToCart,cartsService.addToCart)
cartsRouter.get('/', cartsService.getCart)
cartsRouter.delete('/', cartsService.clearCart)
cartsRouter.put('/:itemId',cartsValidation.updateQuantity,cartsService.updateQuantity)
cartsRouter.delete('/:itemId',cartsValidation.removeFromCart ,cartsService.removeFromCart)
cartsRouter.put('/apply-coupon', cartsService.applyCoupon);




export default cartsRouter;