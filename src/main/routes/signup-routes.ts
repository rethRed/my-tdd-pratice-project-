import { Router } from "express";
import { inMemoryHelper } from "@/infra/db/in-memory-repository/helpers/InMemory-helper"
import { makeSignUpController } from "../factories/signup";

export default (router: Router): void => {
    router.post("/signup", (req, res) => {

        const con = makeSignUpController()
        

        res.json({ok: true})
    })
}

