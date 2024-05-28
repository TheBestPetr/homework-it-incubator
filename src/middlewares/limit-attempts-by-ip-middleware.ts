import {Request, Response, NextFunction} from "express";
import {reqCountCollection} from "../db/mongo-db";

export const limitAttemptsByIpMiddleware = async (req: Request,
                                                  res: Response,
                                                  next: NextFunction) => {
    const attempts = await reqCountCollection.find({ip: req.ip, URL: req.baseUrl || req.originalUrl}).toArray()

}