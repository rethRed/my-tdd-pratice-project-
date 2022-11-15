import { ok } from "@/presentation/helpers";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { describe, vitest, it, expect } from "vitest";
import { LogControllerDecorator } from "./log";

const makeController = (): Controller => { 
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            return ok({ok: true})
        }
    }
    return new ControllerStub()
}

type sutTypes = {
    sut: Controller
    httpRequest: HttpRequest,
    controllerStub: Controller
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
    const sut = new LogControllerDecorator(controllerStub)
    return {
        sut,
        httpRequest,
        controllerStub
    }
}


describe("DbAddAccount Usercase", () => {
    

    it("Should call controller handle", async () => {
        const { sut, httpRequest, controllerStub } = makeSut()
        
        const handleSpy = vitest.spyOn(controllerStub, "handle")

        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })
})