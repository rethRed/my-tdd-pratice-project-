import { vitest, describe, test, it, expect } from "vitest"
import { InMemoryAccountRepository } from "./account"

type sutTypes = {
    sut: InMemoryAccountRepository
}

const makeSut = (): sutTypes => {
    
    const sut = new InMemoryAccountRepository()

    return {
        sut
    }
}

const mockAccountData = {
    name: "any_name",
    email: "any_email@gmail.com",
    password: "any_password"
} 

describe("InMemoryRepository Account", () => {

    it("should add an account with correct values", async () => {
        const { sut } = makeSut()

        const sutSpy = vitest.spyOn(sut, "add")

        await sut.add(mockAccountData)

        expect(sutSpy).toBeCalledWith(mockAccountData)
    })

    it("should add an item when the Add function is called", async () => {
        const { sut } = makeSut()

        await sut.add(mockAccountData)

        expect(sut.items).length(1)
    })

    it("should return with correct fields", async () => {
        const { sut } = makeSut()

        const account = await sut.add(mockAccountData)

        expect(account.id).toBeTruthy()
        expect(account.name).toEqual(mockAccountData.name)
        expect(account.email).toEqual(mockAccountData.email)
        expect(account.password).toEqual(mockAccountData.password)
    })

})