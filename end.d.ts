declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT: Number, 
        readonly DB:string,
        readonly NODE_ENV: 'development',
        readonly BASE_URL:string,
        readonly SECRET_KEY:string,
        readonly EXPIRE_TIME:string,
        readonly EMAIL_HOST:string,
        readonly EMAIL_USERNAME:string,
        readonly EMAIL_PASSWORD:string,
        readonly APP_NAME:string,
        readonly SECRET_KEY_RESET:string
        readonly  EXPIRE_TIME_RESET:string
        readonly  GOOGLE_CLIENT_SECRET: string
        readonly GOOGLE_CLIENT_ID:string
        readonly GOOGLE_CALLBACK:string
    }
}