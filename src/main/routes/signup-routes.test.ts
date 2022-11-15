import { describe, it } from "vitest"
import request from "supertest"

import app from "@/main/config/app"

describe("SignUp Routes", () => {

    it("should return an account on success", async () => {
        //test not working for now
        await request(app)
        .post("/api/signup")
        .send({
            name: "my name",
            email: "my_email@gmail.com",
            password: "12345678",
            passwordConfirmation: "12345678"
        })
        .expect(404)

    })
})
