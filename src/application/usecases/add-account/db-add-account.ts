import { Encrypter } from "@/application/protocols";
import { AccountModel } from "@/domain/models";
import { AddAccount } from "@/domain/usecases";


export class DbAddAccount implements AddAccount {

    constructor(
        private readonly encrypter: Encrypter
    ) {}

    async add(account: AddAccount.params): Promise<AccountModel> {

        const { name, email, password } = account

        const hashPassword = await this.encrypter.encrypt(password)

        return {
            id: "",
            name: "",
            email: "",
            password: hashPassword
        }
    }
}