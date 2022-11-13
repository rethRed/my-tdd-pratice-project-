import { AccountModel } from "@/domain/models"

export interface AddAccount{
    add(account: AddAccount.params): Promise<AccountModel> 
}

export namespace AddAccount {
    export type params = {
        name: String
        email: String
        password: String
    } 

}
