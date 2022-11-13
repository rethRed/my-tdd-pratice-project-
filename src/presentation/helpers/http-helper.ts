import { HttpResponse } from "@/presentation/protocols"
import { ServerError } from "@/presentation/erros"

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
}) 

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data
})
