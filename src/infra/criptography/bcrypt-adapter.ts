import { Encrypter } from "@/application/protocols";
import bcrypt from "bcrypt"

export class BcryptAdapter implements Encrypter {

    constructor(
        private readonly salt: number
    ) {}

    async encrypt(value: string): Promise<string> {
        return await bcrypt.hash(value, this.salt)
    }
}
