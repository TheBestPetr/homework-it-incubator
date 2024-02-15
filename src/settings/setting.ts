import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "../routes/videos.router";

export const app = express()

app.use(bodyParser.json())
app.use('/videos', videosRouter)