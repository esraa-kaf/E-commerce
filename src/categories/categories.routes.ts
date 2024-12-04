import  { Router } from 'express';
import categoriesService from './categories.service';
import subcategoriesRouter from '../subcategories/subcategories.routes';
const categoriesRouter:Router = Router();

categoriesRouter.use('/api/v1/:categoryId/subcategories', subcategoriesRouter)

categoriesRouter.post('/', categoriesService.createOne)
categoriesRouter.get('/', categoriesService.getAll)
categoriesRouter.get('/:id',categoriesService.getOne)
categoriesRouter.put('/:id',categoriesService.updateOne)
categoriesRouter.delete('/:id',categoriesService.deleteOne)







export default categoriesRouter;