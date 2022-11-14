import { vitest, describe, it, test, expect } from "vitest";
import bcrypt from "bcrypt"
import { Encrypter } from "@/application/protocols";
import { BcryptAdapter } from "./bcrypt-adapter"

type sutTypes = {
    sut: Encrypter,
    salt: number
}

const makeSut = (): sutTypes => {

    const salt = 12
    const sut = new BcryptAdapter(salt)

    return {
        sut,
        salt
    }
}


describe("Bcrypt Adapter", () => {

    vitest.spyOn(bcrypt, "hash").mockImplementation(() => {
        return "hash"
    })

    it("Should call bcrypt with correct value", async () => {
        const { sut, salt } = makeSut()
        const hashSpy = vitest.spyOn(bcrypt, "hash")

        await sut.encrypt("any_value" )

        expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
    })

    it("Should return a hash on success", async () => {
        const { sut } = makeSut()

        const hash = await sut.encrypt("any_value")

        expect(hash).toBe("hash")
    })

    it("Should throw if bcrypt throws", async () => {
        const { sut, salt } = makeSut()
        vitest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
            throw new Error()
        })

        const promise = sut.encrypt("any_value" )

        expect(promise).rejects.toThrow()
    })
    
})
