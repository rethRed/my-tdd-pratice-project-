import { AddAccountRepository } from "@/application/protocols"
import { AccountModel } from "@/domain/models"
import { AddAccount } from "@/domain/usecases"


export class InMemoryAccountRepository implements AddAccountRepository{

    items: AccountModel[] = []
    currentId: number = 0

    nextId(): string {
        this.currentId++
        return `${this.currentId}`
    }

    async add(account: AddAccount.params): Promise<AccountModel> {

        const newAccount: AccountModel = {
            ...account,
            id: this.nextId()
        }

        this.items.push(newAccount)

        return newAccount
    }


}