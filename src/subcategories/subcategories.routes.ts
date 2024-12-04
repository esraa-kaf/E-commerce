import  { Router } from 'express';
import subcategoriesService from './subcategories.service';
const subcategoriesRouter:Router = Router({mergeParams:true});
subcategoriesRouter.get('/',subcategoriesService.getAll)
subcategoriesRouter.post('/',subcategoriesService.createOne)
subcategoriesRouter.get('/:id',subcategoriesService.getOne)
subcategoriesRouter.put('/:id',subcategoriesService.updateOne)
subcategoriesRouter.delete('/:id',subcategoriesService.deleteOne)




export default subcategoriesRouter;
