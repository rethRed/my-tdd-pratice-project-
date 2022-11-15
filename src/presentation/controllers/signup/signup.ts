import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from "./signup-protocols"
import { MissingParamError, InvalidParamError } from "@/presentation/erros"
import { badRequest, serverError, created } from "@/presentation/helpers"

export class SignUpController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly addAccount: AddAccount
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>  {
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
            
            const account = await this.addAccount.add({
                name,
                email,
                password
            }) 

            return created(account)

        }catch(error) {
            
            if(error instanceof Error){
                return serverError(error)
            }
            return serverError(new Error("Unable to log"))
        }

    }
} 