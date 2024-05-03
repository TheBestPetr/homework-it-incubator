import {Request, Response} from "express";
import {InputLoginType} from "../../types/authType";
import {authService} from "../03-servise/authService";

export const createAuth = async (req: Request<{}, {}, InputLoginType>,
                                 res: Response) => {
    const auth = await authService.create(req.body)
    if(!auth) {
        res.sendStatus(401)
    }
}