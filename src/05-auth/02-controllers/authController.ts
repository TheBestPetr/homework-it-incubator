import {Request, Response} from "express";
import {InputLoginType} from "../../types/authType";
import {authService} from "../03-servise/authService";

export const createAuth = async (req: Request<{}, {}, InputLoginType>,
                                 res: Response) => {
    const userId = await authService.checkCredentials(req.body)
    if (!userId) {
        res.sendStatus(401)
        return
    }
    res.sendStatus(204)
}