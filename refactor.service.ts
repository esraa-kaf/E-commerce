import mongoose, { Document } from 'mongoose';
import asyncHandler from 'express-async-handler';
import{Request ,Response ,NextFunction }from 'express'
import ApiErrors from './utils/api.Errors';
import Features from './utils/features';
import sanitization from './utils/sanitization';
class RefactorService{

// create categories
   createOne = <modelType>(model:mongoose.Model<any>)=>
     asyncHandler( async (req:Request , res:Response)=>{
    const documents:modelType = await model.create(req.body);
    res.status(201).json({data:documents});
  
})
// getall categories
    getAll= <modelType>(model:mongoose.Model<any> , modelName?: string)=>
        asyncHandler(async(req:Request , res:Response ,next:NextFunction)=>{
         const filterData:any={};
        //  if (req.filterData) filterData = req.filterData;
        const documentsCount = await model.find(filterData).countDocuments();
        const features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName!).pagination(documentsCount);
        const {mongooseQuery, paginationResult} = features;
        const documents: modelType[] = await mongooseQuery;
        
        res.status(200).json({pagination: paginationResult, length: documents.length, data: documents});

})

// get one category
  getOne= <modelType>(model:mongoose.Model<any>, modelName?: string, populationOptions?: string)=>
    asyncHandler(async (req:Request , res:Response ,next:NextFunction)=>{
        let query: any = model.findById(req.params.id);
        if (populationOptions) query = query.populate(populationOptions);
        let document: any = await query;
        if (!document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        if (modelName === 'users') document = sanitization.User(document)
        res.status(200).json({data: document});
    }
 )



// update category
 updateOne= <modelType>(model:mongoose.Model<any>)=>
    asyncHandler( async (req:Request , res:Response)=>{
    const documents:modelType|null = await model.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.status(200).json({data:documents});
    

})
// delete category
 deleteOne= <modelType>(model:mongoose.Model<any>)=>
    asyncHandler( async (req:Request , res:Response)=>{
    const documents:modelType|null =  await model.findByIdAndDelete(req.params.id);
    res.status(204).json();

})
 }



// اسم الكلااس لازم يبقى حرف كابيتال
const refactorService =new RefactorService()
export  default refactorService;

function next(arg0: ApiErrors): void | PromiseLike<void> {
    throw new Error('Function not implemented.');
}
