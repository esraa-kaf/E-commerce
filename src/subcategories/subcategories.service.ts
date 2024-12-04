import asyncHandler from 'express-async-handler';
import { Subcategories } from './subcategories.interface';
import {Request , Response ,NextFunction} from 'express'
import subcategoriesSchema from './subcategories.schema';

class SubcategoriesService{
// create a new Subcategories
 createOne=asyncHandler( async(req:Request , res:Response)=>{
    if(req.params.categoryId&&!req.body.category) req.body.category = req.params.categoryId;
    const subcategory:Subcategories=await subcategoriesSchema.create(req.body)
    res.status(201).json({data:subcategory})
})
// getall subcategories
 getAll =asyncHandler(async (req:Request , res:Response)=>{
    const filterData:any={};
    if(req.params.categoryId) filterData.categoryId = req.params.categoryId;
    const Subcategories:Subcategories[] =await subcategoriesSchema.find(filterData);
    res.status(200).json({data:Subcategories});

})
// get one subcategory
getOne=asyncHandler(async (req:Request , res:Response)=>{
    const Subcategories:Subcategories[] | null =await subcategoriesSchema.findById(req.params.id);
    res.status(200).json({data:Subcategories});
})


// update subcategory
 updateOne=asyncHandler(async (req:Request , res:Response)=>{
    const updatedSubcategories:Subcategories | null = await subcategoriesSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({data:updatedSubcategories});
})

// delete subcategory
 deleteOne=asyncHandler(async (req:Request , res:Response)=>{
    const deleteSubcategories:Subcategories | null = await subcategoriesSchema.findByIdAndDelete(req.params.id);
    res.status(204).json();

})






}
const subcategoriesService = new SubcategoriesService();
export default subcategoriesService;