class ApiErrors extends Error{
    private status: string;
    constructor(message: string,private statusCode:number){
        super(message);
        this.status = statusCode.toString().startsWith('4') ?'failed' :'error';
        
        
    }
}

export default ApiErrors;