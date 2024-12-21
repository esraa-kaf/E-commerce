import  { Router } from 'express';
import subcategoriesService from './subcategories.service';
import subcategoriesValidation from './subcategories.validation';
import authService from '../auth/auth.service';
const subcategoriesRouter:Router = Router({mergeParams:true});
subcategoriesRouter.get('/',subcategoriesService.getAll)
subcategoriesRouter.post('/',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.createOne,subcategoriesService.createOne)
subcategoriesRouter.get('/:id',subcategoriesValidation.getOne,subcategoriesService.getOne)
subcategoriesRouter.put('/:id',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.updateOne,subcategoriesService.updateOne)
subcategoriesRouter.delete('/:id',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.deleteOne,subcategoriesService.deleteOne)




export default subcategoriesRouter;
