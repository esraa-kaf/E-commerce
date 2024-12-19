
import {body, param} from "express-validator";
import validationMiddleware from "../middlewares/validation.middleware";
import productsSchema from "./products.schema";
import categoriesSchema from "../categories/categories.schema";
import subcategoriesSchema from "../subcategories/subcategories.schema";

class ProductsValidation {

    createOne = [
        body('name').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isLength({min: 10, max: 50}).withMessage((value,{req})=>req.__('validation_length_short')),
        
        body('description').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isLength({min: 10, max: 500}).withMessage((value,{req})=>req.__('validation_length_long')),
 
        body('price').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isFloat({min: 1, max: 10000000}).withMessage((value,{req})=>req.__('validation_value')),
 
        body('discount').optional()
            .isFloat({min: 1, max: 100}).withMessage((value,{req})=>req.__('validation_value'))
            .custom((value,{req})=>{
                req.body.priceAfterDiscount = req.body.price - (req.body.price * value / 100)
                return true;
            }),
        
        body('quantity').optional()
            .isInt({min: 1, max: 10000000}).withMessage((val, {req}) => req.__('validation_value')),

            
        body('category')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
            .custom(async (val: string, {req}) => {
                const category = await categoriesSchema.findById(val);
                if (!category) throw new Error(`${req.__('validation_value')}`);
                return true;
            }),
        body('subcategory').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isMongoId().withMessage((value,{req})=>req.__('invalid_id'))
            .custom(async (value :string ,{req})=>{
            const subcategory = await subcategoriesSchema.findById(value);
            if(!subcategory) throw new Error(`${req.__('not_found')}`);
            if(subcategory.category._id!.toString()!=req.body.category.toString()) throw new Error('subcategory not belong to category')
            return true;
        }),
           validationMiddleware
    ]
    updateOne = [
        param('id').isMongoId().withMessage((value,{req})=>req.__('invalid_id')),
        body('name').optional()
            .isLength({min: 2, max: 50}).withMessage((value,{req})=>req.__('validation_length_short')),
            body('description').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isLength({min: 10, max: 500}).withMessage((value,{req})=>req.__('validation_length_long')),
 
        body('price').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isFloat({min: 1, max: 10000000}).withMessage((value,{req})=>req.__('validation_value')),
 
        body('discount').optional()
            .isFloat({min: 1, max: 100}).withMessage((value,{req})=>req.__('validation_value'))
            .custom((value,{req})=>{
                req.body.priceAfterDiscount = req.body.price - (req.body.price * value / 100)
                return true;
            }),
        
        body('quantity').optional()
            .isInt({min: 1, max: 10000000}).withMessage((val, {req}) => req.__('validation_value')),
 
        body('category').optional()
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
            .custom(async (val: string, {req}) => {
                const category = await categoriesSchema.findById(val);
                if (!category) throw new Error(`${req.__('validation_value')}`);
                return true;
            }),


        body('subcategory').optional()
            .isMongoId().withMessage((value,{req})=>req.__('invalid_id'))
            .custom(async (value :string ,{req})=>{

                /////////////////////////////////////////////////////
            const subcategory = await subcategoriesSchema.findById(value).populate('category');
            if(!subcategory) throw new Error(`${req.__('not_found')}`);

            //////////////////////////////////////////////////
            if (req.body.category) {
                if (subcategory.category.toString() !== req.body.category) {
                  throw new Error('subcategory not belong to category');
                }
              } else {
                // If no category is provided, get the product's current category
                const product = await req.product; 
                if (subcategory.category.toString() !== product.category.toString()) {
                    throw new Error('subcategory not belong to category')
                    
                }
              }
      ////////////////////////////////////////////////////////
            return true;
            })
            ,validationMiddleware
    ]
    getOne = [
        param('id').isMongoId().withMessage((value,{req})=>req.__('invalid_id')),
        validationMiddleware
    ]
    deleteOne = [
        param('id').isMongoId().withMessage((value,{req})=>req.__('invalid_id')),
        validationMiddleware
    ]
}

const productsValidation = new ProductsValidation();

export default productsValidation;