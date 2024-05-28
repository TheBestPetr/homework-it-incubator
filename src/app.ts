import express from "express"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {reqIpCounterMiddleware} from "./middlewares/req-ip-counter-middleware";

export const app = express()

app.use(reqIpCounterMiddleware)
app.use(bodyParser.json())
app.use(cookieParser())
app.set('trust proxy', true)

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})