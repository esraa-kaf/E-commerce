import  { Router } from 'express';
import categoriesService from './categories.service';
import subcategoriesRouter from '../subcategories/subcategories.routes';
import categoriesValidation from './categories.validation';
import authService from '../auth/auth.service';
const categoriesRouter:Router = Router();

categoriesRouter.use('/api/v1/:categoryId/subcategories', subcategoriesRouter)

categoriesRouter.post('/',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'), categoriesValidation.createOne, categoriesService.createOne)
categoriesRouter.get('/', categoriesService.getAll)
categoriesRouter.get('/:id',categoriesValidation.getOne, categoriesService.getOne)
categoriesRouter.put('/:id',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.updateOne ,categoriesService.updateOne)
categoriesRouter.delete('/:id',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.deleteOne , categoriesService.deleteOne)







export default categoriesRouter;