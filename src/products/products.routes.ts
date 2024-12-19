import  { Router } from 'express';
import productsService from './products.service';
import productsValidation from './products.validation';
import multer, { Multer } from 'multer';

// const upload:Multer = multer({dest:"upload/image/products"})







const productsRouter:Router = Router();
productsRouter.get('/',productsService.getAll)

productsRouter.post('/',productsService.uploadImages,productsService.saveImage,
     productsValidation.createOne,productsService.createOne)

productsRouter.get('/:id',productsValidation.getOne,productsService.getOne)
productsRouter.put('/:id',productsService.uploadImages, productsService.saveImage ,productsValidation.updateOne,productsService.updateOne)
productsRouter.delete('/:id',productsValidation.deleteOne,productsService.deleteOne)

export default productsRouter;
