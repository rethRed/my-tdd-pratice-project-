export class InvalidParamError extends Error {
    constructor(paramName: string){
        super(`InvalidParamError param: ${paramName}`)
        this.name = "InvalidParamError"
    }
}