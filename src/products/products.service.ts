import { products } from './products.interface';
import productsSchema from './products.schema';
import refactorService from '../../refactor.service';
import {NextFunction, Request, Response} from "express";
import sharp from "sharp";
import { uploadMultiFiles, uploadSingleFile } from '../middlewares/uploadFile.middleware';

class ProductsService{

    createOne=refactorService.createOne<products>(productsSchema);
    getAll= refactorService.getAll<products>(productsSchema);
    getOne= refactorService.getOne<products>(productsSchema);
    updateOne=refactorService.updateOne<products>(productsSchema);
    deleteOne=refactorService.deleteOne<products>(productsSchema);

    // uploadImages = uploadSingleFile(['image'], 'cover')

    uploadImages = uploadMultiFiles(['image'], [{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 5}])
////////////////////////////////////////////////////////////////////////////////////////////
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.files) {
            if (req.files.cover) {
                const fileName: string = `product-${Date.now()}-cover.webp`;
                await sharp(req.files.cover[0].buffer)
                    .resize(1200, 1200)
                    .webp({quality: 95})
                    .toFile(`upload/image/products/${fileName}`);
                req.body.cover = fileName;
            }
            if (req.files.images) {
                req.body.images = [];
                await Promise.all(req.files.images.map(async (image: any, index: number) => {
                    const fileName: string = `product-${Date.now()}-image-N${index + 1}.webp`;
                    await sharp(image.buffer)
                        .resize(1200, 1200)
                        .webp({quality: 95})
                        .toFile(`upload/image/products/${fileName}`);
                    req.body.images.push(fileName);
                }));
            }
        }
        next();
    }


    // saveImage = async (req: Request, res: Response, next: NextFunction) => {
    //         if (req.file) {
    //             const fileName: string = `product-${Date.now()}-cover.webp`;
    //             await sharp(req.file.buffer)
    //                 .resize(1200, 1200)
    //                 .webp({quality: 95})
    //                 .toFile(`upload/image/products/${fileName}`);
    //             req.body.cover = fileName;
    //         }
    //         next();
    //     }






}
const productsService = new ProductsService();
export default productsService;