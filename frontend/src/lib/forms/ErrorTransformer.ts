export function transformError(backEndError: any):any{
    let error :any ={};
    backEndError.message.forEach(element => {
        error[element.property] = Object.values(element.constraints)[0]
    });
    return error;
}