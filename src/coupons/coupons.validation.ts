import {body, param} from "express-validator";
import validationMiddleware from "../middlewares/validation.middleware";


class CouponsValidation {

    createOne = [
        body('name')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
    body('discount')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isFloat({min: 1, max: 100}).withMessage((val, {req}) => req.__('validation_value')),
    body('expireTime')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isDate().withMessage((val, {req}) => req.__('validation_value')),
        validationMiddleware
    ]
    updateOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body('name').optional()
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
        body('discount').optional()
            .isFloat({min: 1, max: 100}).withMessage((val, {req}) => req.__('validation_value')),
        body('expireTime').optional()
            .isDate().withMessage((val, {req}) => req.__('validation_value')),
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

const couponsValidation = new CouponsValidation();

export default couponsValidation;