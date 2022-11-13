import { describe, vitest, it, expect } from "vitest";
import { EmailValidatorAdapter } from "./email-validator"
import validator from "validator"

type sutTypes = {
    sut: EmailValidatorAdapter
}
const makeSut = () => {
    const sut = new EmailValidatorAdapter()

    return {
        sut
    }
}

// vitest.mock("validator", () => ({
//     isEmail(): boolean {
//         return true
//     }
// }))


describe("EmailValidator", () => {
    it("should return false if validator returns false", () => {
        const { sut } = makeSut()
        vitest.spyOn(validator, "isEmail").mockReturnValueOnce(false)
        const isValid = sut.isValid("invalid_email@gmail.com")
        expect(isValid).toBe(false)
    })

    it("should return true if validator returns true", () => {
        const { sut } = makeSut()
        const isValid = sut.isValid("valid_email@gmail.com")
        expect(isValid).toBe(true)
    })

    it("should call validator with correct email ", () => {
        const { sut } = makeSut()
        const isEmailSpy = vitest.spyOn(validator, "isEmail")
        sut.isValid("valid_any@gmail.com")
        expect(isEmailSpy).toHaveBeenCalledWith("valid_any@gmail.com")
    })
})