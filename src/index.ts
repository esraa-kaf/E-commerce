import express from 'express';
import categoriesRouter from './categories/categories.routes';
import subcategoriesRouter from './subcategories/subcategories.routes';
import globalErrors from './middlewares/error.middleware';
import ApiErrors from '../utils/api.Errors';
import productsRouter from './products/products.routes';


const mountRoutes=(app: express.Application)=>{
    app.use('/api/v1/categories',categoriesRouter)
    app.use('/api/v1/subcategories',subcategoriesRouter)
    app.use('/api/v1/products',productsRouter)
    app.use('*',( req: express.Request, res: express.Response, next: express.NextFunction)=>{
     
      next(new ApiErrors(`route ${req.originalUrl} not found` , 400));
    })
    app.use(globalErrors)
}
export default mountRoutes;