import { AccountModel } from "@/domain/models";
import { AddAccount } from "@/domain/usecases";

export interface AddAccountRepository {
    add(account: AddAccount.params): Promise<AccountModel> 
}