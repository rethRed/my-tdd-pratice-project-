import { HttpRequest, HttpResponse, Controller, EmailValidator } from "@/presentation/protocols"
import { MissingParamError, InvalidParamError } from "@/presentation/erros"
import { badRequest, serverError } from "@/presentation/helpers"


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

            const { email, password, passwordConfirmation } = httpRequest.body
    
            const isValid = this.emailValidator.isValid(email)
            if(!isValid){
                return badRequest(new InvalidParamError("email"))
            }

            if(password!== passwordConfirmation){
                return badRequest(new InvalidParamError("passwordConfirmation"))
            }
     
    
            return {
                statusCode: 200,
                body: {}
            } 

        }catch(error) {
            return serverError()
        }

    }
} 