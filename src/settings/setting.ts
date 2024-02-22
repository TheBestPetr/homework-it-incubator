import express from "express";
import bodyParser from "body-parser";
import {testingRouter, videosRouter} from "../routes/videos.router";

export const app = express()

app.use(bodyParser.json())
app.use('/videos', videosRouter)
app.use('/testing/all-data', testingRouter)