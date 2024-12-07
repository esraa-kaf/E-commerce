import express from 'express'
import dotenv from 'dotenv'
import i18n from 'i18n'
import dbConnection from './src/config/database';
import mountRoutes from './src';
import path from 'path';
const app:express.Application=express();
app.use(express.json({limit:"10kb"}))
dotenv.config()
i18n.configure({
    locales:['en','ar'],
    directory:path.join(__dirname,'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang'
})
app.use(i18n.init);
dbConnection();
mountRoutes(app)

app.listen(process.env.PORT,()=>{
    console.log(`Server started on ${process.env.PORT}`);
    
})
