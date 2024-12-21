
import { Carts } from './carts.interface';
import mongoose from "mongoose";
const cartsSchema = new mongoose.Schema<Carts>({
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number, default: 1},
        price: Number
    }],
    taxPrice: Number,
    totalPrice: {type: Number},
    totalPriceAfterDiscount: {type: Number},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
},{
    timestamps:true
})
export default mongoose.model<Carts>('carts',cartsSchema)
