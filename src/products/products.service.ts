import { products } from './products.interface';
import asyncHandler from 'express-async-handler';
import {Request , Response ,NextFunction} from 'express'
import productsSchema from './products.schema';

class ProductsService{
// create a new product
 createOne=asyncHandler( async(req:Request , res:Response)=>{
    // if(req.params.categoryId&&!req.body.category) req.body.category = req.params.categoryId;
    const product:products=await productsSchema.create(req.body)
    res.status(201).json({data:product})
})
// getall products
 getAll =asyncHandler(async (req:Request , res:Response)=>{
    // const filterData:any={};
    // if(req.params.categoryId) filterData.categoryId = req.params.categoryId;
    const product:products[] =await productsSchema.find();
    res.status(200).json({data:product});

})
// get one product
getOne=asyncHandler(async (req:Request , res:Response)=>{
    const product:products[] | null =await productsSchema.findById(req.params.id);
    res.status(200).json({data:product});
})


// update products
 updateOne=asyncHandler(async (req:Request , res:Response)=>{
    const updatedProducts:products | null = await productsSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({data:updatedProducts});
})

// delete products
 deleteOne=asyncHandler(async (req:Request , res:Response)=>{
    const deleteProducts:products | null = await productsSchema.findByIdAndDelete(req.params.id);
    res.status(204).json();

})






}
const productsService = new ProductsService();
export default productsService;