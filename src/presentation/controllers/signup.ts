import { HttpRequest, HttpResponse } from "@/presentation/protocols/http"
import { MissingParamError } from "@/presentation/erros/missing-param-error"
import { badRequest } from "@/presentation/helpers/http-helper"

export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {

        const requiredFields = ["name", "email", "password"]

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