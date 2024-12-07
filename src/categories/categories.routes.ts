import  { Router } from 'express';
import categoriesService from './categories.service';
import subcategoriesRouter from '../subcategories/subcategories.routes';
import categoriesValidation from './categories.validation';
const categoriesRouter:Router = Router();

categoriesRouter.use('/api/v1/:categoryId/subcategories', subcategoriesRouter)

categoriesRouter.post('/',categoriesValidation.createOne, categoriesService.createOne)
categoriesRouter.get('/', categoriesService.getAll)
categoriesRouter.get('/:id',categoriesValidation.getOne, categoriesService.getOne)
categoriesRouter.put('/:id',categoriesValidation.updateOne ,categoriesService.updateOne)
categoriesRouter.delete('/:id',categoriesValidation.deleteOne , categoriesService.deleteOne)







export default categoriesRouter;