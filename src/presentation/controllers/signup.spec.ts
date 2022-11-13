import { describe, expect, it, test, vitest } from "vitest";

import { SignUpController } from "./signup"
import { MissingParamError, InvalidParamError } from "@/presentation/erros"
import { EmailValidator } from "@/presentation/protocols/email-validator"

type SutTypes = {
    sut: SignUpController
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {

    class EmailValidatorStub implements EmailValidator {

        isValid(email: string): boolean {
            return true
        }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    return {
        sut,
        emailValidatorStub 
    }
}

describe("SignUp Controller", () => {

    it("Should return 400 if no name is provided", () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("name"))
    }) 

    it("Should return 400 if no email is provided", () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("email"))
    })

    it("Should return 400 if no password is provided", () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                passwordConfirmation: "any_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("password"))
    })

    it("Should return 400 if no password confirmation is provided", () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"))
    })

    it("Should return 400 if an invalid email is provided", () => {
        const { sut, emailValidatorStub } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_email@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }

        vitest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError("email"))
    })

    it("Should call emailValidator with correct email ", () => {
        const { sut, emailValidatorStub } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_email@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }

        const isValidSpy = vitest.spyOn(emailValidatorStub, "isValid")

        sut.handle(httpRequest)
        expect(isValidSpy).toBeCalledWith("invalid_email@gmail.com")
    })
})