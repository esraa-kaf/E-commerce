import {Document} from "mongoose";
import { Users } from "../users/users.interface";
import{products}from "../products/products.interface"

export interface Reviews extends Document {
    readonly comment: string;
    readonly rate: number;
    readonly user: Users;
    readonly product: products;
}