import express from "express"

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})