import express from 'express';
import categoriesRouter from './categories/categories.routes';
import subcategoriesRouter from './subcategories/subcategories.routes';
import globalErrors from './middlewares/error.middleware';
import ApiErrors from '../utils/api.Errors';
import productsRouter from './products/products.routes';
import usersRouter from './users/users.routes';
import authRouter from './auth/auth.routes';
import profileRouter from './profile/profile.routes';
import googleRouter from './google/google.routes';
import wishlistRouter from './wishlist/wishlist.routes';
import addressRouter from './address/address.routes';

declare module "express" {
  interface Request {
      filterData?: any;
      files?: any;
      user?: any;
  }
}
const mountRoutes=(app: express.Application)=>{
    app.use('/api/v1/categories',categoriesRouter)
    app.use('/api/v1/subcategories',subcategoriesRouter)
    app.use('/api/v1/products',productsRouter)
    app.use('/api/v1/users',usersRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/profile',profileRouter)
    app.use('/auth/google',googleRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/address',addressRouter)
    app.use('*',( req: express.Request, res: express.Response, next: express.NextFunction)=>{
     
      next(new ApiErrors(`route ${req.originalUrl} not found` , 400));
    })
    app.use(globalErrors)
}
export default mountRoutes;