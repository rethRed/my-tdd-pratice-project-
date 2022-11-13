import { describe, vitest, it, expect } from "vitest";
import { DbAddAccount } from "./db-add-account"
import { Encrypter } from "./db-add-account-protocols"


const makeEncrypter = (): Encrypter => {
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

    const encrypterStub = makeEncrypter()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}


describe("DbAddAccount Usercase", () => {
    
    const accountDataMock = () => ({
        name: "valid_name",
        email: "valid_email",
        password: "valid_password"
    })

    it("should call Encrypter with correct password", async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = vitest.spyOn(encrypterStub, "encrypt")

        await sut.add(accountDataMock())
        expect(encryptSpy).toHaveBeenCalledWith("valid_password")
    })

    it("should throw if Encrypter throws", async () => {
        const { sut, encrypterStub } = makeSut()
        vitest.spyOn(encrypterStub, "encrypt").mockImplementationOnce(() => {
            throw new Error()
        })

        const promise =  sut.add(accountDataMock())
        expect(promise).rejects.toThrow()
    })
    
})