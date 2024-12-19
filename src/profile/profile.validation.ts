import {body, param} from "express-validator";
import bcrypt from 'bcryptjs';
import validationMiddleware from "../middlewares/validation.middleware";


class ProfileValidation {


    updateOne = [
        body('name').optional()
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
            validationMiddleware
    ]
    getOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validationMiddleware
    ]
    deleteOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validationMiddleware
    ]
    changePassword = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        body('currentPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom(async (val: string, {req}) => {
                const isValidPassword = await bcrypt.compare(val, req.user.password);
                if (!isValidPassword) throw new Error(`${req.__('validation_value')}`);
                return true;
            }),
        validationMiddleware
    ]
    createPassword = [
       
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        validationMiddleware
    ]
}

const profileValidation = new ProfileValidation();

export default profileValidation;