import { InMemoryAccountRepository } from "@/infra/db/in-memory-repository/account-repository/account";

export const inMemoryHelper = {

    accountRepository: new InMemoryAccountRepository,

}