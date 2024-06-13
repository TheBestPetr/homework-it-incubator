import {Request, Response, NextFunction} from "express";
import {ReqCountModel} from "../db/mongo/mongo-db";

export const reqIpCounterMiddleware = async (req: Request,
                                             res: Response,
                                             next: NextFunction) => {
    await ReqCountModel.create({ip: req.ip!, URL: req.originalUrl, date: new Date()})
    const currentDate = new Date()
    const tenSecondsAgo = currentDate.setSeconds(currentDate.getSeconds() - 10)
    const reqCount = await ReqCountModel.countDocuments({ip: req.ip, URL: req.originalUrl, date: {$gte: new Date(tenSecondsAgo)}})
    if (reqCount > 5) {
        res.sendStatus(429)
        return
    }
    next()
}