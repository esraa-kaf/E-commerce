import {body, param} from "express-validator";
import validationMiddleware from "../middlewares/validation.middleware";
import subcategoriesSchema from "./subcategories.schema";
import categoriesSchema from "../categories/categories.schema";

class SubcategoriesValidation {

    createOne = [
        body('name').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((value,{req})=>req.__('validation_length_short')),
        body('category').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isMongoId().withMessage((value,{req})=>req.__('invalid_id'))
            .custom(async (value :string ,{req})=>{
            const category = await categoriesSchema.findById(value);
            if(!category) throw new Error(`${req.__('not_found')}`);
            return true;
        }),
           validationMiddleware
    ]
    updateOne = [
        param('id').isMongoId().withMessage((value,{req})=>req.__('invalid_id')),
        body('name').optional()
            .isLength({min: 2, max: 50}).withMessage((value,{req})=>req.__('validation_length_short')),
        body('category').optional()
            .custom(async (value :string ,{req})=>{
            const category = await categoriesSchema.findById(value);
            if(!category) throw new Error(`${req.__('not_found')}`);
            return true;
        }),
            validationMiddleware
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

const subcategoriesValidation = new SubcategoriesValidation();

export default subcategoriesValidation;