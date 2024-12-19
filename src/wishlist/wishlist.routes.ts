import  { Router } from 'express';
import wishlistService from './wishlist.service';
import authService from '../auth/auth.service';
const wishlistRouter:Router = Router();
wishlistRouter.use(authService.protectedRoutes, authService.checkActive);

wishlistRouter.post('/',wishlistService.addToWishlist)

wishlistRouter.get('/', wishlistService.getWishlist)

wishlistRouter.delete('/:productId', wishlistService.deleteFromWishlist)








export default wishlistRouter;