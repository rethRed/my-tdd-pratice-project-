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

    it("Should call bcrypt with correct value", async () => {
        const { sut, salt } = makeSut()
        const hashSpy = vitest.spyOn(bcrypt, "hash")

        await sut.encrypt("any_value" )

        expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
    })
})
