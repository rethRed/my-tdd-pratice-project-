import { HttpRequest, HttpResponse } from "@/presentation/protocols/http"
import { MissingParamError, InvalidParamError, ServerError } from "@/presentation/erros"
import { badRequest } from "@/presentation/helpers/http-helper"
import { Controller } from "@/presentation/protocols/controller"
import { EmailValidator } from "@/presentation/protocols/email-validator"

export class SignUpController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator
    ){}

    handle(httpRequest: HttpRequest): HttpResponse {

        try {

            const requiredFields = ["name", "email", "password", "passwordConfirmation"]
    
            for (const field of requiredFields) {
                if(!httpRequest.body[field]){
                    return badRequest(new MissingParamError(field))
                }
            } 
    
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if(!isValid){
                return badRequest(new InvalidParamError("email"))
            }
     
    
            return {
                statusCode: 200,
                body: {}
            } 
        }catch(error) {
            return  {
                statusCode: 500,
                body: new ServerError()
            }
        }

    }
} 