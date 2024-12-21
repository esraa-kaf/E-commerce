import  { Router } from 'express';
import productsService from './products.service';
import productsValidation from './products.validation';
import multer, { Multer } from 'multer';
import authService from '../auth/auth.service';

// const upload:Multer = multer({dest:"upload/image/products"})







const productsRouter:Router = Router();
productsRouter.get('/',productsService.getAll)

productsRouter.post('/',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),productsService.uploadImages,productsService.saveImage,
     productsValidation.createOne,productsService.createOne)

productsRouter.get('/:id',productsValidation.getOne,productsService.getOne)
productsRouter.put('/:id',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),productsService.uploadImages, productsService.saveImage ,productsValidation.updateOne,productsService.updateOne)
productsRouter.delete('/:id',authService.protectedRoutes, authService.checkActive,authService.allowedTo('admin','employee'),productsValidation.deleteOne,productsService.deleteOne)

export default productsRouter;
