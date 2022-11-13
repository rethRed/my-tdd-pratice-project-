import { HttpRequest, HttpResponse, Controller, EmailValidator } from "@/presentation/protocols"
import { MissingParamError, InvalidParamError } from "@/presentation/erros"
import { badRequest, serverError } from "@/presentation/helpers"
import { AddAccount } from "@/domain/usecases"

export class SignUpController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly addAccount: AddAccount
    ){}

    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ["name", "email", "password", "passwordConfirmation"]
    
            for (const field of requiredFields) {
                if(!httpRequest.body[field]){
                    return badRequest(new MissingParamError(field))
                }
            } 

            const { email, password, passwordConfirmation, name } = httpRequest.body
    
            const isValid = this.emailValidator.isValid(email)
            if(!isValid){
                return badRequest(new InvalidParamError("email"))
            }

            if(password !== passwordConfirmation){
                return badRequest(new InvalidParamError("passwordConfirmation"))
            }
            
            this.addAccount.add({
                name,
                email,
                password
            }) 

            return {
                statusCode: 200,
                body: {}
            } 

        }catch(error) {
            return serverError()
        }

    }
} 