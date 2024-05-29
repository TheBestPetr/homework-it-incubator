import {Request, Response, NextFunction} from "express";
import {reqCountCollection} from "../db/mongo-db";

export const reqIpCounterMiddleware = async (req: Request,
                                             res: Response,
                                             next: NextFunction) => {
    await reqCountCollection.insertOne({ip: req.ip!, URL: req.originalUrl, date: new Date()})
    const currentDate = new Date()
    const tenSecondsAgo = currentDate.setSeconds(currentDate.getSeconds() - 10)
    const reqCount = await reqCountCollection.countDocuments({ip: req.ip, URL: req.originalUrl, date: {$gte: new Date(tenSecondsAgo)}})
    if (reqCount > 5) {
        res.sendStatus(429)
        return
    }
    next()
}