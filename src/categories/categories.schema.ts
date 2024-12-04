
import { Categories } from './categories.interface';
import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema<Categories>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    }
},{
    timestamps:true
})
export default mongoose.model<Categories>('categories',categoriesSchema)