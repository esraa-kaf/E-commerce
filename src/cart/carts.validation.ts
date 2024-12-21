import {body, param} from "express-validator";
import cartsSchema from "./carts.schema";
import validationMiddleware from "../middlewares/validation.middleware";
import productsSchema from "../products/products.schema";


class CartsValidation {

    addToCart = [
        body('product')
          .isMongoId()
          .withMessage((value, { req }) => req.__('invalid_id')),
        validationMiddleware
    ]
    removeFromCart = [
        param('product')
        .isMongoId()
        .withMessage((value,{req})=>req.__('invalid_id')),
        validationMiddleware
    ]
    updateQuantity = [
        body('product')
          .isMongoId()
          .withMessage((value, { req }) => req.__('invalid_id')),
        validationMiddleware
    ]

}

const cartsValidation = new CartsValidation();

export default cartsValidation;