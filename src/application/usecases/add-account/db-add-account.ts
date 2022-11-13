import { Encrypter, AccountModel, AddAccount, AddAccountRepository } from "./db-add-account-protocols"

export class DbAddAccount implements AddAccount {

    constructor(
        private readonly encrypter: Encrypter,
        private readonly addAccountRepository: AddAccountRepository
    ) {}

    async add(accountData: AddAccount.params): Promise<AccountModel> {

        const { password } = accountData

        const hashedPassword = await this.encrypter.encrypt(password)

        const newAccount = await this.addAccountRepository.add({
            ...accountData,
            password: hashedPassword
        })

        return newAccount
    }
}