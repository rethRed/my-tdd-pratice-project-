import { HttpRequest, HttpResponse } from "@/presentation/protocols/http"
import { MissingParamError } from "@/presentation/erros/missing-param-error"
import { badRequest } from "@/presentation/helpers/http-helper"
import { Controller } from "@/presentation/protocols/controller"

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {

        const requiredFields = ["name", "email", "password", "passwordConfirmation"]

        for (const field of requiredFields) {
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamError(field))
            }
        } 

        return {
            statusCode: 200,
            body: {}
        } 

    }
} 