import {Request, Response, NextFunction} from "express";
import {reqCountCollection} from "../db/mongo-db";

export const reqIpCounterMiddleware = async (req: Request,
                                             res: Response,
                                             next: NextFunction) => {
    await reqCountCollection.insertOne({ip: req.ip!, URL: req.baseUrl || req.originalUrl, date: new Date()})
    const reqCount = await reqCountCollection.countDocuments({ip: req.ip, URL: req.baseUrl || req.originalUrl})
    console.log(reqCount)
    next()
}