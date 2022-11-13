import { describe, vitest, it, expect } from "vitest";
import { DbAddAccount } from "./db-add-account"
import { AccountModel, AddAccount, Encrypter, AddAccountRepository } from "./db-add-account-protocols"



const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return "hashed_password"
        }
    }
    return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {

    class addAccountRepositoryStub implements AddAccountRepository {

        async add(account: AddAccount.params): Promise<AccountModel> {
            const fakeAccount = {
                id: "valid_id",
                name: "valid_name",
                email: "valid_email",
                password: "hashed_password"
            }
            return fakeAccount
        }
        
    }
    return new addAccountRepositoryStub()
}


type sutTypes = {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
}
const makeSut = (): sutTypes => {

    const addAccountRepositoryStub = makeAddAccountRepository()
    const encrypterStub = makeEncrypter()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
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
    
    it("should call AddAccountRepository with correct values ", async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = vitest.spyOn(addAccountRepositoryStub, "add")

        const accountDataObj = accountDataMock()

        await sut.add(accountDataObj)
        expect(addSpy).toHaveBeenCalledWith({
            ...accountDataObj,
            password: "hashed_password"
        
        })
    })

})