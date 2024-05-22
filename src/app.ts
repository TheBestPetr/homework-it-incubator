import express from "express"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

export const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})