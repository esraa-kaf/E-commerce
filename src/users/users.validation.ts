import {body, param} from "express-validator";
import usersSchema from "./users.schema";
import validationMiddleware from "../middlewares/validation.middleware";


class UsersValidation {

    createOne = [
        body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short'))
            .custom(async (val: string, {req}) => {
                const user = await usersSchema.findOne({username: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('email').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isEmail().withMessage((val, {req}) => req.__('validation_value'))
            .custom(async (val: string, {req}) => {
                const user = await usersSchema.findOne({email: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('name')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
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
    updateOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
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
        validationMiddleware
    ]
}

const usersValidation = new UsersValidation();

export default usersValidation;