import { afterAll, beforeAll, describe, expect, it, test, vitest } from "vitest"

import { MongoHelper } from "../helpers/mongo-helper"

describe("Account Mongo Repository", () => {

    

    beforeAll( async () => {
        MongoHelper.connect(process.env.MONGO_URL as string)
    })

    afterAll( async () => {
        MongoHelper.disconnect()
    })

    test("Should return an account on success", async () => {
        const sut = new AccountMongoRepository()
        const account = await sut.add({
            name: "any_name",
            email: "any_email@gmail.com",
            password: "any_password"
        })

        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe("any_name")
        expect(account.email).toBe("any_email@gmail.com")
        expect(account.password).toBe("any_password")
    })  
})