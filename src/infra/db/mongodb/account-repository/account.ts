import { AddAccountRepository } from "@/application/protocols"
import { AccountModel } from "@/domain/models"
import { AddAccount } from "@/domain/usecases"


export class AccountMongoRepository implements AddAccountRepository{

    async add(account: AddAccount.params): Promise<AccountModel> {
        return {
            id: "",
            name: "",
            email: "",
            password: ""
        }
    }
}