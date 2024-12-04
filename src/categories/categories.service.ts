import { Categories } from './categories.interface';
import asyncHandler from 'express-async-handler';
import{Request ,Response ,NextFunction }from 'express'
import categoriesSchema from './categories.schema';
class CategoriesService{

// create categories
   createOne= asyncHandler( async (req:Request , res:Response)=>{
    const Category:Categories = await categoriesSchema.create(req.body);
    res.status(201).json({data:Category});
  
})
// getall categories
    async getAll(req:Request , res:Response){
        const categories:Categories[] =await categoriesSchema.find();
        res.status(200).json({data:categories});

}

// get one category
 async getOne(req:Request , res:Response){
    const category:Categories | null = await categoriesSchema.findById(req.params.id);
    if(category){
        res.status(200).json({data:category});
    }else{
        res.status(404).json({message:'category not found'});
    }
 }



// update category
 updateOne=asyncHandler( async (req:Request , res:Response)=>{
    const updatedCategory:Categories|null = await categoriesSchema.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.status(200).json({data:updatedCategory});

})
// delete category
 deleteOne=asyncHandler( async (req:Request , res:Response)=>{
    const deleteCategory:Categories|null =  await categoriesSchema.findByIdAndDelete(req.params.id);
    res.status(204).json();

})
 }



// اسم الكلااس لازم يبقى حرف كابيتال
const categoriesService =new CategoriesService()
export  default categoriesService;