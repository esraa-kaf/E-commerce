import express from 'express'
import dotenv from 'dotenv'
import i18n from 'i18n'
import cors from 'cors';
import compression from 'compression'
import helmet from 'helmet';
import expressMongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import dbConnection from './src/config/database';
import mountRoutes from './src';
import path from 'path';
const app:express.Application=express();
app.use(express.json({limit:"10kb"}))
app.use (cors({
    origin: ['http://localhost:4200'], // link to frontend
    allowedHeaders: ['X-CSRF-Token', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}))
app.use(expressMongoSanitize());
app.use(helmet({crossOriginResourcePolicy: {policy: 'same-site'}}));
app.use(compression())
app.use(cookieParser())
dotenv.config()
app.use(express.static('upload'))
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
