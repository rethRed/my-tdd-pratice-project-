import { LogErrorRepository } from "@/application/protocols/log-error-repository";
import {  serverError } from "@/presentation/helpers";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { describe, vitest, it, expect } from "vitest";
import { LogControllerDecorator } from "./log";

const makeController = (): Controller => { 
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {}
            }

            return httpResponse
        }
    }
    return new ControllerStub()
}

const makeLogErrorRepository  = (): LogErrorRepository => { 
    class LogErrorRepositoryStub implements LogErrorRepository {
        async log(stack: string): Promise<void> {
            
        }
    }
    return new LogErrorRepositoryStub()
}

type sutTypes = {
    sut: Controller
    httpRequest: HttpRequest,
    controllerStub: Controller,
    logErrorRepositoryStub: LogErrorRepository
}
const makeSut = (): sutTypes => {

    const httpRequest = {
        body: {
            email: "any_main@gmail.com",
            name: "any_name",
            password: "any_password",
            passwordConfirmation: "any_password"
        } 
    }
    const controllerStub = makeController() 
    const logErrorRepositoryStub = makeLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return {
        sut,
        httpRequest,
        controllerStub,
        logErrorRepositoryStub
    }
}


describe("DbAddAccount Usercase", () => {
    

    it("Should call controller handle", async () => {
        const { sut, httpRequest, controllerStub } = makeSut()
        
        const handleSpy = vitest.spyOn(controllerStub, "handle")

        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    it("Should return the same result of the controller", async () => {
        const { sut, httpRequest } = makeSut()

        const response = await sut.handle(httpRequest)
        expect(response).toEqual({
            statusCode: 200,
            body: {}
        })
    })

    it("Should call LogErrorRepository with correct error if controller returns a server error", async () => {
        const { sut, httpRequest,controllerStub, logErrorRepositoryStub} = makeSut()

        const fakeError = new Error()
        fakeError.stack = "any_stack"
        const error = serverError(fakeError)
        const logSpy = vitest.spyOn(logErrorRepositoryStub, "log")

        vitest.spyOn(controllerStub, "handle")
        .mockReturnValueOnce(new Promise(resolve => resolve(error)))

        await sut.handle(httpRequest)
        
        expect(logSpy).toBeCalledWith("any_stack")
    })
})