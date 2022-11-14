import { DefineConfig } from "vite"

export default DefineConfig({
    test: {
        global: true,
    },
    plugins: ["@shelf/jest-mongodb"],
})



