import { AccountModel } from "@/domain/models"

export interface AddAccount{
    add(account: AddAccount.params): AccountModel 
}

export namespace AddAccount {
    export type params = {
        name: string
        email: string
        password: string
    } 

}
