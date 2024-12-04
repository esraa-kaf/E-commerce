import express from 'express';
import categoriesRouter from './categories/categories.routes';
import subcategoriesRouter from './subcategories/subcategories.routes';


const mountRoutes=(app: express.Application)=>{
    app.use('/api/v1/categories',categoriesRouter)
    app.use('/api/v1/subcategories',subcategoriesRouter)
}
export default mountRoutes;