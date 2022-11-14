import { inMemoryHelper } from "@/infra/db/in-memory-repository/helpers/InMemory-helper"
import app from "./config/app"
const PORT = 5000




app.listen(PORT, () => console.log(`Running on port ${PORT}`))