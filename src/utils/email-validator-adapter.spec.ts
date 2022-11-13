import { describe, vitest, it, expect } from "vitest";
import { EmailValidatorAdapter } from "./email-validator"


// type sutTypes = {
//     sut: EmailValidatorAdapter
// }
// const makeSut = () => {
//     const sut = new EmailValidatorAdapter()

//     return {
//         sut
//     }
// }

describe("EmailValidator", () => {
    it("should return false if validator return false", () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid("invalid_email@gmail.com")
        expect(isValid).toBe(false)
    })
})