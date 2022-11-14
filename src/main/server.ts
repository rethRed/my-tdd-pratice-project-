import express from "express"

const PORT = 5000
const app = express()
app.use(express.json())




app.listen(PORT, () => console.log(`Running on port ${PORT}`))

