import  { Router } from 'express';
import productsService from './products.service';
import productsValidation from './products.validation';

const productsRouter:Router = Router();
productsRouter.get('/',productsService.getAll)
productsRouter.post('/',productsValidation.createOne,productsService.createOne)
productsRouter.get('/:id',productsValidation.getOne,productsService.getOne)
productsRouter.put('/:id',productsValidation.updateOne,productsService.updateOne)
productsRouter.delete('/:id',productsValidation.deleteOne,productsService.deleteOne)

export default productsRouter;
