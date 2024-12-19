import {body, param} from "express-validator";
import categoriesSchema from "./categories.schema";
import validationMiddleware from "../middlewares/validation.middleware";


class CategoriesValidation {

    createOne = [
        body('name').notEmpty().withMessage((value,{req})=>req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((value,{req})=>req.__('validation_length_short'))
            .custom(async (value: string ,{req}) => {
                const category = await categoriesSchema.findOne({name: value});
                if (category) throw new Error(`${req.__('not_found')}`);
                return true;
            }),
        validationMiddleware
    ]
    updateOne = [
        param('id').isMongoId().withMessage((value,{req})=>req.__('invalid_id')),
        body('name').optional()
            .isLength({min: 2, max: 50}).withMessage((value,{req})=>req.__('validation_length_short'))
            .custom(async (value: string, {req}) => {
                const category = await categoriesSchema.findOne({name: value});
                if (category && category._id!.toString() !== req.params?.id.toString()) throw new Error(`${req.__('not_found')}`);
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

const categoriesValidation = new CategoriesValidation();

export default categoriesValidation;