import express from "express"
import cookieParser from "cookie-parser";

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})