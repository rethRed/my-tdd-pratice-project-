import { SignUpController } from "@/presentation/controllers/signup/signup"
import { EmailValidatorAdapter } from "@/utils/email-validator-adapter"
import { inMemoryHelper } from "@/infra/db/in-memory-repository/helpers/InMemory-helper"
import { DbAddAccount } from "@/application/usecases/add-account/db-add-account"
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter"


export const makeSignUpController = () : SignUpController => {
    const salt = 12
    const emailValidator = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountInMemoryRepository = inMemoryHelper.accountRepository
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountInMemoryRepository)
    return new SignUpController(emailValidator, dbAddAccount)

}
