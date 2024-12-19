import  { Router } from 'express';
import subcategoriesService from './subcategories.service';
import subcategoriesValidation from './subcategories.validation';
const subcategoriesRouter:Router = Router({mergeParams:true});
subcategoriesRouter.get('/',subcategoriesService.getAll)
subcategoriesRouter.post('/',subcategoriesValidation.createOne,subcategoriesService.createOne)
subcategoriesRouter.get('/:id',subcategoriesValidation.getOne,subcategoriesService.getOne)
subcategoriesRouter.put('/:id',subcategoriesValidation.updateOne,subcategoriesService.updateOne)
subcategoriesRouter.delete('/:id',subcategoriesValidation.deleteOne,subcategoriesService.deleteOne)




export default subcategoriesRouter;
