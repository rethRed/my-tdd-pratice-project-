import { describe, vitest, it, expect } from "vitest";
import { DbAddAccount } from "./db-add-account"
import { Encrypter } from "@/application/protocols"


const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return value
        }
    }
    return new EncrypterStub()
}

type sutTypes = {
    sut: DbAddAccount
    encrypterStub: Encrypter
}
const makeSut = (): sutTypes => {

    const encrypterStub = makeEncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}


describe("DbAddAccount Usercase", () => {

    it("should call Encrypter with correct password", async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = vitest.spyOn(encrypterStub, "encrypt")
        const accountData = {
            name: "valid_name",
            email: "valid_email",
            password: "valid_password"
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith("valid_password")
    })

   
    
})