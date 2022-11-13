export interface Encrypter {
    encrypt(value: String): Promise<String>
}