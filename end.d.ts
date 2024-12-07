declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT: Number,
        readonly DB:string,
        readonly NODE_ENV: 'development'
    }
}