import { Subcategories } from './subcategories.interface';
import {Request , Response ,NextFunction} from 'express'
import subcategoriesSchema from './subcategories.schema';
import refactorService from '../../refactor.service';

class SubcategoriesService{
   setCategoryId(req: Request, res: Response,next:NextFunction){
    if(req.params.categoryId&&!req.body.category) req.body.category = req.params.categoryId;
     next();
   }
    
   filterSubcategories(req: Request, res: Response , next:NextFunction){
    const filterData:any ={};
    if(req.params.categoryId) filterData.category = req.params.categoryId;
    next();
   }

   createOne=refactorService.createOne<Subcategories>(subcategoriesSchema);
   getAll= refactorService.getAll<Subcategories>(subcategoriesSchema);
   getOne= refactorService.getOne<Subcategories>(subcategoriesSchema);
   updateOne=refactorService.updateOne<Subcategories>(subcategoriesSchema);
   deleteOne=refactorService.deleteOne<Subcategories>(subcategoriesSchema);








}
const subcategoriesService = new SubcategoriesService();
export default subcategoriesService;