import { Coupons } from './coupons.interface';
import couponsSchema from './coupons.schema';
import refactorService from '../../refactor.service';
class CouponsService{

    createOne=refactorService.createOne<Coupons>(couponsSchema);
    getAll= refactorService.getAll<Coupons>(couponsSchema);
    getOne= refactorService.getOne<Coupons>(couponsSchema);
    updateOne=refactorService.updateOne<Coupons>(couponsSchema);
    deleteOne=refactorService.deleteOne<Coupons>(couponsSchema);


}
// اسم الكلااس لازم يبقى حرف كابيتال
const couponsService =new CouponsService()
export  default couponsService;