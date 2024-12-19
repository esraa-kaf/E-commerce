import { Categories } from './categories.interface';
import categoriesSchema from './categories.schema';
import refactorService from '../../refactor.service';
class CategoriesService{

    createOne=refactorService.createOne<Categories>(categoriesSchema);
    getAll= refactorService.getAll<Categories>(categoriesSchema);
    getOne= refactorService.getOne<Categories>(categoriesSchema);
    updateOne=refactorService.updateOne<Categories>(categoriesSchema);
    deleteOne=refactorService.deleteOne<Categories>(categoriesSchema);


}
// اسم الكلااس لازم يبقى حرف كابيتال
const categoriesService =new CategoriesService()
export  default categoriesService;