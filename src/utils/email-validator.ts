import { EmailValidator } from "@/presentation/protocols/validators/email-validator";

export class EmailValidatorAdapter implements EmailValidator{
    isValid(email: string): boolean {
        return false
    }
}