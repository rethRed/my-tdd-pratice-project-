import { describe, expect, it, test, vitest } from "vitest";

import { SignUpController } from "./signup"
import { MissingParamError, InvalidParamError, ServerError } from "@/presentation/erros"
import { EmailValidator, AddAccount, AccountModel } from "./signup-protocols"



const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        
        add(account: AddAccount.params): AccountModel {
            const fakeAccount = {
                id: "valid_id",
                name: "valid_name",
                email: "valid_email@gmail.com",
                password: "valid_password"
            } 
            return fakeAccount
        }
    }
    return new AddAccountStub()
}

type SutTypes = {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
    
    const emailValidatorStub = makeEmailValidator()
    const addAccountStub = makeAddAccount()
    const sut = new SignUpController(emailValidatorStub, addAccountStub)
    
    return {
        sut,
        emailValidatorStub,
        addAccountStub 
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

    it("Should return 400 if password confirmation fails", () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirmation: "invalid_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError("passwordConfirmation"))
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

    it("Should return 500 if an emailValidator throws ", () => {
        
        const { sut, emailValidatorStub } = makeSut()
        
        vitest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }


        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    it("Should call AddAccount with correct values ", () => {
        const { sut, addAccountStub } = makeSut()
        
        const addSpy = vitest.spyOn(addAccountStub, "add")

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }

        sut.handle(httpRequest)
        expect(addSpy).toBeCalledWith({
            name: "any_name",
            email: "any_email@gmail.com",
            password: "any_password",
        })
    })

})